<template>
  <div class="jobs-page">
    <!-- Hero Section -->
    <section class="jobs-hero">
      <div class="hero-content">
        <h1 class="hero-title">ค้นหางานที่ใช่สำหรับคุณ</h1>
        <p class="hero-subtitle">ค้นพบโอกาสในการทำงานกับบริษัทชั้นนำกว่า 5,000 แห่ง</p>

        <!-- Search Box -->
        <div class="search-box">
          <div class="search-input-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              v-model="searchQuery"
              placeholder="ตำแหน่งงาน หรือ บริษัทที่ต้องการ"
              @keyup.enter="searchJobs"
            />
          </div>
          <div class="search-input-group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <input
              type="text"
              v-model="locationQuery"
              placeholder="สถานที่"
              @keyup.enter="searchJobs"
            />
          </div>
          <button class="search-btn" @click="searchJobs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            ค้นหา
          </button>
        </div>
      </div>
    </section>

    <!-- Filters & Results -->
    <section class="jobs-content">
      <div class="container">
        <div class="content-grid">
          <!-- Sidebar Filters -->
          <aside class="filters-sidebar">
            <div class="filter-card">
              <h3 class="filter-title">ตัวกรอง</h3>

              <!-- Job Type -->
              <div class="filter-group">
                <h4 class="filter-label">ประเภทงาน</h4>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="filters.fullTime" @change="applyFilters" />
                  <span>Full-Time</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="filters.partTime" @change="applyFilters" />
                  <span>Part-Time</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="filters.contract" @change="applyFilters" />
                  <span>Contract</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="filters.remote" @change="applyFilters" />
                  <span>Remote</span>
                </label>
              </div>

              <!-- Experience Level -->
              <div class="filter-group">
                <h4 class="filter-label">ระดับประสบการณ์</h4>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="filters.entry" @change="applyFilters" />
                  <span>Entry Level</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="filters.mid" @change="applyFilters" />
                  <span>Mid Level</span>
                </label>
                <label class="checkbox-label">
                  <input type="checkbox" v-model="filters.senior" @change="applyFilters" />
                  <span>Senior Level</span>
                </label>
              </div>

              <!-- Salary Range -->
              <div class="filter-group">
                <h4 class="filter-label">เงินเดือน</h4>
                <select v-model="filters.salary" @change="applyFilters" class="filter-select">
                  <option value="">ทั้งหมด</option>
                  <option value="0-30000">ต่ำกว่า 30,000</option>
                  <option value="30000-50000">30,000 - 50,000</option>
                  <option value="50000-80000">50,000 - 80,000</option>
                  <option value="80000+">มากกว่า 80,000</option>
                </select>
              </div>

              <!-- Location -->
              <div class="filter-group">
                <h4 class="filter-label">จังหวัด</h4>
                <select v-model="filters.location" @change="applyFilters" class="filter-select">
                  <option value="">ทั้งหมด</option>
                  <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
                  <option value="เชียงใหม่">เชียงใหม่</option>
                  <option value="ภูเก็ต">ภูเก็ต</option>
                  <option value="ชลบุรี">ชลบุรี</option>
                </select>
              </div>

              <button class="btn-clear-filters" @click="clearFilters">ล้างตัวกรอง</button>
            </div>
          </aside>

          <!-- Jobs List -->
          <div class="jobs-main">
            <div class="jobs-header">
              <div class="results-info">
                <h2>พบ {{ filteredJobs.length }} ตำแหน่งงาน</h2>
                <p>อัพเดทล่าสุดเมื่อวันนี้</p>
              </div>
              <div class="sort-controls">
                <label>เรียงตาม:</label>
                <select v-model="sortBy" @change="sortJobs" class="sort-select">
                  <option value="latest">ล่าสุด</option>
                  <option value="salary-high">เงินเดือนสูงสุด</option>
                  <option value="salary-low">เงินเดือนต่ำสุด</option>
                  <option value="company">บริษัท A-Z</option>
                </select>
              </div>
            </div>

            <!-- Jobs Grid -->
            <div class="jobs-grid">
              <div
                v-for="job in paginatedJobs"
                :key="job.id"
                class="job-card"
                @click="goToJobDetail(job.id)"
              >
                <div class="job-card-header">
                  <div class="company-logo">
                    <img v-if="job.company.logo" :src="job.company.logo" :alt="job.company.name" />
                    <div v-else class="logo-placeholder">
                      {{ job.company.name.charAt(0) }}
                    </div>
                  </div>
                  <div class="job-badges">
                    <span class="badge badge-type" :class="job.type.toLowerCase().replace('-', '')">
                      {{ job.type }}
                    </span>
                    <span class="badge badge-new" v-if="isNew(job.postedDate)">ใหม่</span>
                  </div>
                </div>

                <div class="job-card-content">
                  <h3 class="job-title">{{ job.title }}</h3>
                  <p class="company-name">{{ job.company.name }}</p>

                  <div class="job-meta">
                    <span class="meta-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {{ job.location }}
                    </span>
                    <span class="meta-item">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      {{ job.postedDate }}
                    </span>
                  </div>

                  <div class="job-salary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    <span>{{ job.salary }}</span>
                  </div>

                  <div class="job-skills">
                    <span
                      v-for="(skill, index) in job.skills.slice(0, 3)"
                      :key="index"
                      class="skill-tag"
                    >
                      {{ skill }}
                    </span>
                    <span v-if="job.skills.length > 3" class="skill-more">
                      +{{ job.skills.length - 3 }}
                    </span>
                  </div>
                </div>

                <div class="job-card-footer">
                  <button
                    class="btn-save"
                    @click.stop="toggleSave(job.id)"
                    :class="{ saved: job.saved }"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      :fill="job.saved ? 'currentColor' : 'none'"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      ></path>
                    </svg>
                  </button>
                  <button class="btn-apply" @click.stop="applyJob(job.id)">สมัครงาน</button>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div class="pagination" v-if="totalPages > 1">
              <button class="page-btn" @click="currentPage--" :disabled="currentPage === 1">
                ← ก่อนหน้า
              </button>

              <button
                v-for="page in displayPages"
                :key="page"
                class="page-btn"
                :class="{ active: page === currentPage }"
                @click="currentPage = page"
              >
                {{ page }}
              </button>

              <button
                class="page-btn"
                @click="currentPage++"
                :disabled="currentPage === totalPages"
              >
                ถัดไป →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Search & Filters
const searchQuery = ref('')
const locationQuery = ref('')
const sortBy = ref('latest')
const currentPage = ref(1)
const itemsPerPage = 12

const filters = ref({
  fullTime: false,
  partTime: false,
  contract: false,
  remote: false,
  entry: false,
  mid: false,
  senior: false,
  salary: '',
  location: '',
})

// Mock Jobs Data
const mockJobs = ref([
  {
    id: 1,
    title: 'Full Stack Developer',
    company: {
      id: 1,
      name: 'Tech Company Ltd.',
      logo: '',
      description: 'บริษัทชั้นนำด้านเทคโนโลยี',
      employees: '500-1000',
      industry: 'เทคโนโลยีสารสนเทศ',
      website: 'https://techcompany.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Middle',
    experience: '3-5 ปี',
    salary: '50,000 - 80,000 บาท',
    positions: 2,
    postedDate: '3 วันที่แล้ว',
    deadline: '30 มิถุนายน 2567',
    description: 'เรากำลังมองหา Full Stack Developer ที่มีความสามารถ',
    responsibilities: [
      'พัฒนาและดูแล Web Application',
      'ออกแบบและพัฒนา RESTful API',
      'ทำงานร่วมกับ UI/UX Designer',
      'เขียน Unit Test และ Integration Test',
    ],
    qualifications: [
      'ปริญญาตรีสาขาวิทยาการคอมพิวเตอร์',
      'มีประสบการณ์ 3-5 ปี',
      'เชี่ยวชาญ JavaScript, Vue.js, Node.js',
    ],
    benefits: ['ประกันสุขภาพและประกันชีวิต', 'โบนัสประจำปี', 'วันหยุดพักผ่อน 15 วัน'],
    skills: ['JavaScript', 'Vue.js', 'Node.js', 'MongoDB', 'Docker'],
    saved: false,
  },
  {
    id: 2,
    title: 'Senior Frontend Developer',
    company: {
      id: 2,
      name: 'Digital Agency',
      logo: '',
      description: 'เอเจนซี่ดิจิทัลชั้นนำ',
      employees: '100-500',
      industry: 'Digital Marketing',
      website: 'https://digitalagency.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Senior',
    experience: '5+ ปี',
    salary: '60,000 - 90,000 บาท',
    positions: 1,
    postedDate: '5 วันที่แล้ว',
    deadline: '15 กรกฎาคม 2567',
    description: 'มองหา Senior Frontend Developer ที่มีประสบการณ์สูง',
    responsibilities: [
      'นำทีม Frontend Development',
      'ออกแบบ Architecture',
      'Code Review และ Mentoring',
    ],
    qualifications: ['ประสบการณ์ 5 ปีขึ้นไป', 'เชี่ยวชาญ React/Vue.js', 'มีประสบการณ์นำทีม'],
    benefits: ['ประกันสุขภาพ', 'โบนัสตามผลงาน', 'ทำงานที่บ้านได้'],
    skills: ['React', 'Vue.js', 'TypeScript', 'CSS', 'Webpack'],
    saved: false,
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: {
      id: 3,
      name: 'StartUp Co.',
      logo: '',
      description: 'สตาร์ทอัพที่กำลังเติบโต',
      employees: '50-100',
      industry: 'Financial Technology',
      website: 'https://startup.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Middle',
    experience: '2-4 ปี',
    salary: '45,000 - 70,000 บาท',
    positions: 3,
    postedDate: '1 วันที่แล้ว',
    deadline: '20 กรกฎาคม 2567',
    description: 'รับสมัคร Backend Developer มาร่วมทีมพัฒนา FinTech',
    responsibilities: ['พัฒนา API และ Microservices', 'จัดการ Database', 'ทำ Performance Tuning'],
    qualifications: [
      'ประสบการณ์ 2-4 ปี',
      'เชี่ยวชาญ Node.js หรือ Python',
      'มีความรู้ด้าน Database',
    ],
    benefits: ['ประกันสุขภาพ', 'โบนัสและ Stock Options', 'สภาพแวดล้อมทำงานแบบ Startup'],
    skills: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'AWS'],
    saved: false,
  },
  {
    id: 4,
    title: 'UI/UX Designer',
    company: {
      id: 4,
      name: 'Design Studio',
      logo: '',
      description: 'สตูดิโอดีไซน์ชั้นนำ',
      employees: '20-50',
      industry: 'Creative Agency',
      website: 'https://designstudio.com',
    },
    location: 'เชียงใหม่',
    type: 'Full-Time',
    level: 'Middle',
    experience: '3-5 ปี',
    salary: '40,000 - 60,000 บาท',
    positions: 1,
    postedDate: '2 วันที่แล้ว',
    deadline: '25 กรกฎาคม 2567',
    description: 'รับสมัคร UI/UX Designer ที่มีความคิดสร้างสรรค์',
    responsibilities: [
      'ออกแบบ UI/UX สำหรับ Web และ Mobile',
      'สร้าง Wireframe และ Prototype',
      'ทำ User Research',
    ],
    qualifications: ['ประสบการณ์ 3-5 ปี', 'เชี่ยวชาญ Figma, Adobe XD', 'มี Portfolio ที่โดดเด่น'],
    benefits: ['ประกันสุขภาพ', 'โบนัสตามผลงาน', 'Work from Home 2 วัน/สัปดาห์'],
    skills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    saved: false,
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: {
      id: 5,
      name: 'Cloud Solutions',
      logo: '',
      description: 'ผู้ให้บริการ Cloud ชั้นนำ',
      employees: '200-500',
      industry: 'Cloud Computing',
      website: 'https://cloudsolutions.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Senior',
    experience: '5+ ปี',
    salary: '70,000 - 100,000 บาท',
    positions: 2,
    postedDate: '4 วันที่แล้ว',
    deadline: '10 กรกฎาคม 2567',
    description: 'รับสมัคร DevOps Engineer มากประสบการณ์',
    responsibilities: [
      'จัดการ Infrastructure และ CI/CD',
      'ทำ Automation และ Monitoring',
      'จัดการ Cloud Services',
    ],
    qualifications: [
      'ประสบการณ์ 5 ปีขึ้นไป',
      'เชี่ยวชาญ AWS/GCP/Azure',
      'มีความรู้ Kubernetes, Docker',
    ],
    benefits: ['ประกันสุขภาพและทันตกรรม', 'โบนัส 4-6 เดือน', 'Training Budget'],
    skills: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins'],
    saved: false,
  },
  {
    id: 6,
    title: 'Mobile Developer (React Native)',
    company: {
      id: 6,
      name: 'App Development',
      logo: '',
      description: 'บริษัทพัฒนาแอพพลิเคชั่น',
      employees: '100-200',
      industry: 'Mobile Development',
      website: 'https://appdev.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Middle',
    experience: '3-5 ปี',
    salary: '50,000 - 75,000 บาท',
    positions: 2,
    postedDate: '1 วันที่แล้ว',
    deadline: '30 มิถุนายน 2567',
    description: 'รับสมัคร Mobile Developer ที่เชี่ยวชาญ React Native',
    responsibilities: [
      'พัฒนา Mobile App ด้วย React Native',
      'ทำงานร่วมกับ Backend Team',
      'ปรับปรุง Performance',
    ],
    qualifications: ['ประสบการณ์ 3-5 ปี', 'เชี่ยวชาญ React Native', 'มีแอพที่เผยแพร่บน Store'],
    benefits: ['ประกันสุขภาพ', 'โบนัสประจำปี', 'Flexible Hours'],
    skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'],
    saved: false,
  },
  {
    id: 7,
    title: 'Data Scientist',
    company: {
      id: 7,
      name: 'AI Research Lab',
      logo: '',
      description: 'ห้องวิจัย AI และ Data Science',
      employees: '50-100',
      industry: 'Artificial Intelligence',
      website: 'https://ailab.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Senior',
    experience: '5+ ปี',
    salary: '80,000 - 120,000 บาท',
    positions: 1,
    postedDate: '6 วันที่แล้ว',
    deadline: '5 กรกฎาคม 2567',
    description: 'รับสมัคร Data Scientist ที่มีประสบการณ์ด้าน ML/AI',
    responsibilities: [
      'วิเคราะห์ข้อมูลและสร้าง Model',
      'พัฒนา Machine Learning Algorithm',
      'ทำ Data Visualization',
    ],
    qualifications: [
      'ปริญญาโทขึ้นไปด้าน CS/Statistics',
      'ประสบการณ์ 5 ปีขึ้นไป',
      'เชี่ยวชาญ Python, R',
    ],
    benefits: ['ประกันสุขภาพและชีวิต', 'โบนัสตามผลงาน', 'Conference Budget'],
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Statistics'],
    saved: false,
  },
  {
    id: 8,
    title: 'Product Manager',
    company: {
      id: 8,
      name: 'E-Commerce Giant',
      logo: '',
      description: 'แพลตฟอร์ม E-Commerce ชั้นนำ',
      employees: '1000+',
      industry: 'E-Commerce',
      website: 'https://ecommerce.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Senior',
    experience: '5+ ปี',
    salary: '70,000 - 100,000 บาท',
    positions: 1,
    postedDate: '3 วันที่แล้ว',
    deadline: '15 กรกฎาคม 2567',
    description: 'รับสมัคร Product Manager ที่มีประสบการณ์',
    responsibilities: [
      'กำหนด Product Strategy',
      'ทำงานร่วมกับ Tech และ Design Team',
      'วิเคราะห์ Market และ User Feedback',
    ],
    qualifications: ['ประสบการณ์ 5 ปีขึ้นไป', 'มีความรู้ Agile/Scrum', 'ทักษะการสื่อสารดีเยี่ยม'],
    benefits: ['ประกันสุขภาพครอบครัว', 'โบนัส 4-6 เดือน', 'Employee Discount'],
    skills: ['Product Management', 'Agile', 'Analytics', 'Leadership', 'UX'],
    saved: false,
  },
  {
    id: 9,
    title: 'QA Engineer',
    company: {
      id: 9,
      name: 'Software House',
      logo: '',
      description: 'บริษัทพัฒนาซอฟต์แวร์',
      employees: '100-200',
      industry: 'Software Development',
      website: 'https://softwarehouse.com',
    },
    location: 'ชลบุรี',
    type: 'Full-Time',
    level: 'Middle',
    experience: '2-4 ปี',
    salary: '35,000 - 55,000 บาท',
    positions: 2,
    postedDate: '2 วันที่แล้ว',
    deadline: '20 กรกฎาคม 2567',
    description: 'รับสมัคร QA Engineer มาร่วมทีม',
    responsibilities: [
      'ทดสอบ Software และ Web Application',
      'เขียน Test Case และ Test Plan',
      'ทำ Automation Testing',
    ],
    qualifications: [
      'ประสบการณ์ 2-4 ปี',
      'มีความรู้ Testing Methodology',
      'เชี่ยวชาญ Automation Tools',
    ],
    benefits: ['ประกันสุขภาพ', 'โบนัสประจำปี', 'ค่าเดินทาง'],
    skills: ['Manual Testing', 'Selenium', 'Automation', 'JIRA', 'SQL'],
    saved: false,
  },
  {
    id: 10,
    title: 'Business Analyst',
    company: {
      id: 10,
      name: 'Consulting Firm',
      logo: '',
      description: 'บริษัทให้คำปรึกษาธุรกิจ',
      employees: '200-500',
      industry: 'Consulting',
      website: 'https://consulting.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    level: 'Middle',
    experience: '3-5 ปี',
    salary: '45,000 - 70,000 บาท',
    positions: 2,
    postedDate: '5 วันที่แล้ว',
    deadline: '25 กรกฎาคม 2567',
    description: 'รับสมัคร Business Analyst มาวิเคราะห์ธุรกิจ',
    responsibilities: [
      'วิเคราะห์ความต้องการทางธุรกิจ',
      'สร้าง Business Requirement',
      'ทำงานร่วมกับ Stakeholders',
    ],
    qualifications: ['ประสบการณ์ 3-5 ปี', 'มีความรู้ Business Analysis', 'ทักษะการสื่อสารดี'],
    benefits: ['ประกันสุขภาพ', 'โบนัสตามผลงาน', 'Training & Development'],
    skills: ['Business Analysis', 'SQL', 'Excel', 'Communication', 'BPMN'],
    saved: false,
  },
  {
    id: 11,
    title: 'Graphic Designer',
    company: {
      id: 11,
      name: 'Creative Agency',
      logo: '',
      description: 'เอเจนซี่สร้างสรรค์',
      employees: '50-100',
      industry: 'Advertising',
      website: 'https://creative.com',
    },
    location: 'ภูเก็ต',
    type: 'Full-Time',
    level: 'Entry',
    experience: '1-2 ปี',
    salary: '25,000 - 35,000 บาท',
    positions: 1,
    postedDate: '1 วันที่แล้ว',
    deadline: '30 มิถุนายน 2567',
    description: 'รับสมัคร Graphic Designer จบใหม่หรือมีประสบการณ์',
    responsibilities: [
      'ออกแบบกราฟิกสำหรับสื่อต่างๆ',
      'สร้าง Visual Identity',
      'ทำงานร่วมกับทีม Creative',
    ],
    qualifications: [
      'ปริญญาตรีด้าน Graphic Design',
      'เชี่ยวชาญ Adobe Creative Suite',
      'มี Portfolio ที่น่าสนใจ',
    ],
    benefits: ['ประกันสังคม', 'โบนัสประจำปี', 'ค่าอาหารและเดินทาง'],
    skills: ['Photoshop', 'Illustrator', 'InDesign', 'Typography', 'Branding'],
    saved: false,
  },
  {
    id: 12,
    title: 'Content Writer',
    company: {
      id: 12,
      name: 'Media Company',
      logo: '',
      description: 'บริษัทสื่อและคอนเทนต์',
      employees: '100-200',
      industry: 'Media & Publishing',
      website: 'https://media.com',
    },
    location: 'กรุงเทพมหานคร',
    type: 'Part-Time',
    level: 'Entry',
    experience: '0-2 ปี',
    salary: '20,000 - 30,000 บาท',
    positions: 3,
    postedDate: '4 วันที่แล้ว',
    deadline: '10 กรกฎาคม 2567',
    description: 'รับสมัคร Content Writer (Part-Time)',
    responsibilities: ['เขียนบทความและคอนเทนต์', 'วิจัยและรวบรวมข้อมูล', 'ทำ SEO Content'],
    qualifications: ['จบใหม่หรือมีประสบการณ์', 'เขียนภาษาไทยได้ดี', 'มีความคิดสร้างสรรค์'],
    benefits: ['ยืดหยุ่นเวลาทำงาน', 'ทำงานที่บ้านได้', 'โบนัสตามผลงาน'],
    skills: ['Writing', 'SEO', 'Content Strategy', 'Research', 'Thai Language'],
    saved: false,
  },
])

// Computed Properties
const filteredJobs = computed(() => {
  let jobs = [...mockJobs.value]

  // Search Filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    jobs = jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(query) ||
        job.company.name.toLowerCase().includes(query) ||
        job.skills.some((skill) => skill.toLowerCase().includes(query))
    )
  }

  // Location Filter
  if (locationQuery.value) {
    const location = locationQuery.value.toLowerCase()
    jobs = jobs.filter((job) => job.location.toLowerCase().includes(location))
  }

  // Type Filters
  const typeFilters = []
  if (filters.value.fullTime) typeFilters.push('Full-Time')
  if (filters.value.partTime) typeFilters.push('Part-Time')
  if (filters.value.contract) typeFilters.push('Contract')
  if (filters.value.remote) typeFilters.push('Remote')

  if (typeFilters.length > 0) {
    jobs = jobs.filter((job) => typeFilters.includes(job.type))
  }

  // Level Filters
  const levelFilters = []
  if (filters.value.entry) levelFilters.push('Entry')
  if (filters.value.mid) levelFilters.push('Middle')
  if (filters.value.senior) levelFilters.push('Senior')

  if (levelFilters.length > 0) {
    jobs = jobs.filter((job) => levelFilters.includes(job.level))
  }

  // Location Dropdown Filter
  if (filters.value.location) {
    jobs = jobs.filter((job) => job.location === filters.value.location)
  }

  return jobs
})

const paginatedJobs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredJobs.value.slice(start, end)
})

const totalPages = computed(() => {
  return Math.ceil(filteredJobs.value.length / itemsPerPage)
})

const displayPages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }

  return pages
})

// Methods
const searchJobs = () => {
  currentPage.value = 1
}

const applyFilters = () => {
  currentPage.value = 1
}

const clearFilters = () => {
  filters.value = {
    fullTime: false,
    partTime: false,
    contract: false,
    remote: false,
    entry: false,
    mid: false,
    senior: false,
    salary: '',
    location: '',
  }
  searchQuery.value = ''
  locationQuery.value = ''
  currentPage.value = 1
}

const sortJobs = () => {
  // Implement sorting logic
  currentPage.value = 1
}

const goToJobDetail = (id) => {
  router.push(`/jobs/${id}`)
}

const toggleSave = (id) => {
  const job = mockJobs.value.find((j) => j.id === id)
  if (job) {
    job.saved = !job.saved
  }
}

const applyJob = (id) => {
  alert(`สมัครงาน ID: ${id} - ระบบกำลังพัฒนา`)
}

const isNew = (postedDate) => {
  return postedDate.includes('1 วัน') || postedDate.includes('2 วัน')
}
</script>

<style scoped>
.jobs-page {
  min-height: 100vh;
  padding-top: 80px;
  background: #f8f9fa;
}

/* Hero Section */
.jobs-hero {
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  padding: 80px 20px;
  color: white;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.hero-title {
  font-size: 48px;
  font-weight: 800;
  margin-bottom: 20px;
}

.hero-subtitle {
  font-size: 20px;
  margin-bottom: 50px;
  opacity: 0.95;
}

/* Search Box */
.search-box {
  background: white;
  border-radius: 16px;
  padding: 12px;
  display: grid;
  grid-template-columns: 2fr 1.5fr auto;
  gap: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

.search-input-group {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 20px;
  border-right: 2px solid #f0f0f0;
}

.search-input-group:last-of-type {
  border-right: none;
}

.search-input-group svg {
  color: #666;
  flex-shrink: 0;
}

.search-input-group input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  color: #333;
}

.search-input-group input::placeholder {
  color: #999;
}

.search-btn {
  padding: 18px 40px;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 58, 112, 0.3);
}

/* Jobs Content */
.jobs-content {
  padding: 60px 20px;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
}

.content-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 40px;
}

/* Filters Sidebar */
.filters-sidebar {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.filter-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.filter-title {
  font-size: 22px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.filter-group {
  margin-bottom: 30px;
}

.filter-label {
  font-size: 15px;
  font-weight: 600;
  color: #333;
  margin-bottom: 15px;
  display: block;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  cursor: pointer;
  transition: all 0.2s ease;
}

.checkbox-label:hover {
  color: #0056a8;
}

.checkbox-label input[type='checkbox'] {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #0056a8;
}

.filter-select {
  width: 100%;
  padding: 12px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.3s ease;
}

.filter-select:focus {
  outline: none;
  border-color: #0056a8;
}

.btn-clear-filters {
  width: 100%;
  padding: 12px;
  background: #f8f9fa;
  color: #666;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-clear-filters:hover {
  background: #fff;
  border-color: #0056a8;
  color: #0056a8;
}

/* Jobs Main */
.jobs-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 20px;
}

.results-info h2 {
  font-size: 28px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 5px;
}

.results-info p {
  font-size: 14px;
  color: #666;
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-controls label {
  font-size: 14px;
  color: #666;
  font-weight: 600;
}

.sort-select {
  padding: 10px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: white;
}

.sort-select:focus {
  outline: none;
  border-color: #0056a8;
}

/* Jobs Grid */
.jobs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 25px;
  margin-bottom: 50px;
}

.job-card {
  background: white;
  border-radius: 16px;
  padding: 25px;
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
}

.job-card:hover {
  border-color: #0056a8;
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
}

.company-logo {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  flex-shrink: 0;
}

.company-logo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  font-size: 24px;
  font-weight: 700;
}

.job-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.badge {
  padding: 5px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
}

.badge-type {
  background: #e3f2fd;
  color: #1976d2;
}

.badge-type.parttime {
  background: #fff3e0;
  color: #f57c00;
}

.badge-type.contract {
  background: #f3e5f5;
  color: #7b1fa2;
}

.badge-type.remote {
  background: #e8f5e9;
  color: #388e3c;
}

.badge-new {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #333;
}

.job-card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.job-title {
  font-size: 20px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 8px;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.company-name {
  font-size: 15px;
  color: #666;
  margin-bottom: 15px;
}

.job-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #f0f0f0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #666;
}

.meta-item svg {
  color: #0056a8;
  flex-shrink: 0;
}

.job-salary {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%);
  border-radius: 10px;
  margin-bottom: 15px;
  border-left: 3px solid #ffd700;
}

.job-salary svg {
  color: #f39c12;
  flex-shrink: 0;
}

.job-salary span {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}

.job-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.skill-tag {
  padding: 6px 12px;
  background: #f0f7ff;
  color: #0056a8;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  border: 1px solid #e3f2fd;
}

.skill-more {
  padding: 6px 12px;
  background: #f8f9fa;
  color: #666;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.job-card-footer {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-top: auto;
}

.btn-save {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.btn-save:hover {
  border-color: #ef5350;
  color: #ef5350;
}

.btn-save.saved {
  background: #ffebee;
  border-color: #ef5350;
  color: #ef5350;
}

.btn-apply {
  flex: 1;
  padding: 12px 24px;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-apply:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 58, 112, 0.3);
}

/* Pagination */
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 50px;
}

.page-btn {
  min-width: 45px;
  height: 45px;
  padding: 0 16px;
  border-radius: 10px;
  border: 2px solid #e0e0e0;
  background: white;
  color: #666;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.page-btn:hover:not(:disabled) {
  border-color: #0056a8;
  color: #0056a8;
}

.page-btn.active {
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  border-color: transparent;
}

.page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Responsive Design */
@media (max-width: 1200px) {
  .jobs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 968px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .filters-sidebar {
    position: static;
    order: 2;
  }

  .jobs-main {
    order: 1;
  }

  .search-box {
    grid-template-columns: 1fr;
  }

  .search-input-group {
    border-right: none;
    border-bottom: 2px solid #f0f0f0;
    padding: 15px 20px;
  }

  .search-input-group:last-of-type {
    border-bottom: none;
  }

  .search-btn {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .jobs-page {
    padding-top: 70px;
  }

  .jobs-hero {
    padding: 60px 20px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
    margin-bottom: 35px;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .jobs-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .sort-controls {
    width: 100%;
  }

  .sort-select {
    flex: 1;
  }

  .filter-card {
    padding: 20px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 26px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .jobs-content {
    padding: 40px 15px;
  }

  .results-info h2 {
    font-size: 22px;
  }

  .job-card {
    padding: 20px;
  }

  .job-title {
    font-size: 18px;
  }

  .company-logo {
    width: 50px;
    height: 50px;
  }

  .pagination {
    gap: 5px;
    flex-wrap: wrap;
  }

  .page-btn {
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    font-size: 14px;
  }
}
</style>

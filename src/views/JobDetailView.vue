<template>
  <div class="job-detail-page">
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>กำลังโหลดข้อมูล...</p>
    </div>

    <div v-else-if="job" class="job-detail-container">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <div class="container">
          <router-link to="/">หน้าแรก</router-link>
          <span class="separator">/</span>
          <router-link to="/jobs">ค้นหางาน</router-link>
          <span class="separator">/</span>
          <span class="current">{{ job.title }}</span>
        </div>
      </div>

      <!-- Job Header -->
      <section class="job-header">
        <div class="container">
          <div class="header-content">
            <div class="company-logo">
              <img v-if="job.company.logo" :src="job.company.logo" :alt="job.company.name" />
              <div v-else class="logo-placeholder">
                {{ job.company.name.charAt(0) }}
              </div>
            </div>

            <div class="job-info">
              <div class="job-meta">
                <span class="job-type" :class="job.type.toLowerCase()">{{ job.type }}</span>
                <span class="job-posted">เผยแพร่ {{ job.postedDate }}</span>
              </div>
              <h1 class="job-title">{{ job.title }}</h1>
              <div class="company-info">
                <h2 class="company-name">{{ job.company.name }}</h2>
                <div class="job-location">
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
                </div>
              </div>
              <div class="job-salary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span class="salary-amount">{{ job.salary }}</span>
              </div>
            </div>

            <div class="job-actions">
              <button class="btn btn-primary btn-apply" @click="applyJob">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                สมัครงานตำแหน่งนี้
              </button>
              <button
                class="btn btn-secondary btn-save"
                @click="saveJob"
                :class="{ saved: isSaved }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  :fill="isSaved ? 'currentColor' : 'none'"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                  ></path>
                </svg>
                {{ isSaved ? 'บันทึกแล้ว' : 'บันทึกงาน' }}
              </button>
              <button class="btn btn-secondary btn-share" @click="shareJob">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                แชร์
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Job Content -->
      <section class="job-content">
        <div class="container">
          <div class="content-grid">
            <!-- Main Content -->
            <div class="main-content">
              <!-- Job Description -->
              <div class="content-card">
                <h3 class="card-title">รายละเอียดงาน</h3>
                <div class="card-content">
                  <p>{{ job.description }}</p>
                </div>
              </div>

              <!-- Responsibilities -->
              <div class="content-card">
                <h3 class="card-title">หน้าที่และความรับผิดชอบ</h3>
                <div class="card-content">
                  <ul class="list-items">
                    <li v-for="(responsibility, index) in job.responsibilities" :key="index">
                      {{ responsibility }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Qualifications -->
              <div class="content-card">
                <h3 class="card-title">คุณสมบัติผู้สมัคร</h3>
                <div class="card-content">
                  <ul class="list-items">
                    <li v-for="(qualification, index) in job.qualifications" :key="index">
                      {{ qualification }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Benefits -->
              <div class="content-card">
                <h3 class="card-title">สวัสดิการ</h3>
                <div class="card-content">
                  <ul class="list-items benefits-list">
                    <li v-for="(benefit, index) in job.benefits" :key="index">
                      <span class="benefit-icon">✓</span>
                      {{ benefit }}
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Skills -->
              <div class="content-card">
                <h3 class="card-title">ทักษะที่ต้องการ</h3>
                <div class="card-content">
                  <div class="skills-tags">
                    <span v-for="(skill, index) in job.skills" :key="index" class="skill-tag">
                      {{ skill }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Sidebar -->
            <div class="sidebar">
              <!-- Quick Info -->
              <div class="sidebar-card">
                <h3 class="sidebar-title">ข้อมูลสรุป</h3>
                <div class="info-list">
                  <div class="info-item">
                    <span class="info-label">ประเภทงาน</span>
                    <span class="info-value">{{ job.type }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">ระดับ</span>
                    <span class="info-value">{{ job.level }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">ประสบการณ์</span>
                    <span class="info-value">{{ job.experience }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">เงินเดือน</span>
                    <span class="info-value salary">{{ job.salary }}</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">จำนวนที่รับ</span>
                    <span class="info-value">{{ job.positions }} อัตรา</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">ปิดรับสมัคร</span>
                    <span class="info-value">{{ job.deadline }}</span>
                  </div>
                </div>
              </div>

              <!-- Company Info -->
              <div class="sidebar-card">
                <h3 class="sidebar-title">เกี่ยวกับบริษัท</h3>
                <div class="company-details">
                  <div class="company-logo-sidebar">
                    <img v-if="job.company.logo" :src="job.company.logo" :alt="job.company.name" />
                    <div v-else class="logo-placeholder">
                      {{ job.company.name.charAt(0) }}
                    </div>
                  </div>
                  <h4>{{ job.company.name }}</h4>
                  <p class="company-description">{{ job.company.description }}</p>
                  <div class="company-stats">
                    <div class="stat">
                      <span class="stat-icon">👥</span>
                      <span class="stat-text">{{ job.company.employees }} พนักงาน</span>
                    </div>
                    <div class="stat">
                      <span class="stat-icon">🏢</span>
                      <span class="stat-text">{{ job.company.industry }}</span>
                    </div>
                    <div class="stat">
                      <span class="stat-icon">🌐</span>
                      <a :href="job.company.website" target="_blank" class="stat-link">
                        เว็บไซต์บริษัท
                      </a>
                    </div>
                  </div>
                  <router-link :to="`/company/${job.company.id}`" class="btn btn-outline">
                    ดูงานทั้งหมดจากบริษัทนี้
                  </router-link>
                </div>
              </div>

              <!-- Share -->
              <div class="sidebar-card">
                <h3 class="sidebar-title">แชร์ตำแหน่งงานนี้</h3>
                <div class="share-buttons">
                  <button class="share-btn facebook" @click="shareToFacebook">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
                      />
                    </svg>
                  </button>
                  <button class="share-btn twitter" @click="shareToTwitter">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                      />
                    </svg>
                  </button>
                  <button class="share-btn linkedin" @click="shareToLinkedIn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
                      />
                    </svg>
                  </button>
                  <button class="share-btn line" @click="shareToLine">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Similar Jobs -->
      <section class="similar-jobs">
        <div class="container">
          <h2 class="section-title">ตำแหน่งงานที่คล้ายกัน</h2>
          <div class="jobs-grid">
            <div v-for="similarJob in similarJobs" :key="similarJob.id" class="job-card">
              <div class="job-card-header">
                <div class="company-logo-small">
                  <img
                    v-if="similarJob.company.logo"
                    :src="similarJob.company.logo"
                    :alt="similarJob.company.name"
                  />
                  <div v-else class="logo-placeholder-small">
                    {{ similarJob.company.name.charAt(0) }}
                  </div>
                </div>
                <span class="job-type-badge" :class="similarJob.type.toLowerCase()">{{
                  similarJob.type
                }}</span>
              </div>
              <h3 class="job-card-title">{{ similarJob.title }}</h3>
              <p class="job-card-company">{{ similarJob.company.name }}</p>
              <div class="job-card-meta">
                <span class="meta-item">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  {{ similarJob.location }}
                </span>
                <span class="meta-item salary">{{ similarJob.salary }}</span>
              </div>
              <router-link :to="`/jobs/${similarJob.id}`" class="btn btn-outline btn-block">
                ดูรายละเอียด
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div v-else class="error-container">
      <div class="error-content">
        <span class="error-icon">😕</span>
        <h2>ไม่พบตำแหน่งงานที่ค้นหา</h2>
        <p>ตำแหน่งงานนี้อาจถูกปิดรับสมัครหรือถูกลบไปแล้ว</p>
        <router-link to="/jobs" class="btn btn-primary">กลับไปหน้าค้นหางาน</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const loading = ref(true)
const isSaved = ref(false)

// Mock Data
const job = ref({
  id: 1,
  title: 'Full Stack Developer',
  company: {
    id: 1,
    name: 'Tech Company Ltd.',
    logo: '',
    description:
      'บริษัทชั้นนำด้านเทคโนโลยีที่มุ่งมั่นพัฒนาโซลูชันที่ทันสมัยและมีนวัตกรรม เราสร้างสรรค์ผลิตภัณฑ์ที่เปลี่ยนแปลงวิถีชีวิตของผู้คน',
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
  description:
    'เรากำลังมองหา Full Stack Developer ที่มีความสามารถและหลงใหล่ในการพัฒนาซอฟต์แวร์ เพื่อเข้าร่วมทีมพัฒนาผลิตภัณฑ์ที่ทันสมัยและมีผู้ใช้งานหลายล้านคน คุณจะได้ทำงานกับเทคโนโลยีที่ล้ำสมัยและทีมงานที่มีประสบการณ์',
  responsibilities: [
    'พัฒนาและดูแล Web Application ทั้ง Frontend และ Backend',
    'ออกแบบและพัฒนา RESTful API ที่มีประสิทธิภาพ',
    'ทำงานร่วมกับ UI/UX Designer เพื่อสร้างประสบการณ์ผู้ใช้ที่ดี',
    'เขียน Unit Test และ Integration Test',
    'ปรับปรุงประสิทธิภาพของระบบอย่างต่อเนื่อง',
    'ทำงานร่วมกับทีมในรูปแบบ Agile/Scrum',
  ],
  qualifications: [
    'ปริญญาตรีสาขาวิทยาการคอมพิวเตอร์ หรือสาขาที่เกี่ยวข้อง',
    'มีประสบการณ์ 3-5 ปี ในการพัฒนา Web Application',
    'มีความเชี่ยวชาญใน JavaScript, Vue.js, Node.js, MongoDB',
    'มีความรู้เกี่ยวกับ Git, Docker, และ CI/CD',
    'สามารถสื่อสารภาษาอังกฤษได้ในระดับดี',
    'มีทักษะการแก้ปัญหาและการทำงานเป็นทีม',
  ],
  benefits: [
    'ประกันสุขภาพและประกันชีวิต',
    'ประกันสังคม',
    'โบนัสประจำปี',
    'วันหยุดพักผ่อนประจำปี 15 วัน',
    'ค่าเดินทาง',
    'ค่าอาหารกลางวัน',
    'โอกาสในการเติบโตและพัฒนาทักษะ',
    'สภาพแวดล้อมการทำงานที่ทันสมัย',
    'กิจกรรมสันทนาการและทีมบิลดิ้ง',
  ],
  skills: [
    'JavaScript',
    'Vue.js',
    'Node.js',
    'MongoDB',
    'Express.js',
    'Git',
    'Docker',
    'RESTful API',
    'HTML/CSS',
    'Agile/Scrum',
  ],
})

const similarJobs = ref([
  {
    id: 2,
    title: 'Senior Frontend Developer',
    company: { name: 'Digital Agency', logo: '' },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    salary: '60,000 - 90,000 บาท',
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: { name: 'StartUp Co.', logo: '' },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    salary: '45,000 - 70,000 บาท',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: { name: 'Cloud Solutions', logo: '' },
    location: 'กรุงเทพมหานคร',
    type: 'Full-Time',
    salary: '55,000 - 85,000 บาท',
  },
])

onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 500)
})

const applyJob = () => {
  alert('ระบบสมัครงานกำลังพัฒนา')
}

const saveJob = () => {
  isSaved.value = !isSaved.value
}

const shareJob = () => {
  if (navigator.share) {
    navigator.share({
      title: job.value.title,
      text: `${job.value.title} ที่ ${job.value.company.name}`,
      url: window.location.href,
    })
  } else {
    alert('คัดลอก URL แล้ว!')
    navigator.clipboard.writeText(window.location.href)
  }
}

const shareToFacebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    '_blank'
  )
}

const shareToTwitter = () => {
  window.open(
    `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      window.location.href
    )}&text=${encodeURIComponent(job.value.title)}`,
    '_blank'
  )
}

const shareToLinkedIn = () => {
  window.open(
    `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      window.location.href
    )}`,
    '_blank'
  )
}

const shareToLine = () => {
  window.open(
    `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`,
    '_blank'
  )
}
</script>

<style scoped>
.job-detail-page {
  min-height: 100vh;
  background: #f8f9fa;
  padding-top: 80px;
}

/* Loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f0f0f0;
  border-top-color: #0056a8;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Breadcrumb */
.breadcrumb {
  background: white;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.breadcrumb .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
}

.breadcrumb a {
  color: #0056a8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb a:hover {
  color: #003a70;
  text-decoration: underline;
}

.breadcrumb .separator {
  color: #999;
}

.breadcrumb .current {
  color: #333;
  font-weight: 600;
}

/* Job Header */
.job-header {
  background: white;
  padding: 50px 20px;
  border-bottom: 1px solid #e0e0e0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 30px;
  align-items: start;
}

.company-logo {
  width: 120px;
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background: white;
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
  font-size: 48px;
  font-weight: 700;
}

.job-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.job-type {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
}

.job-type.full-time {
  background: #e3f2fd;
  color: #1976d2;
}

.job-type.part-time {
  background: #fff3e0;
  color: #f57c00;
}

.job-type.contract {
  background: #f3e5f5;
  color: #7b1fa2;
}

.job-posted {
  color: #666;
  font-size: 14px;
}

.job-title {
  font-size: 42px;
  font-weight: 800;
  color: #003a70;
  margin-bottom: 10px;
  line-height: 1.2;
}

.company-name {
  font-size: 24px;
  font-weight: 700;
  color: #333;
  margin-bottom: 8px;
}

.job-location {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 16px;
  margin-bottom: 20px;
}

.job-location svg {
  color: #0056a8;
}

.job-salary {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  background: linear-gradient(135deg, #fff9e6 0%, #fff3cc 100%);
  border-radius: 12px;
  border-left: 4px solid #ffd700;
}

.job-salary svg {
  color: #f39c12;
}

.salary-amount {
  font-size: 24px;
  font-weight: 700;
  color: #333;
}

.job-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn {
  padding: 14px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 15px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
}

.btn-primary {
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 58, 112, 0.3);
}

.btn-secondary {
  background: white;
  color: #666;
  border: 2px solid #e0e0e0;
}

.btn-secondary:hover {
  border-color: #0056a8;
  color: #0056a8;
}

.btn-secondary.saved {
  background: #ffebee;
  border-color: #ef5350;
  color: #ef5350;
}

.btn-outline {
  background: transparent;
  border: 2px solid #0056a8;
  color: #0056a8;
  padding: 12px 24px;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.btn-outline:hover {
  background: #0056a8;
  color: white;
}

.btn-block {
  width: 100%;
}

/* Job Content */
.job-content {
  padding: 60px 20px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 40px;
}

.content-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 25px;
  padding-bottom: 15px;
  border-bottom: 3px solid #f0f0f0;
}

.card-content p {
  font-size: 16px;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}

.list-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-items li {
  padding: 12px 0 12px 30px;
  position: relative;
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  border-bottom: 1px solid #f5f5f5;
}

.list-items li:last-child {
  border-bottom: none;
}

.list-items li:before {
  content: '✓';
  position: absolute;
  left: 0;
  top: 12px;
  color: #0056a8;
  font-weight: 700;
  font-size: 18px;
}

.benefits-list li {
  padding-left: 35px;
}

.benefit-icon {
  position: absolute;
  left: 0;
  top: 12px;
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  display: inline-block;
  padding: 10px 20px;
  background: #f0f7ff;
  color: #0056a8;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  border: 2px solid #e3f2fd;
}

/* Sidebar */
.sidebar-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 25px;
}

.sidebar-title {
  font-size: 20px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
}

.info-value {
  font-size: 15px;
  color: #333;
  font-weight: 600;
  text-align: right;
}

.info-value.salary {
  color: #0056a8;
  font-size: 16px;
}

.company-details {
  text-align: center;
}

.company-logo-sidebar {
  width: 100px;
  height: 100px;
  margin: 0 auto 20px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.company-logo-sidebar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.company-details h4 {
  font-size: 20px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 15px;
}

.company-description {
  font-size: 14px;
  line-height: 1.7;
  color: #666;
  margin-bottom: 20px;
}

.company-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 25px;
}

.stat {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 14px;
  color: #555;
}

.stat-icon {
  font-size: 18px;
}

.stat-link {
  color: #0056a8;
  text-decoration: none;
}

.stat-link:hover {
  text-decoration: underline;
}

/* Share Buttons */
.share-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.share-btn {
  width: 100%;
  aspect-ratio: 1;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  color: white;
}

.share-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
}

.share-btn.facebook {
  background: #1877f2;
}

.share-btn.twitter {
  background: #1da1f2;
}

.share-btn.linkedin {
  background: #0077b5;
}

.share-btn.line {
  background: #00b900;
}

/* Similar Jobs */
.similar-jobs {
  padding: 80px 20px;
  background: white;
  border-top: 1px solid #e0e0e0;
}

.section-title {
  font-size: 36px;
  font-weight: 800;
  color: #003a70;
  margin-bottom: 40px;
  text-align: center;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.job-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  border: 2px solid #f0f0f0;
  transition: all 0.3s ease;
}

.job-card:hover {
  border-color: #0056a8;
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.company-logo-small {
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.company-logo-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-placeholder-small {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  font-size: 20px;
  font-weight: 700;
}

.job-type-badge {
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.job-type-badge.full-time {
  background: #e3f2fd;
  color: #1976d2;
}

.job-card-title {
  font-size: 20px;
  font-weight: 700;
  color: #003a70;
  margin-bottom: 8px;
  line-height: 1.3;
}

.job-card-company {
  font-size: 15px;
  color: #666;
  margin-bottom: 15px;
}

.job-card-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #666;
}

.meta-item svg {
  color: #0056a8;
}

.meta-item.salary {
  color: #0056a8;
  font-weight: 600;
}

/* Error */
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
}

.error-content {
  text-align: center;
  max-width: 500px;
  padding: 40px;
}

.error-icon {
  font-size: 80px;
  margin-bottom: 20px;
  display: block;
}

.error-content h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 15px;
}

.error-content p {
  font-size: 16px;
  color: #666;
  margin-bottom: 30px;
}
@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .sidebar {
    order: -1;
  }

  .jobs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .job-header {
    padding: 30px 20px;
  }

  .header-content {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .company-logo {
    width: 80px;
    height: 80px;
    margin: 0 auto;
  }

  .job-info {
    text-align: center;
  }

  .job-title {
    font-size: 28px;
  }

  .company-name {
    font-size: 20px;
  }

  .job-location,
  .job-salary {
    justify-content: center;
  }

  .job-actions {
    width: 100%;
  }

  .btn {
    width: 100%;
  }

  .content-card {
    padding: 25px;
  }

  .card-title {
    font-size: 20px;
  }

  .sidebar-card {
    padding: 25px;
  }

  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .job-detail-page {
    padding-top: 70px;
  }

  .breadcrumb .container {
    font-size: 12px;
    flex-wrap: wrap;
  }

  .job-title {
    font-size: 24px;
  }

  .company-name {
    font-size: 18px;
  }

  .salary-amount {
    font-size: 20px;
  }

  .content-card {
    padding: 20px;
  }

  .card-title {
    font-size: 18px;
  }

  .card-content p,
  .list-items li {
    font-size: 14px;
  }

  .skill-tag {
    font-size: 12px;
    padding: 8px 14px;
  }

  .share-buttons {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
}
</style>

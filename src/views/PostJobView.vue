<template>
  <div class="post-job">
    <div class="container">
      <h1>ประกาศรับสมัครงาน</h1>

      <form @submit.prevent="handleSubmit" class="job-form">
        <div class="form-section">
          <h2>ข้อมูลตำแหน่งงาน</h2>

          <div class="form-group">
            <label>ชื่อตำแหน่งงาน *</label>
            <input
              v-model="jobData.title"
              type="text"
              required
              placeholder="เช่น Full Stack Developer"
            />
          </div>

          <div class="form-group">
            <label>หมวดหมู่งาน *</label>
            <select v-model="jobData.category" required>
              <option value="">เลือกหมวดหมู่</option>
              <option value="ไอที/โปรแกรมเมอร์">ไอที/โปรแกรมเมอร์</option>
              <option value="การตลาด">การตลาด</option>
              <option value="ขาย">ขาย</option>
              <option value="ทรัพยากรบุคคล">ทรัพยากรบุคคล</option>
              <option value="การเงิน/บัญชี">การเงิน/บัญชี</option>
            </select>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>จำนวนที่รับ *</label>
              <input v-model="jobData.positions" type="number" required min="1" />
            </div>

            <div class="form-group">
              <label>ประเภทการจ้างงาน *</label>
              <select v-model="jobData.type" required>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h2>รายละเอียดงาน</h2>

          <div class="form-group">
            <label>รายละเอียด *</label>
            <textarea
              v-model="jobData.description"
              rows="5"
              required
              placeholder="อธิบายรายละเอียดงาน..."
            ></textarea>
          </div>

          <div class="form-group">
            <label>คุณสมบัติผู้สมัคร * (แยกแต่ละข้อด้วย Enter)</label>
            <textarea
              v-model="jobData.requirements"
              rows="5"
              required
              placeholder="- ปริญญาตรี สาขาวิทยาการคอมพิวเตอร์&#10;- มีประสบการณ์ 2-3 ปี&#10;- มีความรู้ Vue.js, Node.js"
            ></textarea>
          </div>
        </div>

        <div class="form-section">
          <h2>ข้อมูลเงินเดือนและสวัสดิการ</h2>

          <div class="form-row">
            <div class="form-group">
              <label>เงินเดือนเริ่มต้น (บาท)</label>
              <input v-model.number="jobData.salaryMin" type="number" placeholder="30000" />
            </div>

            <div class="form-group">
              <label>เงินเดือนสูงสุด (บาท)</label>
              <input v-model.number="jobData.salaryMax" type="number" placeholder="50000" />
            </div>
          </div>

          <div class="form-group">
            <label>สวัสดิการ (แยกแต่ละข้อด้วย Enter)</label>
            <textarea
              v-model="jobData.benefits"
              rows="4"
              placeholder="- ประกันสังคม&#10;- ประกันสุขภาพกลุ่ม&#10;- โบนัสประจำปี"
            ></textarea>
          </div>
        </div>

        <div class="form-section">
          <h2>ข้อมูลบริษัท</h2>

          <div class="form-group">
            <label>ชื่อบริษัท *</label>
            <input v-model="jobData.company" type="text" required placeholder="ชื่อบริษัทของคุณ" />
          </div>

          <div class="form-group">
            <label>สถานที่ทำงาน *</label>
            <input
              v-model="jobData.location"
              type="text"
              required
              placeholder="เช่น กรุงเทพมหานคร"
            />
          </div>

          <div class="form-group">
            <label>อีเมลติดต่อ *</label>
            <input v-model="jobData.email" type="email" required placeholder="hr@company.com" />
          </div>

          <div class="form-group">
            <label>เบอร์โทรติดต่อ</label>
            <input v-model="jobData.phone" type="tel" placeholder="02-xxx-xxxx" />
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-cancel" @click="handleCancel">ยกเลิก</button>
          <button type="submit" class="btn-submit">ประกาศงาน</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useJobStore } from '../stores/jobs'

const router = useRouter()
const jobStore = useJobStore()

const jobData = reactive({
  title: '',
  category: '',
  positions: 1,
  type: 'Full-time',
  description: '',
  requirements: '',
  salaryMin: '',
  salaryMax: '',
  benefits: '',
  company: '',
  location: '',
  email: '',
  phone: '',
})

const handleSubmit = () => {
  // แปลง salary เป็น string
  const salary =
    jobData.salaryMin && jobData.salaryMax
      ? `${jobData.salaryMin.toLocaleString()} - ${jobData.salaryMax.toLocaleString()} บาท`
      : 'ตามตกลง'

  // แปลง requirements และ benefits จาก string เป็น array
  const requirements = jobData.requirements
    .split('\n')
    .map((item) => item.trim().replace(/^-\s*/, ''))
    .filter((item) => item)

  const benefits = jobData.benefits
    .split('\n')
    .map((item) => item.trim().replace(/^-\s*/, ''))
    .filter((item) => item)

  const newJob = {
    title: jobData.title,
    company: jobData.company,
    location: jobData.location,
    salary: salary,
    type: jobData.type,
    category: jobData.category,
    description: jobData.description,
    requirements: requirements.length > 0 ? requirements : ['ไม่ระบุ'],
    benefits: benefits.length > 0 ? benefits : ['ไม่ระบุ'],
    email: jobData.email,
    phone: jobData.phone,
  }

  jobStore.addJob(newJob)
  alert('ประกาศงานสำเร็จ!')
  router.push('/jobs')
}

const handleCancel = () => {
  if (confirm('คุณต้องการยกเลิกการประกาศงานใช่หรือไม่?')) {
    router.push('/')
  }
}
</script>

<style scoped>
.post-job {
  padding: 40px 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

.container {
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 30px;
  text-align: center;
}

.job-form {
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 2px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
}

.form-section h2 {
  font-size: 22px;
  color: #333;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 15px;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #003a70;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-actions {
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  margin-top: 30px;
}

.btn-cancel {
  padding: 15px 40px;
  border: 2px solid #003a70;
  background: white;
  color: #003a70;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.3s;
}

.btn-cancel:hover {
  background: #f5f5f5;
}

.btn-submit {
  padding: 15px 40px;
  background: #003a70;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-submit:hover {
  background: #002952;
}

@media (max-width: 768px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .job-form {
    padding: 20px;
  }
}
</style>

<template>
  <div class="job-list-page">
    <div class="container">
      <div class="page-header">
        <h1>ตำแหน่งงานทั้งหมด</h1>
        <p>พบ {{ filteredJobs.length }} ตำแหน่งงาน</p>
      </div>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label>ค้นหาตำแหน่ง</label>
          <input
            v-model="filters.keyword"
            type="text"
            placeholder="ระบุตำแหน่งงาน"
            @input="applyFilters"
          />
        </div>

        <div class="filter-group">
          <label>หมวดหมู่</label>
          <select v-model="filters.category" @change="applyFilters">
            <option value="">ทั้งหมด</option>
            <option value="ไอที/โปรแกรมเมอร์">ไอที/โปรแกรมเมอร์</option>
            <option value="การตลาด">การตลาด</option>
            <option value="ขาย">ขาย</option>
            <option value="ทรัพยากรบุคคล">ทรัพยากรบุคคล</option>
            <option value="การเงิน/บัญชี">การเงิน/บัญชี</option>
          </select>
        </div>

        <div class="filter-group">
          <label>สถานที่</label>
          <input
            v-model="filters.location"
            type="text"
            placeholder="ระบุสถานที่"
            @input="applyFilters"
          />
        </div>

        <div class="filter-group">
          <label>ประเภทงาน</label>
          <select v-model="filters.type" @change="applyFilters">
            <option value="">ทั้งหมด</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <button class="btn-clear" @click="clearFilters">ล้างตัวกรอง</button>
      </div>

      <!-- Job Cards Grid -->
      <div v-if="filteredJobs.length > 0" class="jobs-grid">
        <JobCard v-for="job in filteredJobs" :key="job.id" :job="job" />
      </div>

      <!-- No Results -->
      <div v-else class="no-results">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <h3>ไม่พบตำแหน่งงานที่ตรงกับการค้นหา</h3>
        <p>ลองเปลี่ยนคำค้นหาหรือตัวกรองใหม่</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useJobStore } from '../stores/jobs'
import JobCard from '../components/JobCard.vue'

const jobStore = useJobStore()

const filters = ref({
  keyword: '',
  category: '',
  location: '',
  type: '',
})

const filteredJobs = computed(() => {
  let result = jobStore.activeJobs

  if (filters.value.keyword) {
    result = result.filter(
      (job) =>
        job.title.toLowerCase().includes(filters.value.keyword.toLowerCase()) ||
        job.company.toLowerCase().includes(filters.value.keyword.toLowerCase()),
    )
  }

  if (filters.value.category) {
    result = result.filter((job) => job.category === filters.value.category)
  }

  if (filters.value.location) {
    result = result.filter((job) =>
      job.location.toLowerCase().includes(filters.value.location.toLowerCase()),
    )
  }

  if (filters.value.type) {
    result = result.filter((job) => job.type === filters.value.type)
  }

  return result
})

const applyFilters = () => {
  // Filters are reactive, so they apply automatically
}

const clearFilters = () => {
  filters.value = {
    keyword: '',
    category: '',
    location: '',
    type: '',
  }
}
</script>

<style scoped>
.job-list-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 40px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h1 {
  font-size: 32px;
  color: #333;
  margin-bottom: 8px;
}

.page-header p {
  color: #666;
  font-size: 16px;
}

.filters {
  background: white;
  padding: 24px;
  border-radius: 10px;
  margin-bottom: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-group label {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}

.filter-group input,
.filter-group select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

.filter-group input:focus,
.filter-group select:focus {
  outline: none;
  border-color: #003a70;
}

.btn-clear {
  padding: 10px 20px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  align-self: flex-end;
  transition: all 0.3s;
}

.btn-clear:hover {
  background: #e0e0e0;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 24px;
}

.no-results {
  text-align: center;
  padding: 80px 20px;
  background: white;
  border-radius: 10px;
}

.no-results svg {
  stroke-width: 2;
  margin-bottom: 20px;
}

.no-results h3 {
  color: #666;
  font-size: 20px;
  margin-bottom: 8px;
}

.no-results p {
  color: #999;
  font-size: 14px;
}

@media (max-width: 768px) {
  .jobs-grid {
    grid-template-columns: 1fr;
  }

  .filters {
    grid-template-columns: 1fr;
  }
}
</style>

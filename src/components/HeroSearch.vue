<template>
  <section class="hero">
    <div class="hero-content">
      <h1>ค้นหางาน</h1>
      <div class="search-form">
        <input
          v-model="searchData.position"
          type="text"
          class="search-input"
          placeholder="ระบุตำแหน่ง"
        />
        <input
          v-model="searchData.location"
          type="text"
          class="search-input"
          placeholder="ประเภทงาน/ท้องถิ่น"
        />
        <input
          v-model="searchData.company"
          type="text"
          class="search-input"
          placeholder="ระบุชื่อบริษัท หรือกิจการ"
        />
        <button class="btn-search" @click="handleSearch">หางาน</button>
      </div>

      <div class="filter-links">
        <button class="filter-btn">ตำแหน่งงานที่กำหนด - ไทย</button>
        <button class="filter-btn">ไอที - ไทย</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchData = reactive({
  position: '',
  location: '',
  company: '',
})

const handleSearch = () => {
  console.log('Searching:', searchData)
  router.push({
    path: '/jobs',
    query: {
      keyword: searchData.position,
      location: searchData.location,
    },
  })
}
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, #001a3d 0%, #003a70 100%);
  padding: 80px 50px;
  position: relative;
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  width: 400px;
  height: 400px;
  background: #e91e63;
  border-radius: 50%;
  top: -200px;
  left: 50px;
  opacity: 0.3;
}

.hero::after {
  content: '';
  position: absolute;
  width: 300px;
  height: 300px;
  background: #e91e63;
  border-radius: 50%;
  top: 100px;
  left: 150px;
  opacity: 0.2;
}

.hero-content {
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.hero h1 {
  color: white;
  font-size: 36px;
  margin-bottom: 30px;
}

.search-form {
  background: white;
  padding: 20px;
  border-radius: 10px;
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.search-input {
  flex: 1;
  min-width: 250px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 15px;
}

.search-input:focus {
  outline: none;
  border-color: #003a70;
}

.btn-search {
  padding: 15px 40px;
  background: #e91e63;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background 0.3s;
}

.btn-search:hover {
  background: #c2185b;
}

.filter-links {
  margin-top: 20px;
  display: flex;
  gap: 15px;
}

.filter-btn {
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
}

.filter-btn:hover {
  color: #e91e63;
}
</style>

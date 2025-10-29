<template>
  <div class="home-view">
    <!-- Hero Section with Modern Design -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="gradient-overlay"></div>
        <div class="animated-shapes">
          <div class="shape shape-1"></div>
          <div class="shape shape-2"></div>
          <div class="shape shape-3"></div>
        </div>
      </div>

      <div class="hero-content">
        <h1 class="hero-title">
          <span class="title-line">ค้นหางานที่ใช่</span>
          <span class="title-line highlight">สำหรับคุณ</span>
        </h1>
        <p class="hero-subtitle">มากกว่า 10,000+ ตำแหน่งงานจากบริษัทชั้นนำทั่วประเทศ</p>

        <div class="search-container">
          <div class="search-box">
            <div class="search-input-group">
              <Search class="search-icon" :size="20" />
              <input type="text" placeholder="ตำแหน่งงาน, บริษัท" class="search-input" />
            </div>
            <div class="search-divider"></div>
            <div class="search-input-group">
              <MapPin class="search-icon" :size="20" />
              <input type="text" placeholder="สถานที่" class="search-input" />
            </div>
            <button class="search-button">ค้นหางาน</button>
          </div>
        </div>

        <!-- Stats -->
        <div class="stats-container">
          <div class="stat-item">
            <div class="stat-number">10,000+</div>
            <div class="stat-label">ตำแหน่งงาน</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">5,000+</div>
            <div class="stat-label">บริษัท</div>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <div class="stat-number">50,000+</div>
            <div class="stat-label">ผู้สมัครงาน</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Jobs Section -->
    <section class="featured-jobs">
      <div class="section-header">
        <h2 class="section-title">งานแนะนำ</h2>
        <a href="#" class="view-all-link">
          ดูทั้งหมด
          <ArrowRight :size="18" class="inline-icon" />
        </a>
      </div>

      <div class="jobs-grid">
        <div class="job-card" v-for="job in featuredJobs" :key="job.id">
          <div class="job-card-header">
            <div class="company-logo">
              <component :is="job.logoIcon" :size="28" :stroke-width="2" />
            </div>
            <span class="job-type-badge">
              <Clock :size="14" class="badge-icon" />
              {{ job.type }}
            </span>
          </div>

          <h3 class="job-title">{{ job.title }}</h3>
          <p class="company-name">
            <Building2 :size="16" class="inline-icon" />
            {{ job.company }}
          </p>

          <div class="job-details">
            <div class="job-detail-item">
              <MapPin :size="18" />
              <span>{{ job.location }}</span>
            </div>
            <div class="job-detail-item">
              <DollarSign :size="18" />
              <span>{{ job.salary }}</span>
            </div>
          </div>

          <div class="job-tags">
            <span class="tag" v-for="tag in job.tags" :key="tag">
              <Code :size="14" class="tag-icon" />
              {{ tag }}
            </span>
          </div>

          <button class="apply-button">
            <FileText :size="18" class="button-icon" />
            ดูรายละเอียด
          </button>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="section-header">
        <h2 class="section-title">หมวดหมู่งาน</h2>
      </div>

      <div class="categories-grid">
        <div class="category-card" v-for="cat in categories" :key="cat.id">
          <div class="category-icon-wrapper">
            <component :is="cat.icon" :size="40" :stroke-width="1.5" />
          </div>
          <h3 class="category-name">{{ cat.name }}</h3>
          <p class="category-count">{{ cat.count }} ตำแหน่งงาน</p>
          <div class="category-hover-overlay">
            <span>ดูงาน</span>
            <ArrowRight :size="18" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {
  Search,
  MapPin,
  ArrowRight,
  Clock,
  Building2,
  DollarSign,
  Code,
  FileText,
  Monitor,
  Palette,
  TrendingUp,
  ShoppingBag,
  Users,
  FileCheck,
  Paintbrush,
  Settings,
} from 'lucide-vue-next'

export default {
  name: 'HomeView',
  components: {
    Search,
    MapPin,
    ArrowRight,
    Clock,
    Building2,
    DollarSign,
    Code,
    FileText,
    Monitor,
    Palette,
    TrendingUp,
    ShoppingBag,
    Users,
    FileCheck,
    Paintbrush,
    Settings,
  },
  data() {
    return {
      featuredJobs: [
        {
          id: 1,
          title: 'Full Stack Developer',
          company: 'Tech Startup Co.',
          location: 'กรุงเทพมหานคร',
          salary: '40,000 - 60,000 บาท',
          type: 'Full-time',
          logoIcon: 'Monitor',
          tags: ['Vue.js', 'Node.js', 'MongoDB'],
        },
        {
          id: 2,
          title: 'UI/UX Designer',
          company: 'Creative Agency Ltd.',
          location: 'เชียงใหม่',
          salary: '35,000 - 50,000 บาท',
          type: 'Full-time',
          logoIcon: 'Palette',
          tags: ['Figma', 'Adobe XD', 'Design System'],
        },
        {
          id: 3,
          title: 'Marketing Manager',
          company: 'E-commerce Giant',
          location: 'กรุงเทพมหานคร',
          salary: '50,000 - 80,000 บาท',
          type: 'Full-time',
          logoIcon: 'TrendingUp',
          tags: ['Digital Marketing', 'SEO', 'Analytics'],
        },
      ],
      categories: [
        { id: 1, name: 'ไอที/โปรแกรมเมอร์', icon: 'Monitor', count: 1250 },
        { id: 2, name: 'การตลาด', icon: 'TrendingUp', count: 890 },
        { id: 3, name: 'การเงิน/บัญชี', icon: 'DollarSign', count: 670 },
        { id: 4, name: 'ขาย', icon: 'ShoppingBag', count: 1100 },
        { id: 5, name: 'ทรัพยากรบุคคล', icon: 'Users', count: 450 },
        { id: 6, name: 'บริหารจัดการ', icon: 'FileCheck', count: 780 },
        { id: 7, name: 'ออกแบบ/สร้างสรรค์', icon: 'Paintbrush', count: 560 },
        { id: 8, name: 'วิศวกรรม', icon: 'Settings', count: 920 },
      ],
    }
  },
}
</script>

<style scoped>
.home-view {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #ffffff);
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 80px 20px;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #003d82 0%, #0052a3 50%, #0066cc 100%);
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.4) 100%);
}

.animated-shapes {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shape {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
  animation: float 20s infinite ease-in-out;
}

.shape-1 {
  width: 300px;
  height: 300px;
  background: white;
  top: -100px;
  right: 10%;
  animation-delay: 0s;
}

.shape-2 {
  width: 200px;
  height: 200px;
  background: white;
  bottom: -50px;
  left: 5%;
  animation-delay: 7s;
}

.shape-3 {
  width: 150px;
  height: 150px;
  background: white;
  top: 50%;
  left: 50%;
  animation-delay: 14s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) rotate(0deg);
  }
  33% {
    transform: translate(30px, -30px) rotate(120deg);
  }
  66% {
    transform: translate(-20px, 20px) rotate(240deg);
  }
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 900px;
  width: 100%;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 20px;
  line-height: 1.2;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title-line {
  display: block;
  animation: slideInUp 0.8s ease-out;
}

.highlight {
  background: linear-gradient(90deg, #fbbf24, #fcd34d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: slideInUp 0.8s ease-out 0.2s both;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 40px;
  animation: fadeIn 1s ease-out 0.4s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Search Container */
.search-container {
  animation: fadeIn 1s ease-out 0.6s both;
}

.search-box {
  background: white;
  border-radius: 16px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-width: 800px;
  margin: 0 auto 40px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.search-box:hover {
  transform: translateY(-2px);
  box-shadow: 0 25px 70px rgba(0, 0, 0, 0.35);
}

.search-input-group {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 12px;
}

.search-icon {
  color: #64748b;
}

.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 12px 0;
  color: #1e293b;
}

.search-input::placeholder {
  color: #94a3b8;
}

.search-divider {
  width: 1px;
  height: 40px;
  background: #e2e8f0;
}

.search-button {
  background: linear-gradient(135deg, #003d82 0%, #0052a3 100%);
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  white-space: nowrap;
}

.search-button:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 25px rgba(0, 61, 130, 0.4);
}

/* Stats */
.stats-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
  flex-wrap: wrap;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #fbbf24;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
}

/* Featured Jobs Section */
.featured-jobs {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.section-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: #1e293b;
}

.view-all-link {
  color: #0052a3;
  font-weight: 600;
  text-decoration: none;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
}

.view-all-link:hover {
  color: #003d82;
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.job-card {
  background: white;
  border-radius: 16px;
  padding: 28px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border: 1px solid #f1f5f9;
}

.job-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 82, 163, 0.2);
}

.job-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.company-logo {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #003d82 0%, #0052a3 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  box-shadow: 0 4px 12px rgba(0, 61, 130, 0.15);
}

.job-type-badge {
  background: #e6f0ff;
  color: #003d82;
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.badge-icon {
  flex-shrink: 0;
}

.job-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 10px;
  line-height: 1.4;
}

.company-name {
  color: #64748b;
  margin-bottom: 18px;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.inline-icon {
  flex-shrink: 0;
}

.job-details {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 18px;
}

.job-detail-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #334155;
  font-size: 0.95rem;
  font-weight: 500;
}

.job-detail-item svg {
  flex-shrink: 0;
  color: #64748b;
}

.job-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tag {
  background: #f1f5f9;
  color: #334155;
  padding: 7px 14px;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tag-icon {
  flex-shrink: 0;
  color: #64748b;
}

.apply-button {
  width: 100%;
  background: linear-gradient(135deg, #003d82 0%, #0052a3 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 61, 130, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.apply-button:hover {
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 61, 130, 0.3);
}

.button-icon {
  flex-shrink: 0;
}

/* Categories Section */
.categories-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.category-card {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
}

.category-card:hover .category-hover-overlay {
  opacity: 1;
}

.category-icon {
  font-size: 3rem;
  margin-bottom: 16px;
  animation: bounce 2s infinite;
}

.category-icon-wrapper {
  color: #003d82;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease;
}

.category-card:hover .category-icon-wrapper {
  transform: scale(1.1);
}

.category-name {
  font-size: 1.15rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 8px;
}

.category-count {
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 500;
}

.category-hover-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #003d82 0%, #0052a3 100%);
  color: white;
  padding: 12px;
  opacity: 0;
  transition: opacity 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .search-box {
    flex-direction: column;
  }

  .search-divider {
    width: 100%;
    height: 1px;
  }

  .search-button {
    width: 100%;
  }

  .stats-container {
    gap: 20px;
  }

  .stat-divider {
    display: none;
  }
}
</style>

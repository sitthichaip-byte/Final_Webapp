<template>
  <nav class="navbar">
    <div class="nav-container">
      <router-link to="/" class="nav-logo">
        <span class="logo-icon">💼</span>
        <span class="logo-text">PearJob</span>
      </router-link>

      <ul class="nav-menu" :class="{ active: isMenuOpen }">
        <li class="nav-item">
          <router-link to="/" class="nav-link" @click="closeMenu">หน้าแรก</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/jobs" class="nav-link" @click="closeMenu">ค้นหางาน</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" @click="closeMenu">เกี่ยวกับเรา</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/contact" class="nav-link" @click="closeMenu">ติดต่อเรา</router-link>
        </li>
        <li class="nav-item nav-item-btn">
          <router-link to="/post-job" class="nav-link btn-post-job" @click="closeMenu">
            ประกาศงาน
          </router-link>
        </li>
        <li class="nav-item nav-item-btn">
          <router-link to="/login" class="nav-link btn-login" @click="closeMenu">
            เข้าสู่ระบบ
          </router-link>
        </li>
      </ul>

      <div class="hamburger" @click="toggleMenu" :class="{ active: isMenuOpen }">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  padding: 0;
}

.nav-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  font-size: 28px;
  font-weight: 800;
  color: #003a70;
  transition: transform 0.3s ease;
}

.nav-logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 32px;
}

.logo-text {
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 8px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: block;
  padding: 10px 20px;
  text-decoration: none;
  color: #333;
  font-weight: 600;
  font-size: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.nav-link:hover {
  color: #0056a8;
  background: rgba(0, 86, 168, 0.08);
}

.nav-link.router-link-active {
  color: #0056a8;
  background: rgba(0, 86, 168, 0.12);
}

.btn-post-job {
  background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
  color: #003a70;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-post-job:hover {
  background: linear-gradient(135deg, #ffed4e 0%, #ffd700 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

.btn-login {
  background: linear-gradient(135deg, #003a70 0%, #0056a8 100%);
  color: white;
  font-weight: 700;
  padding: 10px 24px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.btn-login:hover {
  background: linear-gradient(135deg, #0056a8 0%, #003a70 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 58, 112, 0.4);
}

.hamburger {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 5px;
  padding: 8px;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.hamburger:hover {
  background: rgba(0, 86, 168, 0.08);
}

.bar {
  width: 28px;
  height: 3px;
  background: #003a70;
  border-radius: 3px;
  transition: all 0.3s ease;
}

.hamburger.active .bar:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active .bar:nth-child(2) {
  opacity: 0;
}

.hamburger.active .bar:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

@media (max-width: 968px) {
  .nav-container {
    padding: 0 20px;
    height: 70px;
  }

  .hamburger {
    display: flex;
  }

  .nav-menu {
    position: fixed;
    left: -100%;
    top: 70px;
    flex-direction: column;
    background: white;
    width: 100%;
    text-align: left;
    transition: left 0.3s ease;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    padding: 20px 0;
    gap: 0;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
  }

  .nav-menu.active {
    left: 0;
  }

  .nav-item {
    width: 100%;
  }

  .nav-link {
    padding: 16px 30px;
    border-radius: 0;
    width: 100%;
  }

  .nav-item-btn {
    margin: 8px 20px;
  }

  .btn-post-job,
  .btn-login {
    border-radius: 8px;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .nav-logo {
    font-size: 24px;
  }

  .logo-icon {
    font-size: 28px;
  }
}
</style>

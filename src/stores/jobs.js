import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useJobStore = defineStore('jobs', () => {
  const jobs = ref([
    {
      id: 1,
      title: 'Full Stack Developer',
      company: 'Tech Startup Co.',
      location: 'กรุงเทพมหานคร',
      salary: '40,000 - 60,000 บาท',
      type: 'Full-time',
      category: 'ไอที/โปรแกรมเมอร์',
      description: 'เรากำลังมองหา Full Stack Developer ที่มีความสามารถ...',
      requirements: [
        'ปริญญาตรี สาขาวิทยาการคอมพิวเตอร์',
        'มีประสบการณ์ 2-3 ปี',
        'มีความรู้ Vue.js, Node.js',
      ],
      benefits: ['ประกันสังคม', 'ประกันสุขภาพ', 'โบนัสประจำปี'],
      postedDate: '2025-10-20',
      company_logo: 'https://via.placeholder.com/80',
      email: 'hr@techstartup.com',
      phone: '02-123-4567',
      status: 'active',
    },
  ])

  const nextId = ref(2)

  const activeJobs = computed(() => {
    return jobs.value.filter((job) => job.status === 'active')
  })

  const getJobById = computed(() => {
    return (id) => jobs.value.find((job) => job.id === parseInt(id))
  })

  const addJob = (jobData) => {
    const newJob = {
      id: nextId.value++,
      ...jobData,
      postedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      company_logo: 'https://via.placeholder.com/80',
    }
    jobs.value.unshift(newJob)
    return newJob
  }

  const updateJob = (id, jobData) => {
    const index = jobs.value.findIndex((job) => job.id === id)
    if (index !== -1) {
      jobs.value[index] = { ...jobs.value[index], ...jobData }
      return true
    }
    return false
  }

  const deleteJob = (id) => {
    const index = jobs.value.findIndex((job) => job.id === id)
    if (index !== -1) {
      jobs.value.splice(index, 1)
      return true
    }
    return false
  }

  const searchJobs = (query) => {
    if (!query.position && !query.location && !query.company) {
      return activeJobs.value
    }

    return activeJobs.value.filter((job) => {
      const matchPosition =
        !query.position || job.title.toLowerCase().includes(query.position.toLowerCase())

      const matchLocation =
        !query.location || job.location.toLowerCase().includes(query.location.toLowerCase())

      const matchCompany =
        !query.company || job.company.toLowerCase().includes(query.company.toLowerCase())

      return matchPosition && matchLocation && matchCompany
    })
  }

  return {
    jobs,
    activeJobs,
    getJobById,
    addJob,
    updateJob,
    deleteJob,
    searchJobs,
  }
})

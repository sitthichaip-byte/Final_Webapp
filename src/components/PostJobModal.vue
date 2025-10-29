<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        @click.self="closeModal"
      >
        <div
          class="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modal"
        >
          <!-- Header -->
          <div
            class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10"
          >
            <h2 class="text-2xl font-bold text-gray-900">โพสต์ประกาศรับสมัครงาน</h2>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700 transition">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Form -->
          <div class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                ตำแหน่งงาน <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.title"
                type="text"
                placeholder="เช่น Senior Developer"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                บริษัท <span class="text-red-500">*</span>
              </label>
              <input
                v-model="formData.company"
                type="text"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2">
                  สถานที่ <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="formData.location"
                  type="text"
                  placeholder="เช่น กรุงเทพมหานคร"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-700 mb-2"> เงินเดือน </label>
                <input
                  v-model="formData.salary"
                  type="text"
                  placeholder="เช่น 30,000-50,000 บาท"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2">
                ประเภทงาน <span class="text-red-500">*</span>
              </label>
              <select
                v-model="formData.type"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"> รายละเอียดงาน </label>
              <textarea
                v-model="formData.description"
                rows="4"
                placeholder="อธิบายรายละเอียดงาน..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <div>
              <label class="block text-sm font-semibold text-gray-700 mb-2"> คุณสมบัติ </label>
              <textarea
                v-model="formData.requirements"
                rows="3"
                placeholder="คุณสมบัติที่ต้องการ..."
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            <!-- Action Buttons -->
            <div class="flex gap-3 pt-4">
              <button
                @click="closeModal"
                class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
              >
                ยกเลิก
              </button>
              <button
                @click="submitJob"
                class="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg font-semibold transition"
              >
                โพสต์งาน
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { reactive, watch } from 'vue'
import { useJobStore } from '@/stores/jobStore'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['close'])

const jobStore = useJobStore()

const formData = reactive({
  title: '',
  company: '',
  location: '',
  salary: '',
  type: 'Full-time',
  description: '',
  requirements: '',
})

const closeModal = () => {
  emit('close')
}

const submitJob = () => {
  if (!formData.title || !formData.company || !formData.location) {
    alert('กรุณากรอกข้อมูลที่จำเป็น (ตำแหน่งงาน, บริษัท, สถานที่)')
    return
  }

  jobStore.addJob({ ...formData })

  // Reset form
  Object.keys(formData).forEach((key) => {
    if (key === 'type') formData[key] = 'Full-time'
    else formData[key] = ''
  })

  alert('โพสต์งานสำเร็จ! 🎉')
  closeModal()
}

// Reset form when modal closes
watch(
  () => props.isOpen,
  (newVal) => {
    if (!newVal) {
      Object.keys(formData).forEach((key) => {
        if (key === 'type') formData[key] = 'Full-time'
        else formData[key] = ''
      })
    }
  },
)
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@keyframes modalSlide {
  from {
    opacity: 0;
    transform: translateY(-50px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-modal {
  animation: modalSlide 0.3s ease-out;
}
</style>

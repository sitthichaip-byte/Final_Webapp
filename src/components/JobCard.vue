<template>
  <div
    class="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200 overflow-hidden cursor-pointer"
    @click="viewJobDetail"
  >
    <!-- Featured Badge -->
    <div
      v-if="job.isFeatured"
      class="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-4 py-1 rounded-bl-xl flex items-center gap-1 text-sm font-semibold z-10"
    >
      <span>⭐</span>
      แนะนำ
    </div>

    <div class="p-6">
      <!-- Header -->
      <div class="flex items-start justify-between mb-4">
        <div class="flex gap-4 flex-1">
          <!-- Company Icon -->
          <div
            class="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md"
          >
            <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <!-- Job Info -->
          <div class="flex-1 min-w-0">
            <h3
              class="text-xl font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-1"
            >
              {{ job.title }}
            </h3>
            <p class="text-gray-600 font-medium mb-2">{{ job.company }}</p>
          </div>
        </div>

        <!-- Bookmark Button -->
        <button
          @click.stop="toggleBookmark"
          class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
        >
          <svg
            class="w-5 h-5 transition-colors"
            :class="isBookmarked ? 'text-blue-600 fill-blue-600' : 'text-gray-400'"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <!-- Job Details Grid -->
      <div class="grid grid-cols-2 gap-3 mb-4">
        <div class="flex items-center gap-2 text-gray-600">
          <svg
            class="w-4 h-4 text-blue-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <span class="text-sm truncate">{{ job.location }}</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600">
          <svg
            class="w-4 h-4 text-blue-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm">{{ job.type }}</span>
        </div>
        <div class="flex items-center gap-2 text-gray-600 col-span-2">
          <svg
            class="w-4 h-4 text-blue-500 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm font-semibold text-blue-600">{{ job.salary }}</span>
        </div>
      </div>

      <!-- Description -->
      <p class="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
        {{ job.description }}
      </p>

      <!-- Skills Tags -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="(skill, index) in job.skills.slice(0, 4)"
          :key="index"
          class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100"
        >
          {{ skill }}
        </span>
        <span
          v-if="job.skills.length > 4"
          class="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium"
        >
          +{{ job.skills.length - 4 }}
        </span>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-between pt-4 border-t border-gray-100">
        <span class="text-xs text-gray-500"> {{ job.postedDays }} วันที่แล้ว </span>

        <button
          @click.stop="viewJobDetail"
          class="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium text-sm shadow-md hover:shadow-lg"
        >
          ดูรายละเอียด
          <svg
            class="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>

    <!-- Hover Effect Border -->
    <div
      class="absolute inset-0 rounded-xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'JobCard',
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isBookmarked: false,
    }
  },
  methods: {
    viewJobDetail() {
      this.$router.push(`/jobs/${this.job.id}`)
    },
    toggleBookmark() {
      this.isBookmarked = !this.isBookmarked
      // TODO: Save to backend or localStorage
    },
  },
}
</script>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '../api'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const jobs = ref<any[]>([])
const search = ref('')
const page = ref(1)
const totalPages = ref(1)
const totalJobs = ref(0)
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const fetchJobs = async () => {
  loading.value = true
  try {
    const response = await api.get('/jobs', {
      params: { search: search.value, page: page.value, limit: 5 }
    })
    jobs.value = response.data.jobs
    totalPages.value = response.data.pagination.totalPages
    totalJobs.value = response.data.pagination.totalJobs
  } catch (err) {
    console.error(err)
    if (axios.isAxiosError(err) && err.response?.status === 403) {
      router.push('/login')
    }
  } finally {
    loading.value = false
  }
}

watch(search, () => {
  page.value = 1
  fetchJobs()
})

watch(page, fetchJobs)

onMounted(fetchJobs)

const goToJob = (id: number) => {
  router.push(`/jobs/${id}`)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Job Listings</h1>
        <button @click="authStore.clearToken(); router.push('/login')" class="text-sm text-gray-500 hover:text-gray-700">Logout</button>
      </div>

      <div class="mb-6 flex gap-4">
        <div class="relative flex-1">
          <input v-model="search" type="text" placeholder="Search by title or company..." class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          <button v-if="search" @click="search = ''" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600">
            <span class="sr-only">Clear search</span>
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div class="mb-4 text-sm text-gray-600">
        <span v-if="loading">Searching...</span>
        <span v-else>Found {{ totalJobs }} jobs</span>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p class="mt-2 text-gray-500">Loading jobs...</p>
      </div>

      <div v-else class="space-y-4">
        <div v-for="job in jobs" :key="job.id" @click="goToJob(job.id)" class="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
          <h2 class="text-xl font-semibold text-indigo-600">{{ job.title }}</h2>
          <p class="text-gray-600 font-medium">{{ job.company }}</p>
          <div class="flex gap-4 mt-2 text-sm text-gray-500">
            <span>{{ job.location }}</span>
            <span>{{ job.jobType }}</span>
            <span>{{ job.salary }}</span>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center gap-4">
        <button :disabled="page <= 1" @click="page--" class="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50">Previous</button>
        <span class="px-4 py-2 text-gray-700">Page {{ page }} of {{ totalPages }}</span>
        <button :disabled="page >= totalPages" @click="page++" class="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50">Next</button>
      </div>
    </div>
  </div>
</template>

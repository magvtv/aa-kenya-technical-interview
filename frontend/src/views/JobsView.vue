<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import api from '../api'
import axios from 'axios'
import { useRouter } from 'vue-router'
import DefaultLayout from './DefaultLayout.vue'
import type { Job, JobsResponse } from '../types'

const jobs = ref<Job[]>([])
const search = ref('')
const page = ref(1)
const limit = ref(10)
const totalPages = ref(1)
const totalJobs = ref(0)
const loading = ref(false)
const router = useRouter()

const fetchJobs = async () => {
  loading.value = true
  try {
    const response = await api.get<JobsResponse>('/jobs', {
      params: { search: search.value, page: page.value, limit: limit.value }
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

// Debounce search
let timeout: number | null = null
const debouncedFetch = () => {
  if (timeout) clearTimeout(timeout)
  timeout = setTimeout(() => {
    page.value = 1
    fetchJobs()
  }, 300)
}

watch(search, debouncedFetch)

watch(page, fetchJobs)

watch(limit, () => {
  page.value = 1
  fetchJobs()
})

onMounted(fetchJobs)

const goToJob = (id: number) => {
  router.push(`/jobs/${id}`)
}
</script>

<template>
  <DefaultLayout>
    <div class="max-w-4xl mx-auto">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-gray-900">Job Listings</h1>
      </div>

      <div class="mb-6 flex gap-4 flex-wrap">
        <div class="relative flex-1 min-w-[250px]">
          <i class="pi pi-search absolute left-3 top-3 text-gray-400"></i>
          <input v-model="search" type="text" placeholder="Search by title or company..." class="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200">
          <button v-if="search" @click="search = ''" class="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 transition-colors">
            <i class="pi pi-times"></i>
          </button>
        </div>
        <div class="flex items-center gap-2">
          <label for="limit-select" class="text-sm font-medium text-gray-700 whitespace-nowrap">Per Page:</label>
          <select id="limit-select" v-model.number="limit" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow duration-200">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>

      <div class="mb-4 text-sm text-gray-600 flex items-center gap-2">
        <i class="pi pi-info-circle"></i>
        <span v-if="loading">Searching...</span>
        <span v-else>Found {{ totalJobs }} jobs</span>
      </div>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p class="mt-2 text-gray-500">Loading jobs...</p>
      </div>

      <div v-else class="space-y-4">
        <div v-for="job in jobs" :key="job.id" @click="goToJob(job.id)" class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-100">
          <h2 class="text-xl font-semibold text-indigo-600">{{ job.title }}</h2>
          <p class="text-gray-600 font-medium">{{ job.company }}</p>
          <div class="flex gap-4 mt-2 text-sm text-gray-500">
            <span class="flex items-center gap-1">
               <i class="pi pi-map-marker"></i>
               {{ job.location }}
            </span>
            <span class="flex items-center gap-1">
              <i class="pi pi-briefcase"></i>
              {{ job.jobType }}
            </span>
            <span class="flex items-center gap-1">
              <i class="pi pi-dollar"></i>
              {{ job.salary }}
            </span>
          </div>
        </div>
      </div>

      <div class="mt-8 flex justify-center gap-4 items-center flex-wrap">
        <button :disabled="page <= 1" @click="page--" class="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <i class="pi pi-chevron-left"></i>
          Previous
        </button>
        <span class="px-4 py-2 text-gray-700">Page {{ page }} of {{ totalPages }}</span>
        <button :disabled="page >= totalPages" @click="page++" class="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50 transition-colors flex items-center gap-2">
          Next
          <i class="pi pi-chevron-right"></i>
        </button>
      </div>
    </div>
  </DefaultLayout>
</template>

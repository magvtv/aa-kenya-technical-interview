<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'
import DefaultLayout from './DefaultLayout.vue'
import type { Job } from '../types'

const route = useRoute()
const router = useRouter()
const job = ref<Job | null>(null)
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await api.get(`/jobs/${route.params.id}`)
    job.value = response.data
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <DefaultLayout>
    <div class="max-w-3xl mx-auto">
      <button @click="router.back()" class="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors">
        <i class="pi pi-arrow-left"></i>
        Back to Jobs
      </button>

      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
        <p class="mt-2 text-gray-500">Loading job details...</p>
      </div>

      <div v-else-if="job" class="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-100">
        <div class="px-6 py-8 sm:p-10">
          <div class="flex justify-between items-start">
            <div>
              <h1 class="text-3xl font-extrabold text-gray-900">{{ job.title }}</h1>
              <p class="mt-2 text-xl text-gray-600">{{ job.company }}</p>
            </div>
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
              {{ job.jobType }}
            </span>
          </div>

          <div class="mt-6 border-t border-gray-100 pt-6">
            <div class="flex flex-wrap gap-6 text-sm text-gray-500 mb-8">
              <div class="flex items-center gap-2">
                <i class="pi pi-map-marker"></i>
                {{ job.location }}
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-dollar"></i>
                {{ job.salary }}
              </div>
              <div class="flex items-center gap-2">
                <i class="pi pi-calendar"></i>
                Posted {{ job.postedDate }}
              </div>
            </div>

            <h3 class="text-lg font-medium text-gray-900 mb-3">Job Description</h3>
            <div class="prose max-w-none text-gray-600 mb-6">
              <p>{{ job.description }}</p>
            </div>

            <h3 class="text-lg font-medium text-gray-900 mb-3" v-if="job.requirements && job.requirements.length">Requirements</h3>
            <ul class="list-disc pl-5 text-gray-600 space-y-1" v-if="job.requirements && job.requirements.length">
              <li v-for="(req, index) in job.requirements" :key="index">{{ req }}</li>
            </ul>

            <div class="mt-8">
              <button class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center gap-2">
                <i class="pi pi-send"></i>
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 bg-white rounded-lg shadow border border-gray-100">
        <i class="pi pi-exclamation-triangle text-4xl text-gray-400 mb-4"></i>
        <h2 class="text-xl font-medium text-gray-900">Job not found</h2>
        <p class="mt-2 text-gray-500">The job you are looking for does not exist or has been removed.</p>
      </div>
    </div>
  </DefaultLayout>
</template>

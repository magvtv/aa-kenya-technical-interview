<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../api'

const route = useRoute()
const router = useRouter()
const job = ref<any>(null)
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
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <button @click="router.back()" class="mb-4 text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
        &larr; Back to Jobs
      </button>

      <div v-if="loading" class="text-center py-12">Loading...</div>

      <div v-else-if="job" class="bg-white shadow-xl rounded-lg overflow-hidden">
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
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                {{ job.location }}
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                {{ job.salary }}
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
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
              <button class="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition duration-300">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 bg-white rounded-lg shadow">
        <h2 class="text-xl font-medium text-gray-900">Job not found</h2>
        <p class="mt-2 text-gray-500">The job you are looking for does not exist or has been removed.</p>
      </div>
    </div>
  </div>
</template>

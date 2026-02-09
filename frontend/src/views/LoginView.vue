<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '../api'
import { useAuthStore } from '../stores/auth'

const email = ref('candidate@test.com')
const password = ref('interview2024')
const router = useRouter()
const authStore = useAuthStore()
const error = ref('')
const showPassword = ref(false)

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', {
      email: email.value,
      password: password.value
    })
    // Extract exact token from response (e.g. "Bearer interview-token-2024")
    authStore.setToken(response.data.token)
    router.push('/jobs')
  } catch (err) {
    error.value = 'Invalid login credentials'
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm -space-y-px">
          <div class="mb-4">
            <label for="email-address" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <input v-model="email" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-200" placeholder="e.g. candidate@test.com">
          </div>
          <div class="relative">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div class="relative">
              <input v-model="password" :type="showPassword ? 'text' : 'password'" id="password" name="password" autocomplete="current-password" required class="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-colors duration-200" placeholder="Enter your password">
              <button type="button" @click="showPassword = !showPassword" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                <span class="text-xs font-semibold uppercase">{{ showPassword ? 'Hide' : 'Show' }}</span>
              </button>
            </div>
          </div>
        </div>

        <div v-if="error" class="text-red-500 text-sm text-center bg-red-50 p-3 rounded-md border border-red-100">{{ error }}</div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200 shadow-sm">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

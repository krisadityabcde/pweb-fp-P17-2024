<script setup lang="ts">
import { ref } from 'vue'
import type { Feedback } from '../types'

const feedback = ref<Feedback>({
  name: '',
  is_anonymous: false,
  email: '',
  message: ''
})

const submitFeedback = () => {
  console.log('Feedback terkirim:', feedback.value)
  feedback.value = {
    name: '',
    is_anonymous: false,
    email: '',
    message: ''
  }
}
</script>

<template>
  <div id="feedback" class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-6">Berikan Masukan Anda</h2>
    <form @submit.prevent="submitFeedback" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Nama</label>
        <input v-model="feedback.name" type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
      </div>
      
      <div class="flex items-center">
        <label class="block text-sm font-medium text-gray-700 mr-2">Kirim sebagai anonim</label>
        <input v-model="feedback.is_anonymous" type="checkbox" class="rounded border-gray-300 text-green-600">
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Email</label>
        <input v-model="feedback.email" type="email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Pesan</label>
        <textarea v-model="feedback.message" rows="4" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" required></textarea>
      </div>

      <button type="submit" class="w-full py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">
        Kirim Masukan
      </button>
    </form>
  </div>
</template>
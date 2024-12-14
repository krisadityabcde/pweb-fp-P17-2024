<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoggedIn = ref(!!localStorage.getItem('token'))
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex space-x-7">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-green-600">BisaKita</h1>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <router-link to="/" class="py-4 px-2 hover:text-green-500">Beranda</router-link>
            <router-link to="/news" class="py-4 px-2 hover:text-green-500">Berita</router-link>
            <a href="/#feedback" class="py-4 px-2 hover:text-green-500">Feedback</a>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <router-link v-if="!isLoggedIn" to="/login" class="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600">Masuk</router-link>
          <button v-else @click="() => { localStorage.removeItem('token'); isLoggedIn = false }" class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">Keluar</button>
        </div>
      </div>
    </div>
  </nav>
</template>
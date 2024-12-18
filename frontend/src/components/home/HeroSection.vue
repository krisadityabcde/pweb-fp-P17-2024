<script setup lang="ts">
import Button from '../ui/Button.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="relative bg-green-500 text-white">
    <div class="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
    <div class="relative max-w-7xl mx-auto px-4 py-24">
      <div class="text-center">
        <h1 class="text-5xl font-bold mb-6">Selamat Datang di BisaKita</h1>
        <p class="text-xl mb-8 max-w-2xl mx-auto">Platform crowdfunding syariah untuk mendukung berbagai kegiatan amal dan sosial. Bersama, kita bisa membuat perubahan.</p>
        <div class="flex justify-center gap-4">
          <RouterLink to="/crowdfund">
            <Button variant="secondary" size="lg">Jelajahi Kampanye</Button>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
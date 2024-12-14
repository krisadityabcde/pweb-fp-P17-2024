<script setup lang="ts">
import dayjs from 'dayjs'
import Card from '../ui/Card.vue'

defineProps<{
  title: string
  description: string
  date: string
  image: string
  category: string
}>()
</script>

<template>
  <Card class="h-full">
    <div class="relative">
      <img :src="image" :alt="title" class="w-full h-48 object-cover">
      <div class="absolute top-4 left-4">
        <span class="px-3 py-1 text-sm font-medium bg-green-500 text-white rounded-full">
          {{ category }}
        </span>
      </div>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4">{{ description }}</p>
      <div class="flex justify-between items-center">
        <div class="text-sm text-gray-500">{{ dayjs(date).format('MMMM D, YYYY') }}</div>
        <button class="text-green-600 hover:text-green-700 font-medium">Read More →</button>
      </div>
    </div>
  </Card>
</template>
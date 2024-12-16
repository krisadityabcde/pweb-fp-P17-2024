<script setup lang="ts">
import HeroSection from '../components/home/HeroSection.vue'
import ImpactStats from '../components/home/ImpactStats.vue'
import FeedbackForm from '../components/FeedbackForm.vue'
</script>

<template>
  <div class="min-h-screen">
    <HeroSection />
    <ImpactStats />
    <div class="bg-gray-100 py-12">
      <FeedbackForm />
    </div>
  </div>
</template>
<template>
  <div class="card">
    <img :src="image" alt="Campaign Image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ title }}</h3>
      <p class="card-target">Target: {{ target }}</p>
      <p class="card-current-donation">Current Donation: {{ currentDonation }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  image: String,
  target: String,
  currentDonation: Number
});
</script>

<style scoped>
/* Add your styles here */
</style>
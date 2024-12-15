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
.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
}

.card-content {
  padding: 16px;
}

.card-title {
  font-size: 1.5em;
  margin: 0 0 10px;
  color: #333;
}

.card-target,
.card-current-donation {
  font-size: 1em;
  margin: 5px 0;
  color: #666;
}
</style>
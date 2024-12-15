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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  background-color: #fff;
}

.card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.card-image {
  width: 100%;
  height: auto;
  display: block;
  border-bottom: 1px solid #ddd;
}

.card-content {
  padding: 20px;
}

.card-title {
  font-size: 1.75em;
  margin: 0 0 15px;
  color: #333;
  font-weight: bold;
}

.card-target,
.card-current-donation {
  font-size: 1.1em;
  margin: 8px 0;
  color: #555;
}

.card-target {
  font-weight: 500;
}

.card-current-donation {
  font-weight: 700;
  color: #007BFF;
}
</style>
<template>
  <div class="card bg-white shadow-md rounded-lg p-4">
    <img :src="image" alt="Campaign Image" class="card-image w-full h-48 object-cover rounded-t-lg" />
    <div class="card-content p-4">
      <h2 class="card-title text-xl font-semibold">{{ title }}</h2>
      <p class="card-description text-gray-700">{{ description }}</p>
      <p class="card-target text-green-600 font-bold">Target: {{ formattedTarget }}</p>
      <router-link :to="'/crowdfund/' + id" class="text-blue-500 hover:underline">Lihat Detail</router-link>
      <button @click="toggleFavorite" class="mt-2 py-1 px-3 bg-transparent text-red-500 rounded-md">
        <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
        {{ isFavorited ? 'Unfavorite' : 'Favorite' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(fasHeart, farHeart);

const props = defineProps({
  id: String,
  title: String,
  description: String,
  target: String,
  image: String,
  isFavorited: Boolean
});

const emits = defineEmits(['favorite']);
const isFavorited = ref(props.isFavorited);

watch(() => props.isFavorited, (newVal) => {
  isFavorited.value = newVal;
});

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value;
  emits('favorite');
};

const formattedTarget = computed(() => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(props.target));
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

.card-detail-link {
  display: inline-block;
  margin-top: 15px;
  font-size: 1em;
  color: #007BFF;
  text-decoration: none;
  font-weight: 600;
}

.card-detail-link:hover {
  text-decoration: underline;
}

button {
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
}

button:focus {
  outline: none;
}

button .fa-heart {
  margin-right: 8px;
}
</style>
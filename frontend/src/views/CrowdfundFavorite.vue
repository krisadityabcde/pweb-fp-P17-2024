<template>
  <div class="crowdfund-favorite-page p-6">
    <h1 class="text-3xl font-bold mb-6">Favorited Crowdfunds</h1>
    <div v-if="openFavoritedCrowdfunds.length === 0" class="text-gray-600">
      You have no favorited crowdfund campaigns.
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="crowdfund in openFavoritedCrowdfunds" :key="crowdfund.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="crowdfund.image" alt="Crowdfund Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h2 class="text-xl font-semibold mb-2">{{ crowdfund.name }}</h2>
          <p class="text-gray-700 mb-4">{{ crowdfund.description }}</p>
          <div class="flex justify-between items-center">
            <router-link :to="`/crowdfund/${crowdfund.id}`" class="text-blue-500 hover:underline">View Details</router-link>
            <button @click="unfavorite(crowdfund.id)" class="text-red-500 hover:text-red-700">
              <font-awesome-icon :icon="fasHeart" />
              Unfavorite
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(fasHeart);
import type { Crowdfund } from '../types';

const crowdfunds = ref<Crowdfund[]>([]);
const currentUserId = '1';

const fetchFavoritedCrowdfunds = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/crowdfund`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    crowdfunds.value = data.filter((item: any) => 
      item.favorite_crowdfund?.some((fav: any) => fav.user_id === currentUserId)
    );
  } catch (error) {
    console.error('Error fetching favorited crowdfunds:', error);
  }
};

const openFavoritedCrowdfunds = computed(() => {
  return crowdfunds.value.filter((item: any) => item.status === 'OPEN');
});

const unfavorite = async (crowdfundId: string) => {
  try {
    const crowdfund = crowdfunds.value.find((cf: any) => cf.id === crowdfundId);
    if (crowdfund) {
      crowdfund.favorite_crowdfund = crowdfund.favorite_crowdfund.filter((fav: any) => fav.user_id !== currentUserId);
      await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crowdfund)
      });
      crowdfunds.value = crowdfunds.value.filter((cf: any) => cf.id !== crowdfundId);
    }
  } catch (error) {
    console.error('Error unfavoriting crowdfund:', error);
  }
};

onMounted(() => {
  fetchFavoritedCrowdfunds();
});
</script>

<style scoped>
.crowdfund-favorite-page {
  min-height: 100vh;
  background-color: #f9fafb;
}

h1 {
  color: #1f2937;
}
</style>

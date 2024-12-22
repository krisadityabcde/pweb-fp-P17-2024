<template>
    <div class="crowdfund-favorite-page p-6">
        <h1 class="text-3xl font-bold mb-6">Favorited Crowdfunds</h1>
        <div v-if="favoritedCrowdfunds.length === 0" class="text-gray-600">
            You have no favorited crowdfund campaigns.
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="crowdfund in favoritedCrowdfunds" :key="crowdfund.id" class="bg-white rounded-lg shadow-md overflow-hidden">
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
import type { Crowdfund } from '../types';


const crowdfunds = ref<Crowdfund[]>([]);
const currentUserId = '1';

const fetchCrowdfunds = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/crowdfund');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    crowdfunds.value = await response.json();
  } catch (error) {
    console.error('Error fetching crowdfunds:', error);
  }
};

const favoritedCrowdfunds = computed(() => {
  return crowdfunds.value.filter(crowdfund => 
    crowdfund.favorite_crowdfund && crowdfund.favorite_crowdfund.some(fav => fav.user_id === currentUserId)
  );
});

const unfavorite = async (crowdfundId: string | number) => {
  try {
    const crowdfund = crowdfunds.value.find(cf => cf.id === crowdfundId);
    if (crowdfund) {
      crowdfund.favorite_crowdfund = crowdfund.favorite_crowdfund.filter(fav => fav.user_id !== currentUserId);
      await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crowdfund)
      });
    }
  } catch (error) {
    console.error('Error unfavoriting crowdfund:', error);
  }
};

onMounted(() => {
  fetchCrowdfunds();
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

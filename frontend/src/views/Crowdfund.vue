<template>
  <div class="crowdfund-page">
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Daftar Crowdfund</h1>
      <router-link to="/crowdfund/favorite" class="text-red-500 hover:underline flex items-center">
        <span>Favorited Crowdfunds</span>
      </router-link>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="item in openCrowdfunds"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :description="item.description"
        :target="item.target"
        :image="item.image"
        :isFavorited="item.isFavorited"
        @favorite="item.id ? toggleFavorite(item.id) : null"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Card from '../components/ui/Card.vue';
import { CrowdfundStatus } from '../types';
import type { Crowdfund } from '../types';

const crowdfunds = ref<Partial<Crowdfund & { isFavorited: boolean }>[]>([]);
const currentUserId = '1';

const fetchCrowdfunds = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/crowdfund');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    crowdfunds.value = data.map((item: any) => ({
      ...item,
      created_at: new Date(item.created_at),
      isFavorited: item.favorite_crowdfund?.some((fav: any) => fav.user_id === currentUserId),
    }));
  } catch (error) {
    console.error('Error fetching crowdfunds:', error);
  }
};

const openCrowdfunds = computed(() => {
  return crowdfunds.value.filter((item: any) => item.status === CrowdfundStatus.OPEN);
});

const toggleFavorite = async (crowdfundId: string) => {
  try {
    const crowdfund = crowdfunds.value.find((cf: any) => cf.id === crowdfundId);
    if (crowdfund) {
      const updatedCrowdfund = { ...crowdfund };
      if (crowdfund.isFavorited) {
        updatedCrowdfund.favorite_crowdfund = (updatedCrowdfund.favorite_crowdfund || []).filter((fav: any) => fav.user_id !== currentUserId);
      } else {
        updatedCrowdfund.favorite_crowdfund = [...(updatedCrowdfund.favorite_crowdfund || []), { user_id: currentUserId, crowdfund_id: crowdfundId }];
      }
      const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCrowdfund),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      crowdfund.isFavorited = !crowdfund.isFavorited;
    }
  } catch (error) {
    console.error('Error toggling favorite status:', error);
  }
};

onMounted(() => {
  fetchCrowdfunds();
});
</script>

<style scoped>
.crowdfund-page {
  padding: 20px;
}
</style>
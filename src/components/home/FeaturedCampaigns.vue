<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Card from '../ui/Card.vue';
import type { Crowdfund } from '@/types';

const campaigns = ref<Partial<Crowdfund>[]>([]);

const fetchCampaigns = async () => {
  try {
    const q = query(collection(db, 'crowdfunds'), where('status', '==', 'OPEN'));
    const querySnapshot = await getDocs(q);
    campaigns.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Partial<Crowdfund>[];
  } catch (error) {
    console.error('Error fetching campaigns: ', error);
  }
};

onMounted(() => {
  fetchCampaigns();
});
</script>

<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Featured Campaigns</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card v-for="campaign in campaigns" :key="campaign.id" :title="campaign.name" :image="campaign.image" :target="campaign.target" :currentDonation="campaign.current_donation" />
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
.grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}
</style>
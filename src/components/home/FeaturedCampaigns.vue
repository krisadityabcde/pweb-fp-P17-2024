<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Carousel, Slide } from 'vue3-carousel';
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
    <Carousel>
      <Slide v-for="campaign in campaigns" :key="campaign.id">
        <Card :title="campaign.name" :image="campaign.image" :target="campaign.target" :currentDonation="campaign.current_donation" />
      </Slide>
    </Carousel>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
<template>
  <div class="crowdfund-page">
    <h1 class="text-2xl font-bold mb-4">Daftar Crowdfund</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card
        v-for="item in crowdfunds"
        :key="item.id"
        :id="item.id"
        :title="item.name"
        :description="item.description"
        :target="item.target"
        :image="item.image"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Card from '../components/ui/Card.vue';
import type { Crowdfund } from '@/types';

const crowdfunds = ref<Partial<Crowdfund>[]>([]);

const fetchCrowdfunds = async () => {
  try {
    const q = query(collection(db, 'crowdfunds'), where('status', '==', 'OPEN'));
    const querySnapshot = await getDocs(q);
    crowdfunds.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Partial<Crowdfund>[];
  } catch (error) {
    console.error('Error fetching crowdfunds: ', error);
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
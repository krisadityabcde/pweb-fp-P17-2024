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
        :isFavorited="item.favorite_crowdfund.some(fav => fav.user_id === currentUserId)"
        @favorite="handleFavorite(item.id)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { db } from '../firebase';
import { collection, getDocs, query, where, doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import Card from '../components/ui/Card.vue';
import type { Crowdfund } from '@/types';

const crowdfunds = ref<Partial<Crowdfund>[]>([]);
  const currentUserId = '1';

const fetchCrowdfunds = async () => {
  try {
    const q = query(collection(db, 'crowdfunds'), where('status', '==', 'OPEN'));
    const querySnapshot = await getDocs(q);
    crowdfunds.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Partial<Crowdfund>[];
  } catch (error) {
    console.error('Error fetching crowdfunds: ', error);
  }
};

const handleFavorite = async (crowdfundId: string) => {
  try {
    const crowdfundDoc = doc(db, 'crowdfunds', crowdfundId);
    const crowdfund = crowdfunds.value.find(c => c.id === crowdfundId);
    if (!crowdfund) return;

    const isFavorited = crowdfund.favorite_crowdfund.some(fav => fav.user_id === currentUserId);

    if (isFavorited) {
      await updateDoc(crowdfundDoc, {
        favorite_crowdfund: arrayRemove({ user_id: currentUserId, crowdfund_id: crowdfundId })
      });
      crowdfund.favorite_crowdfund = crowdfund.favorite_crowdfund.filter(fav => fav.user_id !== currentUserId);
    } else {
      await updateDoc(crowdfundDoc, {
        favorite_crowdfund: arrayUnion({ user_id: currentUserId, crowdfund_id: crowdfundId })
      });
      crowdfund.favorite_crowdfund.push({ user_id: currentUserId, crowdfund_id: crowdfundId });
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
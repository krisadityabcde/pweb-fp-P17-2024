<script>
import { db } from '../firebase';

export default {
  data() {
    return {
      crowdfunds: []
    };
  },
  async created() {
    try {
      const snapshot = await db.collection('crowdfunds').where('status', '==', 'OPEN').get();
      this.crowdfunds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (err) {
      console.error(err);
    }
  }
};
</script>

<template>
  <div class="crowdfund-page">
    <h1 class="text-2xl font-bold mb-4">Daftar Crowdfund</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="item in crowdfunds" :key="item.id" class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-xl font-semibold">{{ item.name }}</h2>
        <p class="text-gray-700">{{ item.description }}</p>
        <p class="text-green-600 font-bold">Target: {{ item.target }}</p>
        <router-link :to="'/crowdfund/' + item.id" class="text-blue-500 hover:underline">Lihat Detail</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.crowdfund-page {
  padding: 20px;
}
</style>
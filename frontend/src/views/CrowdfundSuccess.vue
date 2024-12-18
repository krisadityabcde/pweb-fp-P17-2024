<template>
  <div class="success-page p-6">
    <h1 class="text-3xl font-bold mb-6">Thank You for Your Donation!</h1>
    <p class="text-lg mb-4">We appreciate your generous donation of <strong>{{ formattedAmount }}</strong>.</p>
    <p class="text-lg mb-4">Your support helps us continue our mission.</p>
    <button @click="goBack" class="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none shadow-md mb-4">
      Back to Crowdfund Page
    </button>
    <button @click="printPage" class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none shadow-md">
      Print this Page
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const amount = ref<number>(0);

const formattedAmount = computed(() => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(amount.value);
});

const printPage = () => {
  window.print();
};

const goBack = () => {
  window.history.back();
};

onMounted(() => {
  amount.value = Number(route.query.amount) || 0;
});
</script>

<style scoped>
.success-page {
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  color: #1f2937;
}
</style>
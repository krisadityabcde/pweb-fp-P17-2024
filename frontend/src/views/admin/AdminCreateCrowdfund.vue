<template>
  <div class="create-crowdfund-page">
    <h1 class="text-3xl font-bold mb-4">Create New Crowdfund</h1>
    <form @submit.prevent="createCrowdfund">
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
        <input v-model="name" id="name" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>

      <div class="mb-4">
        <label for="target" class="block text-sm font-medium text-gray-700">Target Amount</label>
        <input v-model="target" id="target" type="number" min="1" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>

      <div class="mb-4">
        <label for="image" class="block text-sm font-medium text-gray-700">Image URL</label>
        <input v-model="image" id="image" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
      </div>

      <!-- Tidak ada opsi untuk status dan current_donation -->

      <button type="submit" class="py-2 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-transform duration-300 focus:outline-none shadow-md">
        Create Crowdfund
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const name = ref('');
const target = ref(0);
const image = ref('');

const router = useRouter();

const createCrowdfund = async () => {
  const crowdfundData = {
    name: name.value,
    target: target.value.toString(), // Target diubah ke string
    current_donation: 0, // Nilai donasi sekarang diatur menjadi 0
    favorite_crowdfund: [], // Array favorit kosong
    image: image.value,
    status: 'OPEN', // Status selalu OPEN
    isFavorited: false, // Status favorit
    comments: [], // Array komentar kosong
    user_id: "1", // ID pengguna
    crowdfund_id: new Date().getTime().toString(), // ID unik crowdfund
  };

  try {
    const response = await fetch('http://localhost:5000/api/crowdfund', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(crowdfundData),
    });

    if (!response.ok) {
      throw new Error('Failed to create crowdfund');
    }

    const newCrowdfund = await response.json();
    alert('Crowdfund created successfully!');
    router.push({ name: 'crowdfund-detail', params: { id: newCrowdfund.id } });
  } catch (error) {
    console.error('Error creating crowdfund:', error);
    alert('There was an error creating the crowdfund.');
  }
};
</script>

<style scoped>
.create-crowdfund-page {
  padding: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

form .mb-4 {
  margin-bottom: 16px;
}

form label {
  margin-bottom: 8px;
}

form input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

form button {
  align-self: flex-start;
}
</style>

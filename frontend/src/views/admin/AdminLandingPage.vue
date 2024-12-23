<template>
  <div class="admin-landing-page bg-gray-50 min-h-screen p-8">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-6">Daftar Crowdfund</h1>

      <!-- Create Crowdfund Button -->
      <div class="flex justify-end mb-4">
        <router-link 
          to="/admin/create" 
          class="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600">
          Create New Crowdfund
        </router-link>
      </div>

      <div class="bg-white shadow rounded-lg overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full table-auto border-collapse">
            <thead>
              <tr class="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                <th class="px-6 py-3 text-left">Nama Crowdfund</th>
                <th class="px-6 py-3 text-left">Target</th>
                <th class="px-6 py-3 text-left">Donasi Saat Ini</th>
                <th class="px-6 py-3 text-left">Status</th>
                <th class="px-6 py-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr 
                v-for="crowdfund in crowdfunds" 
                :key="crowdfund.id" 
                class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-gray-900 font-medium">{{ crowdfund.name }}</td>
                <td class="px-6 py-4 text-gray-500">{{ formatCurrency(crowdfund.target) }}</td>
                <td class="px-6 py-4 text-gray-500">{{ formatCurrency(crowdfund.current_donation) }}</td>
                <td class="px-6 py-4">
                  <span 
                    :class="{
                      'text-green-600 font-semibold': crowdfund.status === 'open',
                      'text-red-600 font-semibold': crowdfund.status === 'closed'
                    }">
                    {{ capitalize(crowdfund.status) }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <router-link 
                    :to="`/admin/${crowdfund.id}`" 
                    class="text-blue-500 hover:text-blue-700 font-medium">
                    Lihat Detail
                  </router-link>
                  <router-link 
                    v-if="crowdfund.status === 'open'" 
                    :to="`/admin/${crowdfund.id}/edit`" 
                    class="ml-4 text-green-500 hover:text-green-700 font-medium">
                    Edit
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const crowdfunds = ref<any[]>([]);

const fetchCrowdfunds = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/crowdfund');
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    crowdfunds.value = data.map((item: any) => ({
      ...item,
      current_donation: item.current_donation || 0,
      status: item.status || 'closed',  // Ensure default value is set here
    }));
  } catch (error) {
    console.error('Error fetching crowdfunds:', error);
  }
};

onMounted(() => {
  fetchCrowdfunds();
});

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value);
};

const capitalize = (value: string) => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};
</script>

<style scoped>
.admin-landing-page {
  background-color: #f9fafb;
}

th {
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
}

tr {
  transition: background-color 0.2s ease-in-out;
}
</style>

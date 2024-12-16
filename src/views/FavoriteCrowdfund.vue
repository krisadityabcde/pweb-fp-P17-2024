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
import { ref, onMounted } from 'vue';
import { collection, getDocs, updateDoc, arrayRemove, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

interface Crowdfund {
    id: string;
    name: string;
    description: string;
    image: string;
    favorite_crowdfund?: { user_id: string; crowdfund_id: string }[];
}

const favoritedCrowdfunds = ref<Crowdfund[]>([]);
const currentUserId = '1'; // Replace with actual user ID logic

const fetchFavoritedCrowdfunds = async () => {
    try {
        const crowdfundsRef = collection(db, 'crowdfunds');
        const querySnapshot = await getDocs(crowdfundsRef);
        const allCrowdfunds: Crowdfund[] = [];
        querySnapshot.forEach(doc => {
            allCrowdfunds.push({ id: doc.id, ...(doc.data() as Omit<Crowdfund, 'id'>) });
        });
        favoritedCrowdfunds.value = allCrowdfunds.filter(cf => cf.favorite_crowdfund?.some(fav => fav.user_id === currentUserId));
    } catch (error) {
        console.error('Error fetching favorited crowdfunds:', error);
    }
};

const unfavorite = async (crowdfundId: string) => {
    try {
        const crowdfundDoc = doc(db, 'crowdfunds', crowdfundId);
        await updateDoc(crowdfundDoc, {
            favorite_crowdfund: arrayRemove({ user_id: currentUserId, crowdfund_id: crowdfundId })
        });
        favoritedCrowdfunds.value = favoritedCrowdfunds.value.filter(cf => cf.id !== crowdfundId);
    } catch (error) {
        console.error('Error unfavoriting crowdfund:', error);
    }
};

onMounted(() => {
    fetchFavoritedCrowdfunds();
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

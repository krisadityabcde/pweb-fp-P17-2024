<template>
    <div class="crowdfund-detail-page">
        <h1 class="text-2xl font-bold mb-4">{{ crowdfund.name }}</h1>
        <img :src="crowdfund.image" alt="Campaign Image" class="w-full h-full object-cover rounded-lg mb-4" />
        <div class="article-content">
            <p class="text-gray-700 mb-4">{{ crowdfund.description }}</p>
            <p class="text-green-600 font-bold mb-4">Target: {{ crowdfund.target }}</p>
            <p class="text-blue-600 font-bold mb-4">Current Donation: {{ crowdfund.current_donation }}</p>
            <button @click="toggleFavorite" class="mt-2 py-1 px-3 bg-transparent text-red-500 rounded-md">
                <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
                {{ isFavorited ? 'Unfavorite' : 'Favorite' }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { Crowdfund } from '../types';

library.add(fasHeart, farHeart);

const route = useRoute();
const crowdfundId = route.params.id as string;
const crowdfund = ref<Partial<Crowdfund>>({});
const currentUserId = '1'; // Replace with actual user ID
const isFavorited = ref(false);

const fetchCrowdfund = async () => {
    try {
        const docRef = doc(db, 'crowdfunds', crowdfundId as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            crowdfund.value = docSnap.data() as Crowdfund;
            isFavorited.value = (crowdfund.value.favorite_crowdfund ?? []).some(fav => fav.user_id === currentUserId);
        } else {
            console.error('No such document!');
        }
    } catch (error) {
        console.error('Error fetching crowdfund:', error);
    }
};

const toggleFavorite = async () => {
    try {
        const crowdfundDoc = doc(db, 'crowdfunds', crowdfundId as string);
        if (isFavorited.value) {
            await updateDoc(crowdfundDoc, {
                favorite_crowdfund: arrayRemove({ user_id: currentUserId, crowdfund_id: crowdfundId })
            });
            crowdfund.value.favorite_crowdfund = (crowdfund.value.favorite_crowdfund ?? []).filter(fav => fav.user_id !== currentUserId);
        } else {
            await updateDoc(crowdfundDoc, {
                favorite_crowdfund: arrayUnion({ user_id: currentUserId, crowdfund_id: crowdfundId })
            });
            if (!crowdfund.value.favorite_crowdfund) {
                crowdfund.value.favorite_crowdfund = [];
            }
            crowdfund.value.favorite_crowdfund.push({ user_id: currentUserId, crowdfund_id: crowdfundId });
        }
        isFavorited.value = !isFavorited.value;
    } catch (error) {
        console.error('Error toggling favorite status:', error);
    }
};

onMounted(() => {
    fetchCrowdfund();
});
</script>

<style scoped>
.crowdfund-detail-page {
    padding: 20px;
}

.article-content {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

button {
    border: none;
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

button:focus {
    outline: none;
}

button .fa-heart {
    margin-right: 8px;
}
</style>
<template>
    <div class="crowdfund-detail-page">
        <h1 class="text-2xl font-bold mb-4">{{ crowdfund.name }}</h1>
        <img :src="crowdfund.image" alt="Campaign Image" class="w-full h-full object-cover rounded-lg mb-4" />
        <div class="article-content">
            <p class="text-gray-700 mb-4">{{ crowdfund.description }}</p>
            <p class="text-green-600 font-bold mb-4">Target: {{ formattedTarget }}</p>
            <p class="text-blue-600 font-bold mb-4">Current Donation: {{ formattedCurrentDonation }}</p>
            <div class="progress-bar-container mb-4">
                <div class="progress-bar" :style="{ width: progressBarWidth + '%' }"></div>
            </div>
            <button @click="toggleFavorite" class="mt-2 py-1 px-3 bg-transparent text-red-500 rounded-md hover:text-red-700 focus:outline-none">
                <font-awesome-icon :icon="[isFavorited ? 'fas' : 'far', 'heart']" />
                {{ isFavorited ? 'Unfavorite' : 'Favorite' }}
            </button>
            <div class="donation-form mt-6">
                <h2 class="text-xl font-bold mb-4">Donate to this Campaign</h2>
                <form @submit.prevent="submitDonation">
                    <div class="mb-4">
                        <label for="paymentMethod" class="block text-sm font-medium text-gray-700">Payment Method</label>
                        <select v-model="paymentMethod" id="paymentMethod" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
                            <option value="QRIS">QRIS</option>
                            <option value="Transfer">Transfer</option>
                        </select>
                    </div>
                    <div v-if="paymentMethod === 'Transfer'" class="mb-4">
                        <label for="bankName" class="block text-sm font-medium text-gray-700">Bank Name</label>
                        <input v-model="bankName" id="bankName" type="text" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required />
                    </div>
                    <div class="mb-4">
                        <label for="donationAmount" class="block text-sm font-medium text-gray-700">Donation Amount</label>
                        <input v-model="donationAmount" id="donationAmount" type="number" min="1" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                    <button type="submit" class="py-2 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white rounded-md hover:from-green-600 hover:to-green-800 transform hover:scale-105 transition-transform duration-300 focus:outline-none shadow-md">Submit Donation</button>
                </form>
            </div>
            <div class="comment-form mt-6">
                <h2 class="text-xl font-bold mb-4">Leave a Comment</h2>
                <form @submit.prevent="submitComment">
                    <div class="mb-4">
                        <label for="commentMessage" class="block text-sm font-medium text-gray-700">Message</label>
                        <textarea v-model="commentMessage" id="commentMessage" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md"></textarea>
                    </div>
                    <button type="submit" class="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none shadow-md">Submit Comment</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../firebase';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { Crowdfund } from '../types';

library.add(fasHeart, farHeart);

const route = useRoute();
const router = useRouter();
const crowdfundId = route.params.id as string;
const crowdfund = ref<Partial<Crowdfund>>({});
const currentUserId = '1'; // Replace with actual user ID if available
const isFavorited = ref(false);
const paymentMethod = ref('QRIS');
const bankName = ref('');
const donationAmount = ref(0);
const commentMessage = ref('');

// Initialize currentUserName from localStorage
const currentUserName = ref('');

onMounted(() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    currentUserName.value = window.localStorage.getItem('userName') || '';
  }
});

const fetchCrowdfund = async () => {
  try {
    const docRef = doc(db, 'crowdfunds', crowdfundId);
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
    const crowdfundDoc = doc(db, 'crowdfunds', crowdfundId);
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

const submitDonation = async () => {
  try {
    const crowdfundDoc = doc(db, 'crowdfunds', crowdfundId);
    await updateDoc(crowdfundDoc, {
      current_donation: (crowdfund.value.current_donation ?? 0) + donationAmount.value
    });
    router.push({ name: 'crowdfund-success', params: { id: crowdfundId }, query: { amount: donationAmount.value } });
  } catch (error) {
    console.error('Error submitting donation:', error);
  }
};

const submitComment = async () => {
  try {
    const crowdfundDoc = doc(db, 'crowdfunds', crowdfundId);
    await updateDoc(crowdfundDoc, {
      comments: arrayUnion({ user_name: currentUserName.value, message: commentMessage.value, timestamp: new Date() })
    });
    alert('Comment submitted successfully!');
    commentMessage.value = '';
  } catch (error) {
    console.error('Error submitting comment:', error);
  }
};

const progressBarWidth = computed(() => {
  if (!crowdfund.value.target || !crowdfund.value.current_donation) return 0;
  return Math.min((Number(crowdfund.value.current_donation) / Number(crowdfund.value.target)) * 100, 100);
});

const formattedTarget = computed(() => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(crowdfund.value.target));
});

const formattedCurrentDonation = computed(() => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(crowdfund.value.current_donation));
});

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

.donation-form {
    margin-top: 20px;
}

.donation-form h2 {
    margin-bottom: 10px;
}

.donation-form form {
    display: flex;
    flex-direction: column;
}

.donation-form form .mb-4 {
    margin-bottom: 16px;
}

.donation-form form label {
    margin-bottom: 8px;
}

.donation-form form input,
.donation-form form select,
.donation-form form textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.donation-form form button {
    align-self: flex-start;
}

.progress-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    height: 20px;
    margin-bottom: 16px;
}

.progress-bar {
    height: 100%;
    background-color: #4caf50;
    transition: width 0.3s ease;
}

.comment-form {
    margin-top: 20px;
}

.comment-form h2 {
    margin-bottom: 10px;
}

.comment-form form {
    display: flex;
    flex-direction: column;
}

.comment-form form .mb-4 {
    margin-bottom: 16px;
}

.comment-form form label {
    margin-bottom: 8px;
}

.comment-form form textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.comment-form form button {
    align-self: flex-start;
}
</style>
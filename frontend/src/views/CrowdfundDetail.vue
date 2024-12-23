<template>
  <div class="crowdfund-detail-page">
      <h1 class="text-3xl font-bold mb-4">{{ crowdfund.name }}</h1>
      <div class="article-content">
        <div class="flex justify-center mb-4">
            <img :src="crowdfund.image" alt="Campaign Image" class="rounded-lg" />
        </div>
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
              <h2 class="text-xl font-bold mb-4">Add a Comment</h2>
              <form @submit.prevent="submitComment">
                  <div class="mb-4">
                      <label for="commentMessage" class="block text-sm font-medium text-gray-700">Comment</label>
                      <textarea v-model="commentMessage" id="commentMessage" rows="4" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" required></textarea>
                  </div>
                  <button type="submit" class="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none shadow-md">
                      Submit Comment
                  </button>
              </form>
          </div>
          <div class="comments-section mt-6">
              <h2 class="text-xl font-bold mb-4">Comments</h2>
              <div v-if="comments.length === 0" class="text-gray-600">
                  No comments yet.
              </div>
              <div v-else>
                  <div v-for="comment in comments" :key="comment.timestamp.toString()" class="mb-4 p-4 border border-gray-300 rounded-md">
                      <p class="text-sm text-gray-700"><strong>{{ comment.user_name }}</strong> commented on {{ formatTimestamp(comment.timestamp) }}</p>
                      <p class="text-gray-800">{{ comment.message }}</p>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart as fasHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import type { Comment, Crowdfund } from '../types';

library.add(fasHeart, farHeart);

const route = useRoute();
const router = useRouter();
const crowdfundId = route.params.id as string;
const crowdfund = ref<Partial<Crowdfund>>({});
const currentUserId = '1';
const isFavorited = ref(false);
const paymentMethod = ref('QRIS');
const bankName = ref('');
const donationAmount = ref(0);
const commentMessage = ref('');

const comments = ref<Comment[]>([]);

const currentUserName = ref('');

onMounted(() => {
if (typeof window !== 'undefined' && window.localStorage) {
  currentUserName.value = window.localStorage.getItem('userName') || '';
}
});

const fetchCrowdfund = async () => {
try {
  const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  crowdfund.value = data;
  isFavorited.value = data.favorite_crowdfund?.some((fav: any) => fav.user_id === currentUserId);
  comments.value = data.comments || [];
} catch (error) {
  console.error('Error fetching crowdfund:', error);
}
};

const toggleFavorite = async () => {
try {
  const updatedCrowdfund = { ...crowdfund.value };
  if (isFavorited.value) {
    if (updatedCrowdfund.favorite_crowdfund) {
      updatedCrowdfund.favorite_crowdfund = updatedCrowdfund.favorite_crowdfund.filter((fav: any) => fav.user_id !== currentUserId);
    }
  } else {
    updatedCrowdfund.favorite_crowdfund = [...(updatedCrowdfund.favorite_crowdfund || []), { user_id: currentUserId, crowdfund_id: crowdfundId }];
  }
  const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCrowdfund),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  isFavorited.value = !isFavorited.value;
} catch (error) {
  console.error('Error toggling favorite status:', error);
}
};

const submitDonation = async () => {
try {
  const updatedCrowdfund = { ...crowdfund.value, current_donation: (crowdfund.value.current_donation ?? 0) + donationAmount.value };
  const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedCrowdfund),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  alert('Donation submitted successfully!');
  router.push({ name: 'crowdfund-success', params: { id: crowdfundId }, query: { amount: donationAmount.value } });
} catch (error) {
  console.error('Error submitting donation:', error);
}
};

const submitComment = async () => {
  try {
    const updatedCrowdfund = { ...crowdfund.value };
    const newComment = {
      id: new Date().getTime().toString(),  // Generate a unique ID based on timestamp
      user_name: currentUserName.value,
      message: commentMessage.value,
      timestamp: new Date(),
    };

    // Tambahkan komentar baru ke array comments
    updatedCrowdfund.comments = [...(updatedCrowdfund.comments || []), newComment];
    
    // Kirim ke server
    const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedCrowdfund),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    // Update komentar di frontend
    comments.value.push(newComment);
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

const formatTimestamp = (timestamp: Date) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
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
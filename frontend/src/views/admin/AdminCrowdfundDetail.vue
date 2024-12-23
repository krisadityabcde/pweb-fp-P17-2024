<template>
  <div class="admin-crowdfund-detail-page bg-gray-50 min-h-screen p-8">
    <div class="max-w-4xl mx-auto">
      <h1 class="text-4xl font-extrabold text-gray-800 mb-6">{{ crowdfund.name }} - Detail</h1>

      <div class="bg-white shadow rounded-lg p-6">
        <img 
          :src="crowdfund.image" 
          alt="Campaign Image" 
          class="w-full h-auto object-contain rounded-lg mb-6" 
        />

        <div class="article-content">
          <p class="text-gray-700 leading-relaxed mb-6">{{ crowdfund.description }}</p>

          <div class="flex justify-between items-center mb-6">
            <p class="text-green-600 font-semibold">Target: {{ formattedTarget }}</p>
            <p class="text-blue-600 font-semibold">Current Donation: {{ formattedCurrentDonation }}</p>
          </div>

          <div class="progress-bar-container relative mb-6">
            <div class="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div 
                class="progress-bar h-full bg-green-500" 
                :style="{ width: progressBarWidth + '%' }">
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-2 text-right">{{ progressBarWidth.toFixed(0) }}%</p>
          </div>

          <!-- Comments Section -->
          <div class="comments-section mt-8">
            <h2 class="text-2xl font-bold mb-4 text-gray-800">Comments</h2>
            <div v-if="comments.length === 0" class="text-gray-600">
              No comments yet.
            </div>
            <div v-else class="space-y-4">
              <div 
                v-for="comment in comments" 
                :key="comment.id" 
                class="comment-item p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p class="text-sm text-gray-700 mb-2">
                  <strong>{{ comment.user_name }}</strong> commented on {{ formatTimestamp(comment.timestamp) }}
                </p>
                <p class="text-gray-800">{{ comment.message }}</p>
                <button 
                  @click="deleteComment(comment.id)" 
                  class="text-red-500 mt-2 hover:text-red-700 hover:underline">
                  Delete Comment
                </button>
              </div>
            </div>
          </div>

          <!-- Back Button -->
          <div class="flex justify-start mt-6">
            <router-link 
              to="/admin" 
              class="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600">
              Back to Admin Page
            </router-link>
          </div>

          <!-- Edit and Delete Buttons -->
          <div class="actions flex justify-end mt-8">
            <router-link 
              :to="`/admin/${crowdfund.id}/edit`" 
              class="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 mr-4">
              Edit Crowdfund
            </router-link>
            <button 
              @click="deleteCrowdfund" 
              class="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600">
              Delete Crowdfund
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import type { Comment, Crowdfund } from '../types';

const route = useRoute();
const router = useRouter();
const crowdfundId = route.params.id as string;
const crowdfund = ref<Partial<Crowdfund>>({});
const comments = ref<Comment[]>([]);

const fetchCrowdfund = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    crowdfund.value = data;
    comments.value = data.comments || [];
  } catch (error) {
    console.error('Error fetching crowdfund:', error);
  }
};

const deleteComment = async (commentId: number) => {
  try {
    const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfundId}/comments/${commentId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      comments.value = comments.value.filter(comment => comment.id !== commentId);
    } else {
      alert('Failed to delete comment');
    }
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
};

const deleteCrowdfund = async () => {
  if (confirm('Are you sure you want to delete this crowdfund?')) {
    try {
      const response = await fetch(`http://localhost:5000/api/crowdfund/${crowdfund.value.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        alert('Crowdfund deleted successfully');
        router.push('/admin');
      } else {
        alert('Failed to delete crowdfund');
      }
    } catch (error) {
      console.error('Error deleting crowdfund:', error);
    }
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
.admin-crowdfund-detail-page {
  background-color: #f9fafb;
}

.article-content {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.progress-bar-container {
  width: 100%;
}

.progress-bar {
  height: 100%;
  transition: width 0.3s ease;
}

.comment-item {
  display: flex;
  flex-direction: column;
}

.actions button, .actions a {
  transition: background-color 0.3s ease;
}
</style>

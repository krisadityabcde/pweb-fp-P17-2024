<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

// Initialize router
const router = useRouter();

// Reactive state for authentication
const isLoggedIn = ref(false);
const userName = ref('');

// Initialize state on component mount
if (typeof window !== 'undefined' && window.localStorage) {
  isLoggedIn.value = !!window.localStorage.getItem('token');
  userName.value = window.localStorage.getItem('userName') || '';
} else {
  console.warn('localStorage is not available.');
}

// Logout function with debugging
const logout = () => {
  try {
    console.log('Attempting to log out...');
    if (typeof window !== 'undefined' && window.localStorage) {
      console.log('Removing token and userName from localStorage.');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('userName');
    } else {
      console.error('localStorage is undefined.');
      throw new Error('localStorage is unavailable.');
    }
    // Update reactive state
    isLoggedIn.value = false;
    userName.value = '';
    // Redirect to login page
    router.push('/login');
    console.log('Logout successful.');
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

// Watch for changes in localStorage (e.g., login from another tab)
watchEffect(() => {
  if (typeof window !== 'undefined' && window.localStorage) {
    isLoggedIn.value = !!window.localStorage.getItem('token');
    userName.value = window.localStorage.getItem('userName') || '';
  } else {
    isLoggedIn.value = false;
    userName.value = '';
  }
});
</script>

<template>
  <nav class="bg-gradient-to-r from-emerald-800 to-green-700 shadow-lg">
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <!-- Left Side: Logo and Navigation Links -->
        <div class="flex space-x-7">
          <div class="flex items-center">
            <h1 class="text-xl font-bold text-white">BisaKita</h1>
          </div>
          <div class="hidden md:flex items-center space-x-4">
            <router-link to="/" class="py-4 px-2 text-white hover:text-green-300">Beranda</router-link>
            <router-link to="/news" class="py-4 px-2 text-white hover:text-green-300">Berita</router-link>
            <a href="/#feedback" class="py-4 px-2 text-white hover:text-green-300">Feedback</a>
          </div>
        </div>
        <!-- Right Side: User Authentication -->
        <div class="flex items-center space-x-4">
          <template v-if="isLoggedIn">
            <span class="text-white">Hello, {{ userName }}</span>
            <button 
              @click="logout" 
              class="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
            >
              Keluar
            </button>
          </template>
          <template v-else>
            <router-link 
              to="/login" 
              class="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Masuk
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Additional styles if needed */
</style>
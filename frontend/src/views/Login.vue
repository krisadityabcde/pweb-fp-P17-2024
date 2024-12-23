<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');

const generateToken = () => {
  return Math.random().toString(36).substr(2);
};

const handleLogin = () => {
  if (!email.value || !password.value) {
    error.value = 'Please fill in all fields';
    return;
  }

  const isAdmin = email.value.toLowerCase().includes('admin');
  const token = generateToken();
  const userName = email.value.split('@')[0];

  localStorage.setItem('token', token);
  localStorage.setItem('userName', userName);
  localStorage.setItem('isAdmin', isAdmin.toString());

  if (isAdmin) {
    router.push('/admin').then(() => window.location.reload());
  } else {
    router.push('/').then(() => window.location.reload());
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
      <h2 class="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
      <form @submit.prevent="handleLogin">
        <input
          v-model="email"
          type="email"
          placeholder="Email address"
          required
          class="input mb-4"
        />
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          required
          class="input mb-4"
        />
        <button type="submit" class="btn">Sign in</button>
        <div v-if="error" class="text-red-500 mt-2">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.input {
  display: block;
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.btn {
  display: block;
  width: 100%;
  background: #4caf50;
  color: white;
  padding: 10px;
  text-align: center;
  border: none;
  border-radius: 4px;
}
</style>

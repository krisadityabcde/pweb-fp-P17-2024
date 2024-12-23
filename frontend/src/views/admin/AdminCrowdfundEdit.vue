<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const name = ref('');
const target = ref(0);  // Default to 0 if target is a number
const status = ref(false); // Status switch for crowdfund (open/close)

const fetchCrowdfund = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/crowdfund/${route.params.id}`);
    const data = await response.json();
    name.value = data.name;
    target.value = data.target;
    status.value = data.status === 'OPEN'; // Set status to true if 'OPEN', false if 'CLOSED'
  } catch (error) {
    console.error('Error fetching crowdfund data:', error);
  }
};

const updateCrowdfund = async () => {
  const updatedData = {
    name: name.value,
    target: target.value,
    status: status.value ? 'OPEN' : 'CLOSED',
  };

  try {
    const response = await fetch(`http://localhost:5000/api/crowdfund/${route.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    });

    if (response.ok) {
      alert('Crowdfund updated successfully!');
      router.push(`/admin/${route.params.id}`);
    } else {
      alert('Failed to update crowdfund');
    }
  } catch (error) {
    console.error('Error updating crowdfund:', error);
  }
};

onMounted(() => {
  fetchCrowdfund();
});
</script>

<template>
  <div class="form-container">
    <h1 class="form-header">Edit Crowdfund</h1>
    <form @submit.prevent="updateCrowdfund" class="edit-form">
      <!-- Crowdfund Name -->
      <div class="form-group">
        <label for="name">Crowdfund Name</label>
        <input v-model="name" id="name" placeholder="Enter crowdfund name" />
      </div>

      <!-- Target Donation -->
      <div class="form-group">
        <label for="target">Target Donation</label>
        <input v-model="target" id="target" type="number" placeholder="Enter target donation" />
      </div>

      <!-- Status -->
      <div class="form-group">
        <label for="status">Status</label>
        <div class="status-toggle">
          <label>
            <input type="radio" v-model="status" :value="true" /> Open
          </label>
          <label>
            <input type="radio" v-model="status" :value="false" /> Closed
          </label>
        </div>
      </div>

      <!-- Submit Button -->
      <button type="submit" class="btn-submit">Update Crowdfund</button>
    </form>
  </div>
</template>

<style scoped>
.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.form-header {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1.5rem;
}

.edit-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-size: 1rem;
  font-weight: bold;
  color: #555;
  margin-bottom: 0.5rem;
}

input {
  padding: 0.8rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.status-toggle {
  display: flex;
  gap: 1rem;
}

.status-toggle label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  color: #333;
}

button.btn-submit {
  width: 100%;
  padding: 0.8rem;
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
  background-color: #4caf50;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.btn-submit:hover {
  background-color: #45a049;
}
</style>

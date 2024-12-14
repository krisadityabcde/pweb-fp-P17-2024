<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'vue-chartjs'

ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = {
  labels: ['Pendidikan', 'Kesehatan', 'Keagamaan', 'Sosial'],
  datasets: [{
    data: [40, 20, 25, 15],
    backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EC4899']
  }]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-12 text-center">Dampak Kebaikan Kita</h2>
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div class="h-80">
          <Doughnut :data="chartData" :options="chartOptions" />
        </div>
        <div class="grid grid-cols-2 gap-6">
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="text-4xl font-bold text-green-600 mb-2">1,2 Jt</div>
            <div class="text-gray-600">Total Donasi</div>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="text-4xl font-bold text-green-600 mb-2">50+</div>
            <div class="text-gray-600">Kampanye Aktif</div>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="text-4xl font-bold text-green-600 mb-2">10 Rb+</div>
            <div class="text-gray-600">Donatur</div>
          </div>
          <div class="text-center p-6 bg-gray-50 rounded-lg">
            <div class="text-4xl font-bold text-green-600 mb-2">95%</div>
            <div class="text-gray-600">Tingkat Keberhasilan</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import NewsCard from '../components/news/NewsCard.vue'

const newsItems = [
  {
    title: "Program Beasiswa Santri Berprestasi",
    description: "Program beasiswa untuk mendukung santri berprestasi melanjutkan pendidikan ke jenjang yang lebih tinggi.",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?w=800&auto=format&fit=crop",
    category: "Pendidikan"
  },
  {
    title: "Laporan Dampak Bulanan",
    description: "Laporan perkembangan program dan dampak donasi para donatur terhadap masyarakat.",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop",
    category: "Laporan"
  },
  {
    title: "Kerjasama Strategis",
    description: "BisaKita menjalin kerjasama dengan lembaga keuangan syariah terkemuka.",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop",
    category: "Kemitraan"
  }
]
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold mb-4">Berita & Informasi Terkini</h1>
        <p class="text-gray-600 max-w-2xl mx-auto">Ikuti perkembangan terbaru tentang kampanye dan dampak kebaikan yang telah kita lakukan bersama.</p>
      </div>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NewsCard
          v-for="news in newsItems"
          :key="news.title"
            v-bind="news"
            :image="news.image"
        />
      </div>
    </div>
  </div>
</template>
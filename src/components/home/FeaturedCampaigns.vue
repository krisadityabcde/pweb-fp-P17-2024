<script setup lang="ts">
import { ref } from "vue";
import { Carousel, Slide } from "vue3-carousel";
import Card from "../ui/Card.vue";
import type { Crowdfund } from "@/types";

const campaigns = ref<Partial<Crowdfund>[]>([
  {
    name: "Beasiswa Santri Berprestasi",
    target: "100000000",
    current_donation: 45000000,
    status: "OPEN",
    image: "src/assets/santri.jpg",
  },
  {
    name: "Renovasi Masjid Al-Ikhlas",
    target: "250000000",
    current_donation: 175000000,
    status: "OPEN",
    image: "src/assets/Masjid-Agung-Al-Ikhlas.jpg",
  },
  {
    name: "Bantuan Air Bersih Desa",
    target: "75000000",
    current_donation: 35000000,
    status: "OPEN",
    image: "src/assets/bantuan-air-bersih-lereng-merapi-flek-dom.jpg",
  },
]);
</script>

<template>
  <div class="py-12 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <h2 class="text-3xl font-bold mb-8 text-center">Kampanye Unggulan</h2>
      <Carousel :items-to-show="3" :wrap-around="true">
        <Slide v-for="campaign in campaigns" :key="campaign.name">
          <Card class="mx-2 h-full">
            <img
              :src="campaign.image"
              :alt="campaign.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-6">
              <h3 class="text-xl font-bold mb-4">{{ campaign.name }}</h3>
              <div class="mb-4">
                <div class="h-2 bg-gray-200 rounded">
                  <div
                    class="h-full bg-green-500 rounded"
                    :style="`width: ${(campaign.current_donation! / parseInt(campaign.target!)) * 100}%`"
                  ></div>
                </div>
              </div>
              <div class="flex justify-between text-sm text-gray-600">
                <span
                  >Terkumpul: Rp
                  {{ campaign.current_donation?.toLocaleString() }}</span
                >
                <span
                  >Target: Rp
                  {{ parseInt(campaign.target!).toLocaleString() }}</span
                >
              </div>
            </div>
          </Card>
        </Slide>
      </Carousel>
    </div>
  </div>
</template>

<style>
@import "vue3-carousel/dist/carousel.css";
</style>

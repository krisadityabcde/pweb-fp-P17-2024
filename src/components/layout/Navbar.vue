<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const isLoggedIn = ref(!!localStorage.getItem("token"));

const navigation = [
  { name: "Beranda", href: "/" },
  { name: "Berita", href: "/news" },
  { name: "Feedback", href: "/#Feedback" },
];
</script>

<template>
  <Disclosure
    as="nav"
    class="bg-gradient-to-r from-emerald-800 to-green-700 shadow-lg"
    v-slot="{ open }"
  >
    <div class="max-w-7xl mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <router-link to="/" class="text-2xl font-bold text-white"
              >BisaKita</router-link
            >
          </div>
          <div class="hidden md:ml-6 md:flex md:space-x-8">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-100 hover:text-white hover:border-b-2 hover:border-white"
            >
              {{ item.name }}
            </router-link>
          </div>
        </div>
        <div class="hidden md:ml-6 md:flex md:items-center">
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-green-700 bg-white hover:bg-gray-50"
          >
            Masuk
          </router-link>
          <button
            v-else
            @click="
              () => {
                localStorage.removeItem('token');
                isLoggedIn = false;
              }
            "
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            Keluar
          </button>
        </div>
        <div class="-mr-2 flex items-center md:hidden">
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-100 hover:text-white hover:bg-green-600"
          >
            <span class="sr-only">Open main menu</span>
            <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
      </div>
    </div>

    <DisclosurePanel class="md:hidden">
      <div class="pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in navigation"
          :key="item.name"
          :to="item.href"
          class="block pl-3 pr-4 py-2 text-base font-medium text-gray-100 hover:text-white hover:bg-green-600"
        >
          {{ item.name }}
        </router-link>
      </div>
      <div class="pt-4 pb-3 border-t border-green-600">
        <div class="flex items-center px-4">
          <router-link
            v-if="!isLoggedIn"
            to="/login"
            class="block w-full px-4 py-2 text-base font-medium text-center text-green-700 bg-white rounded-md hover:bg-gray-50"
          >
            Masuk
          </router-link>
          <button
            v-else
            @click="
              () => {
                localStorage.removeItem('token');
                isLoggedIn = false;
              }
            "
            class="block w-full px-4 py-2 text-base font-medium text-center text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Keluar
          </button>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

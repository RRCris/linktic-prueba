<template>
    <div class="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 text-center">
            <div class="bg-[#145E1E] text-white rounded-full w-24 h-24 flex items-center justify-center mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                    stroke="currentColor" class="w-12 h-12">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M9 17l-3-3m0 0l3-3m-3 3h12a2 2 0 002-2v-1m-16 2l3 3m0 0l-3 3m3-3v-6a2 2 0 00-2-2H5m16 2h-2m0 0l-3-3m3 3v-3a2 2 0 00-2-2H6m-1 2h16v2a2 2 0 002 2h2m-1-2h-16l3 3" />
                </svg>
            </div>
            <div>
                <h1 class="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">¡Página no encontrada!</h1>
                <p class="text-lg text-gray-500 mb-4">
                    Lo sentimos, la página que estás buscando no existe.
                    Por favor, verifica la URL o regresa a la página principal.
                </p>
                <router-link to="/"
                    class="inline-block bg-[#145E1E] hover:bg-[#2d5533] text-white font-semibold py-3 px-6 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
                    Volver al Inicio
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>
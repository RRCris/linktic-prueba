<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRoute } from 'vue-router';
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';
import UISpinner from '../components/UI/UISpinner.vue';
import { computed } from 'vue';


const route = useRoute()
const characterId = route.params.id as string
const { path, schema } = API_MAP.characterDetails
const { data, isLoading, isError, errorMessage } = useAPI(path(characterId), schema)

console.log(data)
const genderIcon = computed(() => {
    if (data.value?.gender === 'Male') {
        return 'material-symbols:male';
    } else if (data.value?.gender === 'Female') {
        return 'material-symbols:female';
    } else {
        return 'material-symbols:transgender'; // Icono por defecto para otros géneros o desconocido
    }
});
</script>

<template>
    <div v-if="isLoading" class="h-screen flex flex-col items-center justify-center ">
        <p class="font-bold">Cargando Contenido</p>
        <UISpinner />
    </div>
    <div v-else-if="isError">Error: {{ errorMessage }}</div>
    <div v-else-if="data" class="bg-gray-100 min-h-screen py-8">
        <div class="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden md:flex">
            <div class="md:h-auto md:flex-shrink-0">
                <img :src="data.image" :alt="data.name" class="h-48 w-full object-cover md:h-full md:w-48" />
            </div>
            <div class="p-8 flex-grow">
                <div class="flex items-center uppercase tracking-wide text-sm text-green-500 font-semibold">
                    <Icon :icon="genderIcon" class="mr-2" width="30" height="30" /> {{ data.status }} - {{ data.species
                    }}
                </div>
                <h2 class="mt-1 text-2xl leading-tight font-semibold text-gray-800">{{ data.name }}</h2>

                <div class="mt-2 flex items-center text-gray-600">
                    <Icon icon="material-symbols:info-outline" class="mr-2" />
                    <span class="font-semibold">ID:</span> {{ data.id }}
                </div>
                <div class="mt-1 flex items-center text-gray-600">
                    <Icon :icon="genderIcon" class="mr-2" />
                    <span class="font-semibold">Gender:</span> {{ data.gender }}
                </div>

                <div class="mt-4">
                    <h3 class="flex items-center text-lg font-semibold text-gray-700">
                        <Icon icon="material-symbols:location-on-outline" class="mr-2" /> Location:
                    </h3>
                    <p class="mt-1 text-gray-600">{{ data.location.name }}</p>
                </div>

                <div class="mt-2">
                    <h3 class="flex items-center text-lg font-semibold text-gray-700">
                        <Icon icon="material-symbols:home-outline" class="mr-2" /> Origin:
                    </h3>
                    <p class="mt-1 text-gray-600">{{ data.origin.name }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
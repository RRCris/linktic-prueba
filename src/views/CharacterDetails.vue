<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';


const route = useRoute()
const characterId = route.params.id as string
const { path, schema } = API_MAP.characterDetails
const { data, isLoading, isError, errorMessage } = useAPI(path(characterId), schema)

console.log(data)
</script>

<template>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">Error: {{ errorMessage }}</div>
    <div v-else-if="data">
        <h1>{{ data.name }}</h1>
        <img :src="data.image" :alt="data.name" width="120" />
        <p><strong>Especie:</strong> {{ data.species }}</p>
        <p><strong>Género:</strong> {{ data.gender }}</p>
        <p><strong>Estado:</strong> {{ data.status }}</p>
    </div>
</template>
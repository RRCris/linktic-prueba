<script setup lang="ts">
import { debounce } from 'lodash';
import { ref } from 'vue';

const nameFilter = ref('')
const speciesFilter = ref("")

const emit = defineEmits<{ (e: "search", filtros: Record<string, string>): void }>()

const onSearch = debounce(() => {
    emit("search", {
        page: "1",
        name: nameFilter.value.trim(),
        species: speciesFilter.value.trim()

    })
}, 800)
</script>

<template>
    <input type="text" v-model="nameFilter" @input="onSearch" placeholder="Buscar por nombre" class="SearchName" />
    <select v-model="speciesFilter" @change="onSearch" style="margin-bottom: 16px;">
        <option value="">Todas las especies</option>
        <option>Human</option>
        <option>Alien</option>
        <option>Humanoid</option>
        <option>Robot</option>
        <option>Cronenberg</option>
        <option>Animal</option>
    </select>
</template>
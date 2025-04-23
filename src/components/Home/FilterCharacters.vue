<script setup lang="ts">
import { debounce } from 'lodash';
import { ref } from 'vue';
import UITextInput from '../UI/UITextInput.vue';
import UISelect from '../UI/UISelect.vue';

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

const speciesOptions = ref([
    { value: '', label: 'Todas las especies' },
    { value: 'Human', label: 'Human' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Robot', label: 'Robot' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Animal', label: 'Animal' },
]);
</script>

<template>
    <UITextInput v-model="nameFilter" @input="onSearch" placeholder="Buscar por nombre" />
    <UISelect v-model="speciesFilter" :options="speciesOptions" @update:modelValue="onSearch" />

</template>
<script setup lang="ts">
import { debounce } from 'lodash';
import { ref } from 'vue';
import UISelect from '../UI/UISelect/UISelect.vue';
import UITextInput from '../UI/UITextInput/UITextInput.vue';

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
    <div class="flex flex-col gap-3 md:flex-row my-6">
        <UITextInput v-model="nameFilter" @input="onSearch" placeholder="Buscar por nombre" />
        <UISelect v-model="speciesFilter" :options="speciesOptions" @update:modelValue="onSearch"
            class="min-w-[300px]" />
    </div>

</template>
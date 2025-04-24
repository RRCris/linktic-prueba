<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ROUTES } from '../../../router';
import type { tCharacter } from '../../../@types/models';
import { computed } from 'vue';

const { character } = defineProps<{ character: tCharacter, delay: number }>()
const router = useRouter()

const goToDetails = (id: number) => {
    router.push(ROUTES.CHARACTER_DETAILS(id))
}

const statusColor = computed(() => {
    switch (character.status.toLowerCase()) {
        case 'alive':
            return 'text-green-600 font-semibold'
        case 'dead':
            return 'text-red-600 font-semibold'
        default:
            return 'text-gray-600 font-semibold'
    }
})
</script>

<template>
    <div @click="goToDetails(character.id)" :style="{ '--delay': `${delay}ms` }"
        class="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-4 w-full max-w-sm mx-auto hover:brightness-110 hover:cursor-pointer outline-2 outline-transparent hover:outline-[var(--primary-color)] ">
        <img :src="character.image" :alt="character.name" class="w-full h-48 object-cover rounded-xl mb-4" />
        <h2 class="text-xl font-semibold text-gray-800">{{ character.name }}</h2>
        <p class="text-sm text-gray-500 mb-2">Status: <span :class="statusColor">{{ character.status }}</span></p>

    </div>
</template>

<style lang="css" scoped></style>
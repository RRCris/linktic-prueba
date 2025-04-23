<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ROUTES } from '../../router';
import type { tCharacter } from '../../@types/models';

defineProps<{ character: tCharacter, delay: number }>()
const router = useRouter()

const goToDetails = (id: number) => {
    router.push(ROUTES.CHARACTER_DETAILS(id))
}
</script>

<template>
    <li @click="goToDetails(character.id)" :style="{ '--delay': `${delay}ms` }">
        <img :src="character.image" :alt="character.name" width="80" />
        <p>{{ character.name }}</p>
    </li>
</template>

<style lang="css" scoped></style>
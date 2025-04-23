<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import type { type_character } from '../@types/models';
import {  useRouter } from 'vue-router';
import { ROUTES } from '../router';
import { getCharacters } from '../services/api';

    const characters = ref<type_character[]>([])
    const router = useRouter()

    const goToDetails =(id:number)=>{
        router.push(ROUTES.CHARACTER_DETAILS(id))
    }

    onMounted(async function() {
        characters.value = await getCharacters()
    })
</script>

<template>
    <h1>Listado de Personajes</h1>
    <ul>
        <li v-for="character in characters" :key="character.id" @click="goToDetails(character.id)">
            <img :src="character.image" :alt="character.name" width="80"/>
            <p>{{ character.name }}</p>
        </li>
    </ul>
    
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
}
li {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  margin-bottom: 12px;
}
</style>
<script lang="ts" setup>
import {  useRouter } from 'vue-router';
import { ROUTES } from '../router';
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';

    const router = useRouter()
    const {path,schema}= API_MAP.character
    const {data:characters} = useAPI(path,schema)

    const goToDetails =(id:number)=>{
        router.push(ROUTES.CHARACTER_DETAILS(id))
    }


    
</script>

<template>
    <h1>Listado de Personajes</h1>
    <ul>
        <li v-for="character in characters?.results" :key="character.id" @click="goToDetails(character.id)">
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
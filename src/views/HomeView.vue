<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ROUTES } from '../router';
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';
import { computed, onMounted, ref } from 'vue';


const page = ref(1)
const router = useRouter()
const { path, schema } = API_MAP.character
const { data: characters, isLoading, errorMessage, isError, refetch, accumulative } = useAPI(path, schema, true, { page: page.value })

const observerTarget = ref<HTMLDivElement | null>(null)
onMounted(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0]
            if (entry.isIntersecting) {
                goNextPage()
            }
        }, {
        root: null,
        threshold: 1.0
    })

    if (observerTarget.value) observer.observe(observerTarget.value)
})

const goToDetails = (id: number) => {
    router.push(ROUTES.CHARACTER_DETAILS(id))
}

const goNextPage = () => {
    page.value++
    refetch({ page: page.value })
}
const goPrevPage = () => {
    page.value--
    refetch({ page: page.value })

}

const itemsLoadings = computed(() => accumulative.value.map(dt => dt.results).flat())


</script>

<template>
    <div v-if="isLoading && accumulative.length === 0">Cargando...</div>
    <div v-else-if="isError">Error: {{ errorMessage }}</div>
    <div v-else-if="characters">

        <h1>Listado de Personajes</h1>
        <p>Pagina {{ page }}</p>
        <p>{{ itemsLoadings.length }}</p>
        <ul>
            <li v-for="character in itemsLoadings" :key="character.id" @click="goToDetails(character.id)">
                <img :src="character.image" :alt="character.name" width="80" />
                <p>{{ character.name }}</p>
            </li>
        </ul>
    </div>
    <div ref="observerTarget" style="height: 40px;" />
    <button @click="goPrevPage">Pagina Anterior</button>
    <button @click="goNextPage">Pagina Siguiente</button>

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
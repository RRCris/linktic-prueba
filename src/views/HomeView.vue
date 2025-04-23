<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ROUTES } from '../router';
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';
import { computed, onMounted, ref } from 'vue';
import debounce from "lodash/debounce"

const nameFilter = ref('')
const speciesFilter = ref("")
const page = ref(1)
const router = useRouter()
const { path, schema } = API_MAP.character
const { data, isLoading, errorMessage, isError, refetch, accumulative } = useAPI(path, schema, true, { page: page.value })

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
    if (data.value?.info.next) {
        page.value++
        refetch({ page: page.value })
    }
}

const onSearch = debounce(() => {
    page.value = 1
    accumulative.value = []

    refetch({
        page: page.value,
        name: nameFilter.value.trim(),
        species: speciesFilter.value.trim()
    })

}, 800)


const itemsLoadings = computed(() => accumulative.value.map(dt => dt.results).flat())
const startDelay = computed(() => itemsLoadings.value.length - 20)


</script>

<template>
    <h1>Listado de Personajes</h1>
    <!-- filtros -->
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

    <!-- informacion -->
    <div v-if="isLoading && accumulative.length === 0">Cargando...</div>
    <div v-else-if="isError"> {{ errorMessage }}</div>
    <div v-else-if="itemsLoadings">

        <p>Pagina {{ page }}</p>
        <!-- listado de personajes -->
        <p>{{ itemsLoadings.length }}</p>
        <ul>
            <TransitionGroup name="slide-bounce" tag="ul">
                <li v-for="(character, i) in itemsLoadings" :key="character.id" @click="goToDetails(character.id)"
                    :style="{ '--delay': `${(i - startDelay) * 160}ms` }">
                    <img :src="character.image" :alt="character.name" width="80" />
                    <p>{{ character.name }}</p>
                </li>
            </TransitionGroup>
        </ul>
    </div>
    <!-- sentinela -->
    <div ref="observerTarget" style="height: 40px; margin-top: 20px;" />
    <div v-if="isLoading">Cargando más...</div>



</template>

<style scoped>
.SearchName {
    margin-bottom: 16px;
    padding: 8px;
}

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

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.slide-bounce-enter-active {
    animation: slideInBounce 0.6s ease-out both;
    animation-delay: var(--delay);
}

@keyframes slideInBounce {
    0% {
        opacity: 0;
        transform: translateX(100%);
    }

    60% {
        opacity: 1;
        transform: translateX(-10px);
    }

    80% {
        transform: translateX(5px);
    }

    100% {
        transform: translateX(0);
    }
}
</style>
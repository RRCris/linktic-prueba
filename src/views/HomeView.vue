<script lang="ts" setup>
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';
import { computed, ref } from 'vue';
import { useObserver } from '../composables/useObserver';
//Components
import Filter from '../components/Home/Filter.vue';
import CardCharacter from '../components/Characters/CardCharacter.vue';

const page = ref(1)
const { path, schema } = API_MAP.character
const { data, isLoading, errorMessage, isError, refetch, accumulative } = useAPI(path, schema, true, { page: page.value })




const goNextPage = () => {
    if (data.value?.info.next) {
        page.value++
        refetch({ page: page.value })
    }
}
const observerTarget = useObserver<HTMLDivElement>(goNextPage)


const onSearch = (params: Record<string, string>) => {
    page.value = 1
    accumulative.value = []

    refetch(params)
}


const itemsLoadings = computed(() => accumulative.value.map(dt => dt.results).flat())
const startDelay = computed(() => itemsLoadings.value.length - 20)


</script>

<template>
    <h1 class="bg-red-300">Listado de Personajes</h1>
    <!-- filtros -->
    <Filter @search="onSearch" />

    <!-- informacion -->
    <div v-if="isLoading && accumulative.length === 0">Cargando...</div>
    <div v-else-if="isError"> {{ errorMessage }}</div>
    <div v-else-if="itemsLoadings">

        <p>Pagina #{{ page }}</p>
        <!-- listado de personajes -->
        <p>Cargados: {{ itemsLoadings.length }} Personajes</p>
        <ul>
            <TransitionGroup name="slide-bounce" tag="ul">
                <CardCharacter v-for="(character, i) in itemsLoadings" :key="character.id" :character="character"
                    :delay="(i - startDelay) * 160" />
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
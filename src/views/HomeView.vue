<script lang="ts" setup>
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';
import { computed, ref } from 'vue';
import { useObserver } from '../composables/useObserver';
//Components
import FilterCharacters from '../components/Home/FilterCharacters.vue';
import CardCharacter from '../components/Characters/CardCharacter/CardCharacter.vue';
import UISpinner from '../components/UI/UISpinner.vue';

const page = ref(1)
const { path, schema } = API_MAP.character
const { data, isLoading, errorMessage, isError, refetch, accumulative } = useAPI(path, schema, true, { page: page.value })
const filters = ref<Record<string, string | number>>({})




const goNextPage = () => {
    if (data.value?.info.next) {
        page.value++

        //busco con los filtros actuales pero en la siguiente pagina
        refetch({ ...filters.value, page: page.value })
    }
}
const observerTarget = useObserver<HTMLDivElement>(goNextPage)


const onSearch = (params: Record<string, string>) => {
    filters.value = params // guardo filtros
    //reinicio todo
    page.value = 1
    accumulative.value = []

    //hago la peticion
    refetch(params)
}


const itemsLoadings = computed(() => accumulative.value.map(dt => dt.results).flat())
const startDelay = computed(() => itemsLoadings.value.length - 20)


</script>

<template>
    <header>
        <h1 class="text-6xl text-center">Listado de Personajes</h1>
        <p class="text-lg text-center">Aqui pudes buscar tus personajes favoritos de <strong
                class="text-[var(--primary-color)]">ricky y
                morthy</strong></p>
    </header>
    <main>

        <!-- filtros -->
        <FilterCharacters @search="onSearch" />

        <!-- informacion -->
        <div v-if="isLoading && accumulative.length === 0" class="h-screen flex flex-col items-center justify-center">
            <p class="font-bold">Cargando Contenido</p>
            <UISpinner />
        </div>
        <div v-else-if="isError" class="h-screen flex flex-col items-center justify-center"> {{ errorMessage }}</div>
        <div v-else-if="itemsLoadings">
            <!-- listado de personajes -->
            <TransitionGroup name="slide-bounce" tag="ul" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                <CardCharacter v-for="(character, i) in itemsLoadings" :key="character.id" :character="character"
                    :delay="(i - startDelay) * 160" />
            </TransitionGroup>
        </div>
        <!-- sentinela -->
        <div ref="observerTarget" style="height: 40px; margin-top: 20px;" />
        <div v-if="isLoading" class="flex flex-col items-center justify-center">
            <p class="font-bold">Cargando Contenido</p>
            <UISpinner />
        </div>
    </main>



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
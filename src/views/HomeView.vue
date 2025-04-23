<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ROUTES } from '../router';
import { useAPI } from '../composables/useAPI';
import { API_MAP } from '../constants/apiRoutes';
import { computed, onMounted, ref } from 'vue';

const nameFilter = ref('')
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


const itemsLoadings = computed(() => accumulative.value.map(dt => dt.results).flat())
const startDelay = computed(() => itemsLoadings.value.length - 20)


</script>

<template>
    <input type="text" v-model="nameFilter" />
    <div v-if="isLoading && accumulative.length === 0">Cargando...</div>
    <div v-else-if="isError">Error: {{ errorMessage }}</div>
    <div v-else-if="itemsLoadings">

        <h1>Listado de Personajes</h1>
        <p>Pagina {{ page }}</p>
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
    <div ref="observerTarget" style="height: 40px; margin-top: 20px;" />
    <div v-if="isLoading">Cargando más...</div>



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
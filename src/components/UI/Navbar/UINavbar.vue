<script setup lang="ts">
import { ref } from 'vue'
import UISelect from '../UISelect/UISelect.vue'
import UIButton from '../UIButton/UIButton.vue'

const changeTheme = (theme: string) => {
    document.documentElement.setAttribute("data-theme", theme)
}

const theme = ref("")
const darkMode = ref(false)
const themes = [{ value: "red", label: "Tema Rojo" }, { value: "", label: "Tema por defecto" }, { value: "blue", label: "Tema Azul" }]

const toggleMode = () => {
    darkMode.value = !darkMode.value
    document.documentElement.className = darkMode.value ? "dark" : ""
}
</script>

<template>
    <nav
        class="fixed top-0 left-0 right-0 w-full h-[55px] flex  items-center justify-center sm:justify-between py-2 px-5 bg-white dark:bg-gray-700 dark:text-white outline-2 outline-[var(--primary-color)] z-10  ">
        <p class="hidden sm:block"> Ricky & Morty</p>
        <div class="flex items-center gap-3">
            <UIButton @click="toggleMode">{{ darkMode ? "Ir a modo claro" : "Ir a modo oscuro " }}</UIButton>
            <UISelect :options="themes" v-model="theme" @update:model-value="changeTheme" class="min-w-[200px]" />
        </div>
    </nav>
</template>
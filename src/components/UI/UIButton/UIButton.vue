<script setup lang="ts">
import { defineEmits } from 'vue'

const estilosDisponibles: Record<string, string> = {
    primary: 'bg-[var(--primary-color)] text-white hover:bg-[var(--primary-color-hover)]',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 border border-gray-300',
}

defineProps({
    estilo: {
        type: String,
        default: 'primary',
        validator: (value: string) => ['primary', 'secondary'].includes(value),
    },
})

// Declarás los eventos que puede emitir el botón
const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void
    (e: 'focus', event: FocusEvent): void
    (e: 'blur', event: FocusEvent): void
    (e: 'keydown', event: KeyboardEvent): void
}>()
</script>

<template>
    <button :class="[
        'py-2',
        'px-4',
        'rounded-md',
        'font-semibold',
        'transition',
        'duration-200',
        'ease-in-out',
        'cursor-pointer',
        estilosDisponibles[estilo],
    ]" @click="(e) => emit('click', e)" @focus="(e) => emit('focus', e)" @blur="(e) => emit('blur', e)"
        @keydown="(e) => emit('keydown', e)">
        <slot />
    </button>
</template>

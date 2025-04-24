<script setup lang="ts">

const estilosDisponibles: Record<string, string> = {
    primary: 'bg-theme-color text-white hover:bg-green-600',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 border border-gray-300',
};
defineProps({
    estilo: {
        type: String,
        default: 'primary',
        validator: (value: string) => ['primary', 'secondary'].includes(value),
    },
});


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
    ]">
        <slot></slot>
    </button>
</template>

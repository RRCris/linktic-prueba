<script setup lang="ts">
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
        estilo === 'primary' ? 'bg-[#145E1E] text-white hover:bg-green-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300 hover:text-gray-800 border border-gray-300',
    ]">
        <slot></slot>
    </button>
</template>

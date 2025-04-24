<template>
    <input type="text" class="
        shadow-sm
        block
        w-full
        sm:text-sm
        border-gray-300
        rounded-md
        py-2
        pl-2
        outline-none
        border-b-2
        focus:border-[var(--primary-color)]
      " :value="modelValue" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        v-bind="$attrs">
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: [String, Number, Boolean],
        default: '',
    },
});

const emit = defineEmits(['update:modelValue']);
</script>

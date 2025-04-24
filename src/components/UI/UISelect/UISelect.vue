<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
    modelValue: string | number | boolean;
    options: { value: string | number | boolean; label: string }[];
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);

const selectedOptionLabel = computed(() => {
    const selected = props.options.find(option => option.value === props.modelValue);
    return selected ? selected.label : 'Seleccionar...';
});

const updateValue = (newValue: string | number | boolean) => {
    emit('update:modelValue', newValue);
    isOpen.value = false;
};
</script>

<template>
    <div class="relative">
        <button type="button" class="
          bg-white
          border
          border-gray-300
          rounded-md
          shadow-sm
          w-full
          py-2
          px-4
          text-left
          cursor-default
          focus:outline-none
          focus:ring-1
          focus:ring-[#145E1E]
          focus:border-[#145E1E]
          sm:text-sm
        " aria-haspopup="listbox" :aria-expanded="isOpen" aria-labelledby="listbox-label" @click="isOpen = !isOpen">
            <span class="block truncate">{{ selectedOptionLabel }}</span>
            <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clip-rule="evenodd" />
                </svg>
            </span>
        </button>

        <ul v-if="isOpen" class="
          absolute
          z-10
          mt-1
          w-full
          bg-white
          shadow-lg
          rounded-md
          max-h-56
          overflow-auto
          focus:outline-none
          sm:text-sm
        " tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-0">
            <li v-for="(option, index) in options" :key="index" class="
            text-gray-900
            cursor-default
            select-none
            relative
            py-2
            pl-3
            pr-9
            hover:bg-gray-100
          " :class="{ 'font-semibold bg-[#145E1E] text-white': modelValue === option.value }" id="listbox-option-0"
                role="option" @click="updateValue(option.value)">
                <span class="block truncate" :class="{ 'font-semibold': modelValue === option.value }">{{ option.label
                    }}</span>

                <span v-if="modelValue === option.value"
                    class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600">
                    <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.975 3.975 7.425-9.75a.75.75 0 011.05-.143z"
                            clip-rule="evenodd" />
                    </svg>
                </span>
            </li>
        </ul>
    </div>
</template>

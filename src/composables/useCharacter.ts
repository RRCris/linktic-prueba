import { onMounted, ref } from "vue";
import type { type_character } from "../@types/models";
import { getCharacters } from "../services/api";

export function useCharacter() {
  const data = ref<type_character[] | null>(null);
  const isLoading = ref(true);
  const isError = ref(false);
  const errorMessage = ref("");

  const fetchCharacter = async () => {
    isLoading.value = true;
    isError.value = false;

    try {
      const result = await getCharacters();
      data.value = result;
    } catch (err: any) {
      isError.value = true;
      errorMessage.value = err.message || "Error Desconocido";
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetchCharacter);

  return {
    data,
    isLoading,
    isError,
    errorMessage,
    refetch: fetchCharacter,
  };
}

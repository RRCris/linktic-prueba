import { onMounted, ref } from "vue";
import { BASE_URL } from "../services/api";
import type { z } from "zod";

export function useAPI<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  autoFetch = true,
  queryParams?: Record<string, string>
) {
  const data = ref<T | null>(null);
  const isLoading = ref(true);
  const isError = ref(false);
  const errorMessage = ref("");

  const fetctData = async () => {
    isLoading.value = true;
    isError.value = false;

    try {
      const queryString =
        "?" + queryParams ? new URLSearchParams(queryParams).toString() : "";
      const res = await (await fetch(BASE_URL + endpoint + queryString)).json();
      const { success, data: dataParse, error } = schema.safeParse(res);
      if (!success) {
        throw new Error(`"Respuesta no valida" : ${error}`);
      }
      data.value = dataParse;
    } catch (err: any) {
      isError.value = true;
      errorMessage.value = err.message || "Error Desconocido";
    } finally {
      isLoading.value = false;
    }
  };
  if (autoFetch) {
    onMounted(fetctData);
  }

  return {
    data,
    isLoading,
    isError,
    errorMessage,
    refetch: fetctData,
  };
}

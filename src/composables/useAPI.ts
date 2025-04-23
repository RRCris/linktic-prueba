import { onMounted, ref } from "vue";
import { BASE_URL } from "../services/api";
import type { z } from "zod";

export function useAPI<T>(
  endpoint: string,
  schema: z.ZodType<T>,
  autoFetch = true,
  queryParams?: Record<string, string | number>
) {
  const data = ref<T | null>(null);
  const isLoading = ref(false);
  const isError = ref(false);
  const errorMessage = ref("");
  const accumulative = ref<T[]>([]);

  const fetctData = async (newParams?: Record<string, string | number>) => {
    if (isLoading.value === true) return;
    isLoading.value = true;
    isError.value = false;

    try {
      //Preparat Peticion
      const effectiveParams = newParams || queryParams;
      const queryString =
        "?" +
        (queryParams
          ? new URLSearchParams(
              effectiveParams as Record<string, string>
            ).toString()
          : "");

      //Lanzar Peticion
      const res = await fetch(BASE_URL + endpoint + queryString);
      const json = await res.json();

      //Evaluar Respuesta
      if (res.status === 404)
        throw new Error("No se encontraron coincidencias");
      const { success, data: dataParse } = schema.safeParse(json);
      if (!success) {
        throw new Error(`"Respuesta no valida"`);
      }

      //asignar respuestas
      data.value = dataParse;
      accumulative.value = [...accumulative.value, data.value];
    } catch (err: any) {
      //asignar valores de error
      isError.value = true;
      console.warn(err);
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
    accumulative,
    isLoading,
    isError,
    errorMessage,
    refetch: fetctData,
  };
}

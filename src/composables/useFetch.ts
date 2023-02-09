import { onMounted, ref, UnwrapRef } from "vue";

export function useFetch<TData>(service: () => Promise<TData | string>) {
  const data = ref<TData | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(true);

  onMounted(async () => {
    try {
      const serviceResponse: TData | string = await service();
      if (typeof serviceResponse === "string") throw new Error(serviceResponse);
      data.value = serviceResponse as UnwrapRef<TData>;
    } catch (err) {
      error.value = err as string;
    } finally {
      isLoading.value = false;
    }
  });

  return {
    data,
    error,
    isLoading,
  };
}

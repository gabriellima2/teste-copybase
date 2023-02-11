import { onMounted, ref, UnwrapRef } from "vue";

export function useFetch<TData>(service: () => Promise<TData>) {
  const data = ref<TData | null>(null);
  const error = ref<string | null>(null);
  const isLoading = ref(true);

  onMounted(async () => {
    service()
      .then((serviceData) => (data.value = serviceData as UnwrapRef<TData>))
      .catch((e) => (error.value = "Ocorreu um erro, tente novamente!"))
      .finally(() => (isLoading.value = false));
  });

  return {
    data,
    error,
    isLoading,
  };
}

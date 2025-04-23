import { onMounted, ref } from "vue";

export function useObserver<T>(callback: () => void) {
  const observerTarget = ref<T | null>(null);
  onMounted(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        threshold: 1.0,
      }
    );

    if (observerTarget.value) observer.observe(observerTarget.value);
  });

  return observerTarget;
}

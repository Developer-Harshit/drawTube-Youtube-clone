export const useFinder = () => {
  const pending = ref(true);
  const sucess = ref(false);

  const videos = ref([]);
  const from = ref(0);
  const count = ref(9);

  function finder() {
    const API_URL = useRuntimeConfig().public.API_URL;
    pending.value = true;

    sucess.value = false;
    fetch(API_URL + "/video" + `?from=${from.value}&count=${count.value}`)
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        console.log("there is error");
      })
      .then((data) => {
        pending.value = false;
        sucess.value = data.sucess || false;
        if (!data.sucess || !data.result) return;
        videos.value = videos.value.concat(data.result);
        from.value += count.value;
      });
  }
  return { finder, pending, sucess, videos };
};

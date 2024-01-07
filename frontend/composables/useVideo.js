export const useVideo = () => {
  const pending = ref(true);
  const sucess = ref(false);

  const videos = ref([]);
  const video = ref({
    user: {}
  });

  const from = ref(0);
  const count = ref(3);

  function finder(findOne = false) {
    const API_URL = useRuntimeConfig().public.API_URL;
    pending.value = true;
    sucess.value = false;
    let reqUrl;
    if (findOne) reqUrl = API_URL + "/video/" + findOne;
    else
      reqUrl = API_URL + "/video" + `?from=${from.value}&count=${count.value}`;
    let fetchReq = fetch(reqUrl)
      .then((res) => {
        return res.json();
      })
      .catch((e) => {
        //console.log("there is error");
      })
      .then((data) => {
        pending.value = false;
        sucess.value = data.sucess || false;
        if (!data.sucess || !data.result) return;

        if (findOne) video.value = data.result;
        else {
          videos.value = videos.value.concat(data.result);
          from.value += count.value;
        }
      });
    return fetchReq;
  }
  return { finder, pending, sucess, videos, video };
};
export const createVideo = () => {
  const pending = ref(false);
  const sucess = ref(false);
  const formData = reactive({
    name: "",
    desc: "",
    fps: "",
    datauri: "",
    tags: []
  });

  function creator() {
    const API_URL = useRuntimeConfig().public.API_URL;
    pending.value = true;
    sucess.value = false;
    let token = undefined;
    if (process.client) token = localStorage.getItem("token");

    fetch(API_URL + "/video/", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(formData)
    })
      .then((res) => {
        //console.log("FORM: ", JSON.stringify(formData));
        //console.log("RESPONSE: ", res);
        return res.json();
      })
      .then((data) => {
        pending.value = false;
        //console.log("DATA: ", data);
        sucess.value = data.sucess || false;

        // redirect to home page
      })
      .catch((e) => {
        //console.log("there is error", e);
        return;
      });
  }

  return { creator, pending, sucess, formData };
};

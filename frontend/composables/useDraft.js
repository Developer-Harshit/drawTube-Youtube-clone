export const useDraft = () => {
  const pending = ref(false);
  const sucess = ref(false);

  const drafts = ref(undefined);

  function finder(url = "") {
    const API_URL = useRuntimeConfig().public.API_URL;
    pending.value = true;
    let token = undefined;
    if (process.client) token = localStorage.getItem("token");

    sucess.value = false;
    //console.log(token, url);
    fetch(API_URL + "/draft/" + url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then((res) => {
        //console.log(res);
        return res.json();
      })
      .catch((e) => {
        pending.value = false;
        sucess.value = false;
        //console.log("there is error");
      })
      .then((data) => {
        pending.value = false;
        sucess.value = data.sucess || false;
        if (!data.sucess || !data.result) return;
        //console.log(data);
        drafts.value = data.result;
      });
  }

  return { finder, pending, sucess, drafts };
};
export const createDraft = () => {
  const pending = ref(false);
  const sucess = ref(false);

  const formData = reactive({
    name: "",
    datauri: ""
  });

  function creator() {
    const API_URL = useRuntimeConfig().public.API_URL;
    pending.value = true;
    sucess.value = false;
    let token = undefined;
    if (process.client) token = localStorage.getItem("token");

    fetch(API_URL + "/draft/", {
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

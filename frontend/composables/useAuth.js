export const useAuth = () => {
  const baseURL = useRuntimeConfig().public.API_URL;
  const pending = ref(false);
  const sucess = ref(false);

  const formData = reactive({
    name: "",
    handle: "",
    password: ""
  });
  function verifyName() {}
  function verifyHandle() {}
  function verifyPassword() {}
  function submitForm(type = "sign") {
    pending.value = true;
    sucess.value = false;

    fetch(baseURL + "/user/" + type, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
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
        if (data.result.token && data.result.user) {
          //console.log(data.result.token);
          // add cookie to localstorage
          if (process.client) localStorage.setItem("token", data.result.token);
          useIsauth().value = true;
          useUser().value = data.result.user;
          return navigateTo("/");
        }
        // redirect to home page
      })
      .catch((e) => {
        //console.log("there is error", e);
        return;
      });
  }
  return { submitForm, pending, sucess, formData };
};

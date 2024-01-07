export default defineNuxtRouteMiddleware((to, from) => {
  const user = useUser();
  const isauth = useAuth();

  // Get token

  // Fetch verify req and get user details

  // Set user details to useUser

  const authrRoutes = ["/editor/saved", "/profile", "/logout"];
  const nonAuthRoutes = ["/login", "/signup"];
  if (process.client) {
    let token = localStorage.getItem("token");
    if (token) isauth.value = true;
  }
  if (user.value.legit || isauth.value) {
    // user is legit
    if (to.name == "login" || to.name == "signin") return navigateTo("/");
  } else {
    if (to.name == "profile" || to.name == "logout")
      return navigateTo("/login");
  }
});

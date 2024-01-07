<script setup>
// home search create profile logout
const showNav = useShowNav();
const user = useUser();
const publicLinks = [
  { to: "/", icon: "home", text: "Home" },
  { to: "/search", icon: "search", text: "Search" },
  { to: "/create", icon: "add", text: "Create" },
  { to: "/editor", icon: "edit", text: "Editor" }
];
const navLinks = computed(() => {
  if (user.value.legit)
    return [
      ...publicLinks,
      { to: "/profile", icon: "person", text: "Profile" }
    ];

  return [...publicLinks, { to: "/signup", icon: "lock", text: "Signup" }];
});
</script>
<template>
  <NavBase
    :nav-links="navLinks"
    class="main-nav z-50 fixed bottom-0 left-1/2 w-1/2"
    :class="[{ none: !showNav }]"
  />
</template>

<style>
.main-nav.nav {
  margin-left: -25%;
  margin-bottom: 25px;
  border-radius: 50px;
}
.none.nav {
  display: none;
}

@media (max-width: 960px) {
  .main-nav.nav {
    width: 70%;
    margin-left: -35%;
  }
}

@media (max-width: 640px) {
  .main-nav.nav {
    width: 100%;
    left: 0;
    margin-left: 0;
    margin-bottom: 0;
    border-radius: 0;
  }
}
@media (max-width: 480px) {
  .main-nav.nav .nav-text {
    display: none;
  }
  .main-nav.nav {
    width: 100%;
    left: 0;
    margin-left: 0;
  }
}
</style>

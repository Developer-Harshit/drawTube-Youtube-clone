<script setup>
// home search create profile logout
const user = useUser();
const publicLinks = [
  { to: "/", icon: "home", text: "Home" },
  { to: "/search", icon: "search", text: "Search" },
  { to: "/editor", icon: "add", text: "Create" }
];
const navLinks = computed(() => {
  if (user.value.legit)
    return [
      ...publicLinks,
      { to: "/profile", icon: "person", text: "Profile" },
      { to: "/logout", icon: "logout", text: "Logout" }
    ];

  return [
    ...publicLinks,
    { to: "/signup", icon: "lock", text: "Signup" },
    { to: "/login", icon: "lock", text: "Login" }
  ];
});
</script>
<template>
  <nav class="nav">
    <template v-for="link in navLinks" :key="link.text">
      <NuxtLink :to="link.to" class="nav-link">
        <i class="material-icons nav-icon">{{ link.icon }}</i>
        <span class="nav-text">{{ link.text }}</span>
      </NuxtLink>
    </template>
  </nav>
</template>

<style scoped>
body {
  margin: 0 0 55px 0;
}

.nav {
  z-index: 10000000;
  position: fixed;
  bottom: 0;
  width: 50%;
  left: 50%;

  display: flex;
  overflow: auto;

  justify-content: space-evenly;
  margin-left: -25%;
  margin-bottom: 25px;

  border-radius: 50px;
  box-shadow: 0 0 100px rgba(234, 30, 30, 0.207);
  background-color: #0c0101;
}

.nav-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  min-width: 50px;
  overflow: hidden;
  white-space: nowrap;
  font-family: sans-serif;
  font-size: 13px;
  color: #444444;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  transition: background-color 0.1s ease-in-out;
}
.nav-link {
  /* border-radius: 10px; */
  transition: all 0.3s;
  padding: 1rem 0;
}
.nav-link:hover {
  background-color: #242323;
  color: rgb(224, 205, 205);
}

.router-link-active,
.router-link-active:hover {
  background-color: #ffffff;
  color: rgb(208, 28, 9);
}
.router-link-active .nav-icon {
  color: rgb(208, 28, 9);
}

.nav-icon {
  transition: all 0.3s;
  font-size: 18px;
  color: rgb(254, 242, 242);
}

@media (max-width: 960px) {
  .nav {
    width: 70%;
    margin-left: -35%;
  }
}

@media (max-width: 640px) {
  .nav {
    width: 100%;
    left: 0;
    margin-left: 0;
    margin-bottom: 0;
    border-radius: 0;
  }
}
@media (max-width: 480px) {
  .nav-text {
    display: none;
  }
  .nav {
    width: 100%;
    left: 0;
    margin-left: 0;
  }
}
</style>

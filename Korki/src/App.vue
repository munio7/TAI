<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import Navbar from './components/Navbar.vue';
</script>

<style>
  @import './assets/main.css';
</style>


<template>
  <header>
      <nav>
        <Navbar/>
      </nav>
  </header>
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" />
    </transition>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 12px;

}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
/* Basic fade transition */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>

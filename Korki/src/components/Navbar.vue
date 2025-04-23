<template>
    <main>
        <img @click="goToHome" id="logo" src="../assets/logo.svg">
        <NButton text >Załóż konto</NButton>
        <NButton text >Zaloguj</NButton>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->

    </main>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { useRouter } from 'vue-router';

const router = useRouter()
const goToHome = () => {
  router.push("/")
}

</script>

<style scoped>
main{
  /* padding: 0 0.5rem; */
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: var(--navbar-color);
  /* height: calc(100vh - var(--router-width)); */
  height: var(--navbar-height);
}

img{
  height: 100%;
  cursor: pointer;
  padding: 0.5rem;
  box-sizing: border-box;
  
}


</style>
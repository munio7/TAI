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
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1rem;
    background-color: var(--navbar-color);
    /* height: calc(100vh - var(--router-width)); */
    height: var(--navbar-height);
    width: 100%;
}

img{
  cursor: pointer;
  padding: 10px;
  height: calc(100% - 10px);
}


</style>
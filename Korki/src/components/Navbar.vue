<template>
    <main>
        <div id="logo"></div>
        <NButton text >Załóż konto</NButton>
        <NButton text >Zaloguj</NButton>
        <!-- <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink> -->

    </main>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'



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


</style>
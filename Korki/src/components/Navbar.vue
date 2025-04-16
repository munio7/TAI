<template>
    <main>
        <div id="logo"></div>
        <div id="panel">
            <NButton :text="true" >dada</NButton>
        </div>
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
    background-color: var(--navbar-color);
    /* height: calc(100vh - var(--router-width)); */
    height: 70px;
    width: 100%;
}


</style>
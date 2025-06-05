<template>
    <header>
        <RouterLink activeClass="active" to="/profile/start">Start</RouterLink>
        <!-- <RouterLink activeClass="active" to="/profile/students">Uczniowie</RouterLink> -->
        <RouterLink activeClass="active" to="/profile/calendar">Kalendarz</RouterLink>
        <RouterLink activeClass="active" to="/profile/me">Profil</RouterLink>
    </header>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';


</script>

<style scoped>
a{
    color: rgba(255, 255, 255, 0.322);
    text-decoration: none;
    font-size: 1.5rem;
    transition: all 0.3s ;
}
header{
    height: fit-content;
    background-color: transparent;
    padding: 1rem;
    display: flex;
    justify-content: center;
    gap: 3rem;
    width: 100%;
    box-sizing: border-box;
}

.active{
    color: var(--text-accent-color) !important;
}

a:hover{
    color: white;
}
</style>
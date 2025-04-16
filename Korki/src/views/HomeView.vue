<script setup lang="ts">
import { NCheckbox } from 'naive-ui';
import Navbar from '../components/Navbar.vue'


</script>

<template>
  <main>
    <header>
      Nie mamy wszystkiego.<br><span>Mamy wszystko, czego potrzebujesz.</span>
    </header>
    <div id="search-bar">
      <div id="heading">

      </div>
      <div id="subject">

      </div>
      <div id="localization">

      </div>
      <div id="check-box">
        <NCheckbox/>
        <span>Online</span>
      </div>
      <div id="search">

      </div>
    </div>
  </main>
</template>

<style scoped>
  * {
    color: white;
  }
  main{
    height: calc(100% - var(--navbar-height));
    display: flex;
    flex-direction: column;
    background-color: var(--main-bg-color);
  }
  header{
    font-size: 48px;
    font-family: "Playfair Display", serif;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 3rem;
  }
  header > span{
    color: var(--text-accent-color);
  }
  #search-bar{
    display: flex;
    background-color: var(--secondary-color);
    height: 200px;
    width: 80vw;
    margin: 0 auto;
    border-radius: 10px;
    padding: 1rem;
  }
</style>

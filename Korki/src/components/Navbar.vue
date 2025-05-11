<template>
    <main>
        <img @click="goToHome" id="logo" src="../assets/logo.svg">
        <div v-if="!logged" class="login-options">
          <NButton text @click="goToSignLogin('signup')" >Załóż konto</NButton>
          <NButton text @click="goToSignLogin('login')">Zaloguj</NButton>
        </div>
        <div v-else class="profile" @click="goToProfile">
          <n-avatar round :style="{color: 'yellow', backgroundColor: 'red'}">M</n-avatar>
        </div>
    </main>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { NButton,NAvatar } from 'naive-ui'
import { useRouter } from 'vue-router';

const logged = ref(true);

const router = useRouter()
const goToHome = () => {
  router.push("/")
}
const goToSignLogin = (page : string) => {
  router.push(
    {
      name:'who-are-you',
      params: { activePage: page } 
    }
  )
}

const goToProfile = () => {
  router.push("/profile/start")
}

</script>

<style scoped>
main{
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--main-bg-color)  !important;
  height: var(--navbar-height);
  padding: 0.5rem;
  box-sizing: border-box;
}

img{
  height: 100%;
  cursor: pointer;
}

.login-options{
  display: flex;
  gap: 1rem;
}
.profile{
  cursor: pointer;
}


</style>
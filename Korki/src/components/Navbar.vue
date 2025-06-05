<template>
  <main>
    <img @click="goToHome" id="logo" src="../assets/logo.svg">

    <div v-if="!logged" class="login-options">
      <NButton text @click="goToSignLogin('signup')">Załóż konto</NButton>
      <NButton text @click="goToSignLogin('login')">Zaloguj</NButton>
    </div>


    <div v-else class="profile">


      <n-popover trigger="hover" placement="bottom-end" :show-arrow="false">
        <template #trigger>
          <div class="bell-wrapper">
            <n-badge :value="notifications.length" type="error">
              <n-icon size="35">
                <Bell />
              </n-icon>
            </n-badge>
          </div>
        </template>

        <div class="notifications">
          <div v-if="!notifications.length">Brak nowych lekcji</div>
          <div v-for="(n, i) in notifications" :key="i" class="notification">
            <template v-if="role === '[ROLE_TEACHER]'">
              <div>
                <strong>{{ n.sFirstName }} {{ n.sLastName }}</strong> – {{ n.subject }} ({{ n.price }} zł)
              </div>
              <div v-if="!n.tAccepted" class="actions">
                <n-button size="tiny" type="primary" @click="accept(n.lessonId)">Akceptuj</n-button>
                <n-button size="tiny" type="error" @click="reject(n.lessonId)">Odrzuć</n-button>
              </div>
              <div v-else class="actions">
                <span style="color: gray;">Oczekiwanie na akceptację ucznia</span>
              </div>
            </template>

            <template v-else-if="role === '[ROLE_USER]'">
              <div>
                <strong>{{ n.tFirstName }} {{ n.tLastName }}</strong> – {{ n.subject }} ({{ n.price }} zł)
              </div>
              <div v-if="!n.sAccepted" class="actions">
                <n-button size="tiny" type="primary" @click="accept(n.lessonId)">Akceptuj</n-button>
                <n-button size="tiny" type="error" @click="reject(n.lessonId)">Odrzuć</n-button>
              </div>
              <div v-else class="actions">
                <span style="color: gray;">Oczekiwanie na akceptację nauczyciela</span>
              </div>
            </template>
          </div>
        </div>
      </n-popover>

      <n-dropdown :options="dropdownOptions" @select="handleDropdownSelect" >
        <n-avatar round :style="{ color: 'yellow', backgroundColor: 'red' }">M</n-avatar>
      </n-dropdown>

      <span>{{ [userName?.firstName,userName?.lastName].join(" ") }}{{ role === '[ROLE_USER]'? ' (U)' :' (T)' }}</span>


    </div>
  </main>
</template>

<script setup lang="ts">
import { useAuth } from '@/stores/authStore'
import { NButton, NAvatar, NDropdown, NPopover, NBadge, NIcon } from 'naive-ui'
import { Bell } from '@vicons/tabler'
import { useRouter, useRoute } from 'vue-router'
import { onMounted, ref, watch } from 'vue'
import { logout ,setO2AuthRole} from '@/service/authService'
import { getPendingSlots,confirmLessons,declineLessons } from '@/service/lessonsService'
import { getUserName } from '@/service/userService'

// Auth
const { role, logged } = useAuth()

// Routing
const router = useRouter()
const route = useRoute()

// Dropdown
const dropdownOptions = [
  { label: 'Profil', key: 'profile' },
  { label: 'Wyloguj', key: 'logout' }
]

// Routing actions
const goToHome = () => router.push("/")
const goToSignLogin = (page: string) =>
  router.push({ name: 'who-are-you', params: { activePage: page } })
const goToProfile = () => router.push("/profile/start")
const handleDropdownSelect = async (key: string) => {
  if (key === 'profile') goToProfile()
  else if (key === 'logout') {
    await logout()
    goToHome()
  }
}

// Powiadomienia
const notifications = ref<Array<{

  lessonId: number,
  sFirstName: string,
  sLastName: string,
  tFirstName: string,
  tLastName: string,
  subject: string,
  price: number,
  date: string,
  time: string,
  tAccepted: boolean,
  sAccepted: boolean
}>>([])

async function loadNotifications() {
  notifications.value = await getPendingSlots()
}

async function getName(){
  userName.value = await getUserName()
}

async function accept(id: number) {
  console.log('Akceptuj', id)
  await confirmLessons([id])
  notifications.value = notifications.value.filter(n => n.lessonId !== id)
}

async function reject(id: number) {
  console.log('Odrzuć', id)
  await declineLessons([id])
  notifications.value = notifications.value.filter(n => n.lessonId !== id)
}

const userName = ref<{firstName:string,lastName:string}>()

onMounted(async () =>{
  // role.value == '[ROLE_USER]' ? userOptions.value = dropdownOptionsUser : userOptions.value = dropdownOptions
  if(route.query.oauth === 'google') {
   
    await setO2AuthRole()
  }
})

watch(
  () => [logged.value],
  ([logged]) => {
    if (logged) {
        loadNotifications();
        getName();
    }
  },
  { immediate: true }
);
</script>

<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background-color: var(--navbar-color);
  height: var(--navbar-height);
  padding: 0.5rem;
}

img {
  height: 100%;
  cursor: pointer;
}

.login-options {
  display: flex;
  gap: 1rem;
}

.profile {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.bell-wrapper {
  cursor: pointer;
}

.bell-icon {
  font-size: 20px;
  color: white;
}

.notifications {
  min-width: 250px;
  max-height: 300px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.notification {
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
}

.actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.25rem;
}
</style>

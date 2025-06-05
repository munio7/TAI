<template>
  <NCard class="day-calendar">

    <div class="calendar-events">
      <div v-if="!todayEvents.length" style="text-align: center; color: gray;">
        Nie masz dziś zaplanowanych lekcji
      </div>
      <div v-else v-for="(e, i) in todayEvents" :key="i" class="event-item">
        <strong> {{ [e.time.split(":")[0],e.time.split(":")[1]].join(":") }} {{ e.student.firstName }} {{ e.student.lastName }}</strong> – {{ e.subject }} ({{ e.price }} zł) 
      </div>
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NButton } from 'naive-ui'
import { ref, computed, onMounted } from 'vue'

interface Event {
  student: {
    firstName: string
    lastName: string
  }
  date: string
  subject: string
  price: number
  time: string
}

const props = defineProps<{
  events: Event[]
}>()

const currentDate = ref(new Date())

function formatDate(date: Date): string {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date)
  result.setDate(date.getDate() + days)
  return result
}

function prevDay() {
  currentDate.value = addDays(currentDate.value, -1)
}
function nextDay() {
  currentDate.value = addDays(currentDate.value, 1)
}

const todayEvents = computed(() => {
  const today = currentDate.value.toISOString().split('T')[0]
  return props.events.filter(e => e.date === today)
})

</script>

<style scoped>
.day-calendar {
  margin: 0 auto;
  padding: 1rem;
  border-radius: 12px;
  color: white;
  background-color: var(--secondary-color);
  border:none;
  height: 100%;
  max-width: none; 
  overflow-y: scroll;
  margin: none;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.calendar-title {
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
  flex: 1;
  
}
.active{
    color: var(--text-accent-color);
}

.calendar-events {
  overflow-y: scroll;
  scrollbar-width: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-right: 2px;
  width: 100%;
  height: 100%;
}

.calendar-events > *{
  width: 100%;
}


.switch-date{
    color: grey;
}

.event-item {
  background-color: var(--blocks-color);
  padding: 0.5rem;
  color: black;
  border-radius: 6px;
}
</style>

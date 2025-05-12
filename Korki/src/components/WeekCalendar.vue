<template>
  <NCard class="day-calendar">
    <div class="calendar-header">
      <NButton class="switch-date" :focusable="false" text size="small" @click="prevDay">← Prev</NButton>
      <div :class="['calendar-title', {active: currentDate.getDate()==new Date().getDate()}]">{{ formatDate(currentDate) }}</div>
      <NButton class="switch-date" :focusable="false" text size="small" @click="nextDay">Next →</NButton>
    </div>

    <div class="calendar-events">
      <slot :date="currentDate" />
    </div>
  </NCard>
</template>

<script setup lang="ts">
import { NButton, NCard } from 'naive-ui'
import { ref } from 'vue'

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
</style>

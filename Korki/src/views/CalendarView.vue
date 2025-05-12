
<template>
  <main>
    <UserPanelHeader />
    <div style="width: 80%; margin: auto auto;">
      <n-calendar v-model:value="selectedDate">
        <template #default="{ year, month, date }">
          <n-tooltip
            v-if="hasEvents(year, month, date)"
            trigger="hover"
            placement="top"
          >
            <template #trigger>
              <div class="calendar-cell with-event">
                
              </div>
            </template>
            <div v-for="event in getEventsForDateParts(year, month, date)" :key="event.time">
              {{ event.time }} – {{ getStudentName(event.studentId) }}
            </div>
          </n-tooltip>

          <div
            v-else
            class="calendar-cell"
          >
          </div>
        </template>
      </n-calendar>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NCalendar, NTooltip } from 'naive-ui'
import UserPanelHeader from '@/components/UserPanelHeader.vue'

const selectedDate = ref(Date.now())

function formatPartsToISO(year: number, month: number, date: number): string {
  return `${year}-${String(month).padStart(2, '0')}-${String(date).padStart(2, '0')}`
}

function hasEvents(year: number, month: number, date: number): boolean {
  return mockEvents.some(e => e.date === formatPartsToISO(year, month, date))
}

function getEventsForDateParts(year: number, month: number, date: number) {
  return mockEvents.filter(e => e.date === formatPartsToISO(year, month, date))
}

function getStudentName(id: number): string {
  const s = students.find(s => s.id === id)
  return s ? `${s.name} ${s.surname}` : 'Nieznany'
}

const mockEvents = [
  { studentId: 1, date: '2025-05-09', time: '09:00' },
  { studentId: 2, date: '2025-05-09', time: '10:30' },
  { studentId: 3, date: '2025-05-09', time: '14:00' },
  { studentId: 4, date: '2025-05-10', time: '11:00' },
  { studentId: 5, date: '2025-05-10', time: '12:30' },
  { studentId: 6, date: '2025-05-10', time: '15:00' },
  { studentId: 7, date: '2025-05-10', time: '16:30' },
  { studentId: 8, date: '2025-05-11', time: '08:00' },
  { studentId: 1, date: '2025-05-11', time: '09:30' },
  { studentId: 2, date: '2025-05-11', time: '13:00' },
  { studentId: 3, date: '2025-05-11', time: '14:30' },
  { studentId: 4, date: '2025-05-12', time: '10:00' },
  { studentId: 5, date: '2025-05-12', time: '11:30' },
  { studentId: 6, date: '2025-05-12', time: '13:00' },
  { studentId: 7, date: '2025-05-12', time: '14:30' },
  { studentId: 8, date: '2025-05-13', time: '09:00' },
  { studentId: 9, date: '2025-05-13', time: '10:30' },
  { studentId: 10, date: '2025-05-13', time: '13:00' },
  { studentId: 1, date: '2025-05-13', time: '14:30' },
  { studentId: 2, date: '2025-05-13', time: '16:00' }
]

const students = [
    { id: 1, name: 'Anna', surname: 'Kowalska', subject: 'Matematyka', price: 120 },
    { id: 2, name: 'Marek', surname: 'Nowak', subject: 'Angielski', price: 100 },
    { id: 3, name: 'Zofia', surname: 'Wiśniewska', subject: 'Biologia', price: 130 },
    { id: 4, name: 'Kamil', surname: 'Kowalczyk', subject: 'Chemia', price: 140 },
    { id: 5, name: 'Elżbieta', surname: 'Dąbrowska', subject: 'Fizyka', price: 150 },
    { id: 6, name: 'Tomasz', surname: 'Jankowski', subject: 'Polski', price: 90 },
    { id: 7, name: 'Natalia', surname: 'Szymańska', subject: 'Historia', price: 110 },
    { id: 8, name: 'Piotr', surname: 'Wójcik', subject: 'Geografia', price: 95 },
    { id: 9, name: 'Karolina', surname: 'Zielińska', subject: 'Informatyka', price: 160 },
    { id: 10, name: 'Paweł', surname: 'Lewandowski', subject: 'Anatomia', price: 180 },
]
</script>

<style scoped>
main{
  height: calc(100% - var(--navbar-height));
  display: flex;
  flex-direction: column;
}
:deep(.n-calendar *)
{
  color: white !important;
}
.calendar-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2px;
  min-height: 40px;
}

.with-event {
  background-color: #fff0f0;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}

.with-event:hover {
  background-color: #ffe0e0;
  cursor: pointer;
}
</style>

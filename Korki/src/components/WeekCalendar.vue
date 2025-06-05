<template>
  <div class="week-calendar">
    <div class="calendar-header">
      <n-button :disabled="isDisabled" text size="small" @click="prevWeek">← Poprzedni</n-button>
      <div class="week-title">{{ formatRange(currentStart) }}</div>
      <n-button text size="small" @click="nextWeek">Następny →</n-button>
    </div>

    <div class="week-grid">
      <div v-for="(day, index) in 7" :key="index" class="day-column">
        <div :class="['day-label', { today: isToday(dayDate(index)) }]">
          {{ formatDate(dayDate(index)) }}
        </div>

        <div class="day-slots">
          <n-card
            v-for="(slot, i) in getSlotsForDate(dayDate(index))"
            @click="() => emit('slot-clicked', slot.Id)"
            :key="slot.Id"
            size="small"
            class="slot-card"
          >
            <div>{{ slot.time.slice(0, 5) }}</div>
            <div class="slot-state">{{ slot.state }}</div>
          </n-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { NButton, NCard } from 'naive-ui'

const emit = defineEmits<{
  (e: 'slot-clicked', slotId: number): void
}>()

interface LessonSlot {
  Id: number
  date: string;        // Format: 'YYYY-MM-DD' (ISO local date)
  time: string;        // Format: 'HH:mm:ss' (ISO local time)
  state: 'AVAILABLE' | 'BOOKED' | 'COMPLETED' | 'MISSED' | 'CANCELLED' | 'PENDING' | string; // use enum if defined
  student: Student
}

interface Student{
  id: string,
  firstName: string,
  lastName: string,
  role: string
}

const props = defineProps<{
  lessonSlots: LessonSlot[]
  subjects:any
}>()

const currentStart = ref(new Date())
const isDisabled = computed(() => {
  const today = new Date()
  const start = new Date(currentStart.value)
  start.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  return start <= today
})

function dayDate(offset: number): string {
  const d = new Date(currentStart.value)
  d.setDate(currentStart.value.getDate() + offset)
  return d.toISOString().slice(0, 10) // 'YYYY-MM-DD'
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })
}

function formatRange(start: Date): string {
  const end = new Date(start)
  end.setDate(start.getDate() + 6)
  return `${start.toLocaleDateString()} – ${end.toLocaleDateString()}`
}

function isToday(dateStr: string): boolean {
  const today = new Date().toISOString().slice(0, 10)
  return dateStr === today
}

function getSlotsForDate(dateStr: string): LessonSlot[] {
  return props.lessonSlots.filter(slot => slot.date === dateStr)
}

function prevWeek() {
  currentStart.value.setDate(currentStart.value.getDate() - 7)
  currentStart.value = new Date(currentStart.value)
}

function nextWeek() {
  currentStart.value.setDate(currentStart.value.getDate() + 7)
  currentStart.value = new Date(currentStart.value)
}


</script>

<style scoped>
.week-calendar {
  padding: 1rem;
  background-color: var(--secondary-color);
  color: white;
}
.calendar-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.week-grid {
  display: flex;
  gap: 1rem;
}
.day-column {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #333;
  padding: 0.5rem;
  border-radius: 8px;
}
.day-label {
  text-align: center;
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.today {
  color: var(--text-accent-color);
}
.day-slots {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 300px;
  overflow: scroll;
  scrollbar-width: none;
}
.slot-card {
  background-color: #444;
  color: white;
  padding: 0.3rem;
  font-size: 0.85rem;
}
.slot-state {
  font-size: 0.75rem;
  color: gray;
}
</style>

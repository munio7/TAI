<template>
  <main>
    <UserPanelHeader />
    <div class="page">
      <div class="custom-calendar">
        <div class="calendar-header">
          <button class="month-btn" @click="prevMonth">&lt;</button>
          <span class="month-label">{{ monthNames[currentMonth] }} {{ currentYear }}</span>
          <button class="month-btn" @click="nextMonth">&gt;</button>
        </div>
        <div class="calendar-grid">
          <div v-for="day in weekDays" :key="day" class="day-header">{{ day }}</div>
          <div v-for="cell in calendarCells" :key="cell.dateKey"
            :class="['calendar-cell', { 'with-event': cell.hasEvent, 'today': cell.isToday, 'selected':cell.dateStr==selectedDate }]"
            @click="cell.dateStr && selectDate(cell.dateStr)">
            {{ cell.dateStr ? cell.dateStr.split('-')[2] : '' }}
          </div>
        </div>
      </div>

      <div class="events-container">
        <h3>Wydarzenia dla {{ new Date(selectedDate).toLocaleDateString('pl-PL') }}</h3>
        <div v-if="eventsForSelectedDate.length" class="event-list">
          <div v-for="event in eventsForSelectedDate" :key="event.time" class="event-item">
            <strong> {{ [event.time.split(":")[0], event.time.split(":")[1]].join(":") }} {{ event.student.firstName }}
              {{ event.student.lastName }}</strong> {{ event.subject }} ({{ event.price }} zł)
          </div>
        </div>
        <div v-else class="no-events">Brak zaplanowanych wydarzeń.</div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import UserPanelHeader from '@/components/UserPanelHeader.vue'
import { getAllSlots } from '@/service/lessonsService'
import { getMe } from '@/service/teacherService'

const today = new Date().toISOString().split('T')[0]
const selectedDate = ref<string>(today)
const currentDate = new Date()
const currentMonth = ref(currentDate.getMonth())
const currentYear = ref(currentDate.getFullYear())

const monthNames = [
  'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
]
const weekDays = ['Pn', 'Wt', 'Sr', 'Cz', 'Pt', 'Sb', 'Nd']

function isSameDate(d1: Date, d2: Date): boolean {
  return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate()
}

function formatDateKey(date: Date): string {
  return new Date(date).toISOString().split('T')[0]
}

function selectDate(dateStr: string) {
  selectedDate.value = dateStr
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}


const calendarCells = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1)
  const firstWeekDay = (firstDay.getDay() + 6) % 7
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()

  const cells = []

  for (let i = 0; i < firstWeekDay; i++) {
    cells.push({ dateStr: '', dateKey: 'empty-' + i, hasEvent: false, isToday: false })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear.value, currentMonth.value, day)
    const dateStr = date.toISOString().split('T')[0]

    cells.push({
      dateStr,
      dateKey: dateStr,
      hasEvent: events.value.some(e => e.date === dateStr),
      isToday: dateStr === today
    })
  }

  return cells
})

const eventsForSelectedDate = computed(() => {
  const iso = formatDateKey(new Date(selectedDate.value))
  return events.value.filter(e => e.date === iso)
})

interface Event {
  student: {
    firstName: string
    lastName: string
  }
  date: string
  subject: string
  price: number
  time: string
  state: string
}
const events = ref<Array<Event>>([])


onMounted(async () => {
  const me = await getMe()
  const teacherId = me?.teacher?.user?.id
  if (teacherId) {
    const allevents = await getAllSlots(teacherId)
    events.value = allevents.filter((e: Event) => e.state == "BOOKED" || e.state == "COMPLETED")
    console.log(events.value)
  }
}
)

</script>

<style scoped>
.page {
  width: 80%;
  margin: auto;
  color: white;
}

.custom-calendar {
  margin: 1rem 0;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.2rem;
}

.day-header {
  text-align: center;
  font-weight: bold;
}

.calendar-cell {
  padding: 10px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 1px solid transparent;
}
.calendar-cell:hover{
  background-color: rgba(255, 255, 255, 0.1);
}

.calendar-cell.today {
  border: 1px solid #ffd700;
}

.calendar-cell.with-event {
  background-color: rgba(255, 215, 0, 0.15);
}

.calendar-cell.with-event:hover {
  background-color: rgba(255, 215, 0, 0.25);
}

.events-container {
  margin-top: 2rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid white;
}

.event-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.event-item {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.event-item:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.event-time {
  font-weight: bold;
  color: #ffd700;
}

.event-student {
  color: white;
}

.no-events {
  text-align: center;
  padding: 1rem;
  color: #ccc;
  font-style: italic;
}

.month-btn {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid white;
  border-radius: 6px;
  padding: 4px 12px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.month-btn:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

.selected{
  border:   1px solid rgba(255, 215, 0, 0.25);
  transition: all 0.2;
}

.month-label {
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
}
</style>
<template>
    <main>
        <UserPanelHeader />
        <div class="facts">
            <UserPanelBlockInfo class="fact" :svgPath="getSvgPath('student')" :number='lessonNumber!' title="Lekcji" />
            <UserPanelBlockInfo class="fact" :svgPath="getSvgPath('review')" :number="ratingsCount!" title="Opinie" />
            <UserPanelBlockInfo class="fact" :svgPath="getSvgPath('money')" :number="moneyEarned! + 'zł'" title="Zarobków" />
        </div>

        <div class="container">
            <!-- <div class="students-section block info">
                <h1>Uczniowie</h1>
                <div class="students-precise">
                    <NCard v-for="student in students" :key="student.id" class="student">
                        <template #default>
                            <StudentBlock :id="Number(student.id)" :svgPath="getSvgPath('profile')" :name="student.name"
                                :surname="student.surname" :subject="student.subject" :price="Number(student.price)" />
                        </template>
                    </NCard>
                </div>
            </div> -->
            <div class="late-payments block info">
                <h1>Płatności</h1>
                <div class="payments-list">

                    <NCard v-for="(payment, index) in allPayments" :key="index" class="payment">
                        <template #default>
                            <div class="payment-item">
                                <strong>{{ payment?.firstName }} {{ payment?.lastName }}</strong><br />
                                <span>{{ payment?.date }} o {{ payment?.time }}</span><br />
                                <span>{{ payment?.subject }} – {{ payment?.price }} zł</span>
                            </div>
                        </template>
                    </NCard>
                </div>
            </div>

            <div class="late-payments lessons block info">
                <h1>Dzisiejsze lekcje</h1>
                <DayCalendar :events="allTodaysLessons"></DayCalendar>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { computed, onMounted, ref,watch } from 'vue'
import UserPanelHeader from '@/components/UserPanelHeader.vue'
import UserPanelBlockInfo from '@/components/UserPanelBlockInfo.vue'
import { NCalendar, NCard, NTag } from 'naive-ui'
import DayCalendar from '@/components/DayCalendar.vue'
import StudentBlock from '@/components/StudentBlock.vue'
import { getMe } from '@/service/teacherService'

const getSvgPath = (filename: string) => {
    return new URL(`../assets/${filename}.svg`, import.meta.url).href
}
const students = ref([])

const upcomingPayments = ref([])

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

interface Payment {
    firstName: string
    lastName: string
    date: string
    time: string
    subject: string
    price: number
}

// interface PinnedStudent{
//     id: string
//     firstName: string
//     lastName: string

// }


const allTodaysLessons = ref<Array<Event>>([])
const myData = ref(null)

const lessonNumber = ref(null)
const ratingsCount = ref(null)
const moneyEarned = ref(null)

const allPayments = ref<Array<Payment>>([])
async function getMyData() {
    myData.value = await getMe()
}

function getAllTodaysLessons() {
    allTodaysLessons.value = myData.value.todayLessons
}
function getAllPayments() {
    const payments = myData.value.recentPayments
    allPayments.value = payments.map((p: any) => ({
        firstName: p.user.firstName,
        lastName: p.user.lastName,
        date: p.payment.date.split("T")[0],
        time: [p.payment.lesson.time.split(":")[0],p.payment.lesson.time.split(":")[1]].join(":"),
        subject: p.payment.lesson.subject.name,
        price: p.payment.lesson.price
    }))
}

function setInfoBlocks(){
    lessonNumber.value = myData.value.lessonsCount
    ratingsCount.value = myData.value.ratingCount
    moneyEarned.value = myData.value.moneyAmount

}


watch(myData, (newData) => {
  if (newData) {
    getAllTodaysLessons()
    getAllPayments()
    setInfoBlocks()
    students.value = newData.pinnedStudents || []
  }
}, { immediate: true })




onMounted(async () => await getMyData())
</script>



<style scoped>
main {
    height: calc(100% - var(--navbar-height));
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}


.facts {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    max-height: 100px;
}

.container {
    display: flex;
    gap: 3rem;
    width: 80%;
    height: 70%;

}

.late-payments {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    overflow-y: auto;

}

.payments-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding: 1rem;
}

.payment {
    background-color: var(--blocks-color);
    color: black;
    border-radius: 10px;
    border: none;
}

.payment-item {
    display: flex;
    flex-direction: column;
}


.students-section {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: hidden;
    /* max-height: 50%; */
}



.students-precise {
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    gap: 1rem;
    padding: 0 0.5rem;

}

.lessons {
    display: flex;

}

h1 {
    color: white;
    border-bottom: 1px solid white;
}

.student {
    min-width: fit-content;
    border: none;
    color: white;
    background-color: var(--blocks-color);
    border-radius: 10px;
    width: 100%;
}

.fact {
    border-radius: 10px;
    padding: 1rem;
    border: 1px solid transparent;
    transition: border 0.3s;
}

.info {
    border-radius: 10px;
}

.block {
    flex: 1;
    background-color: var(--secondary-color);
}

.event {
    height: 100px;
    font-size: 1rem;
}
</style>

<template>
  <div class="profile-wrapper">
    <n-card class="profile-card" bordered>
      <div class="profile-header">
        <n-avatar round :size="80" :src="avatar" class="profile-avatar" />

        <div class="profile-info">
          <h2>{{ firstName }} {{ lastName }}</h2>
          <h3>Lokalizacje</h3>
          <div>
            <p class="location-line">
              {{localLocations.length ? localLocations.map(loc => loc.town + (!!loc.district ? ' (' + loc.district + ')'
                : "")).join(', ') : 'Nie dodano lokalizacji.'}}
            </p>
          </div>
          <div v-if="editMode">
            <n-button :focusable="false" size="small" @click="showLocationModal = true">+ Dodaj lokalizację</n-button>
            <n-modal v-model:show="showLocationModal" title="Dodaj lokalizację" preset="dialog">
              <n-form>
                <n-form-item label="Miasto">
                  <n-input v-model:value="newTown" placeholder="Podaj miasto" />
                </n-form-item>
                <n-form-item label="Dzielnica">
                  <n-input v-model:value="newDistrict" placeholder="Podaj dzielnicę (opcjonalnie)" />
                </n-form-item>
              </n-form>

              <template #action>
                <n-button @click="handleAddLocation">Dodaj</n-button>
                <n-button @click="showLocationModal = false">Anuluj</n-button>
              </template>
            </n-modal>
          </div>

          <h3>Przedmioty</h3>
          <div class="location-line">
            <ul v-if="localSubjects.length">
              <li v-for="s in localSubjects" :key="s.subjectId">
                {{ s.name }} – {{ s.price }} zł/h
              </li>
            </ul>
            <p v-else style="color: #aaa;">Nie dodano przedmiotów.</p>
          </div>

          <div v-if="editMode">
            <n-button :focusable="false" size="small" @click="showSubjectModal = true">+ Dodaj przedmiot</n-button>

            <n-modal v-model:show="showSubjectModal" title="Dodaj przedmiot" preset="dialog">
              <n-form>
                <n-form-item label="Przedmiot">
                  <n-select v-model:value="selectedSubjectId" :options="subjectOptions" label-field="name"
                    value-field="id" placeholder="Wybierz przedmiot" />
                </n-form-item>


                <n-form-item label="Cena za godzinę">
                  <n-input-number v-model:value="subjectPrice" min="1" placeholder="Cena" />
                </n-form-item>
              </n-form>

              <template #action>
                <n-button @click="handleAddSubject">Dodaj</n-button>
                <n-button @click="showSubjectModal = false">Anuluj</n-button>
              </template>
            </n-modal>

          </div>

          <div class="stars">
            <span>({{ reviews.length }})</span>
            <n-rate :value="averageRating" readonly size="small" allow-half />
          </div>
        </div>

        <n-button v-if="myProfile" class="edit-button" color="white" quaternary size="small" @click="toggleEdit">
          {{ editMode ? 'Zapisz' : 'Uzupełnij profil' }}
        </n-button>
      </div>

      <n-divider />

      <div class="profile-description">
        <h3>O mnie</h3>
        <div v-if="!editMode">
          <p>{{ localDescription == "" ? "Brak opisu" : localDescription }}</p>
        </div>
        <div v-else>
          <n-input type="textarea" v-model:value="localDescription" placeholder="Opisz swoje doświadcznie..."
            :autosize="{ minRows: 3, maxRows: 6 }" />
        </div>
      </div>

      <n-divider />
      <div v-if="editMode">
        <n-button size="small" @click="showSlotModal = true">+ Dodaj slot lekcji</n-button>

        <n-modal v-model:show="showSlotModal" title="Dodaj dostępny termin" preset="dialog">
          <n-form>
            <n-form-item label="Data">
              <n-date-picker v-model:value="newSlotDate" type="date" />
            </n-form-item>
            <n-form-item label="Godzina">
              <n-time-picker v-model:value="newSlotTime" format="HH:mm" value-format="HH:mm" />
              <n-button size="tiny" @click="addTime">Dodaj godzinę</n-button>
            </n-form-item>
            <n-form-item label="Godziny dodane">
              <div class="time-list">
                <n-card closable @close="handleCloseTime" v-for="(time, index) in timeList" :key="index" size="small"
                  class="time-card" :title="`Godzina ${index + 1}`">
                  <p>{{ time }}</p>
                </n-card>
              </div>
            </n-form-item>
          </n-form>
          <template #action>
            <n-button @click="submitSlot">Zapisz slot</n-button>
            <n-button @click="showSlotModal = false">Anuluj</n-button>
          </template>
        </n-modal>
      </div>


      <WeekCalendar :lesson-slots="setLessonSlots" :subjects="props.subjects" @slot-clicked="handleSlotClick" />

      <n-modal v-model:show="showAssignSubjectModal" title="Przypisz przedmiot do slotu" preset="dialog">
        <n-form>
          <n-form-item label="Przedmiot">
            <n-select v-model:value="selectedAssignmentSubjectId" :options="localSubjects.map(s => ({
              label: `${s.name} – ${s.price} zł/h`,
              value: s.subjectId
            }))" placeholder="Wybierz przedmiot" />
          </n-form-item>
        </n-form>

        <template #action>
          <n-button @click="confirmSubjectAssignment" :disabled="!selectedAssignmentSubjectId">Przypisz</n-button>
          <n-button @click="showAssignSubjectModal = false">Anuluj</n-button>
        </template>
      </n-modal>

      <n-button v-if="!myProfile" size="small" @click="showReviewModal = true" style="margin-bottom: 1rem;">
        + Dodaj opinię
      </n-button>

      <n-modal v-model:show="showReviewModal" title="Dodaj opinię" preset="dialog">
        <n-form>
          <n-form-item label="Ocena">
            <n-rate v-model:value="newReviewRating" allow-half />
          </n-form-item>
          <n-form-item label="Opinia">
            <n-input type="textarea" v-model:value="newReviewContent" placeholder="Twoja opinia..."
              :autosize="{ minRows: 3, maxRows: 6 }" />
          </n-form-item>
        </n-form>
        <template #action>
          <n-button @click="submitReview" :disabled="!newReviewRating || !newReviewContent.trim()">Dodaj</n-button>
          <n-button @click="showReviewModal = false">Anuluj</n-button>
        </template>
      </n-modal>

      <div class="profile-reviews">
        <h3>Opinie</h3>
        <div v-if="reviews.length" class="review-list">
          <n-card v-for="(review, index) in reviews" :key="index" size="small" class="review-card"
            :segmented="true">
            <strong style="color: white;">{{ [review.user.firstName,review.user.lastName].join(' ') }}</strong>
            <n-rate :value="review.value" readonly size="small" allow-half />
            <p style="color: white; margin-top: 0.5rem;">{{ review.content }}</p>
          </n-card>
        </div>
        <p v-else style="color: #aaa;">Brak opinii.</p>
      </div>


    </n-card>
  </div>
</template>

<script setup lang="ts">
import {
  NAvatar,
  NCard,
  NDivider,
  NRate,
  NButton,
  NInput,
  NModal,
  NSelect,
  NInputNumber,
  NForm,
  NFormItem,
  NDatePicker,
  NTimePicker,
  idID
} from 'naive-ui'
import { ref, computed, watch, onMounted } from 'vue'
import { fetchSubjects } from '@/service/teacherService.ts'
import { addSlots, getAllSlots, bookSlot } from '@/service/lessonsService'
import { getMe } from '@/service/teacherService.ts'
import { addReview } from '@/service/reviewsService'

const myProfile = ref(false)

interface TeacherDetailsDto {
  description: string;
  subjects: SubjectListDto[];
  locations: LocationDto[];
}

const editTeacherDto = ref<TeacherDetailsDto>()

interface SubjectListDto {
  subjectId: number;
  maturaR: boolean;
  schoolPrices: SchoolPriceDto[];
}

interface SchoolPriceDto {
  schoolId: number;
  price: number;
}

interface LocationDto {
  town: string;
  district: string | null;
}

interface Review {
  id: number
  value: number
  content: string
  user: { id: number, firstName: string, lastName: string }
  teacher: { id: number, username: string, role: string }
}
interface LessonSlot {
  id: number
  date: string;        // Format: 'YYYY-MM-DD' (ISO local date)
  time: string;        // Format: 'HH:mm:ss' (ISO local time)
  state: 'AVAILABLE' | 'BOOKED' | 'COMPLETED' | 'MISSED' | 'CANCELLED' | 'PENDING' | string; // use enum if defined
  student: Student
}
const setLessonSlots = ref<LessonSlot[]>([])

interface SubjectWithPrice {
  subjectId: number
  name: string
  price: number
}

interface Student {
  id: string,
  firstName: string,
  lastName: string,
  role: string
}
interface SubjectOption {
  id: number
  name: string
}
const subjectOptions = ref<SubjectOption[]>([])

const props = defineProps<{
  id: string
  firstName: string
  lastName: string
  avatar: string
  subjects: SubjectWithPrice[]
  locations: LocationDto[]
  description: string
  reviews: Review[]
}>()



const editMode = ref(false)
const localDescription = ref(props.description)
const localSubjects = ref([...props.subjects])
const localLocations = ref([...props.locations])

watch(() => props.description, val => (localDescription.value = val))
watch(() => props.subjects, val => (localSubjects.value = [...val]))
watch(() => props.locations, val => (localLocations.value = [...val]))


import { updateTeacherDetails } from '@/service/teacherService';
import WeekCalendar from './WeekCalendar.vue';
const toggleEdit = async () => {
  if (editMode.value) {
    try {
      await updateTeacherDetails({
        description: localDescription.value,
        subjects: localSubjects.value.map((s) => ({
          subjectId: s.subjectId,
          maturaR: false,
          schoolPrices: [
            {
              schoolId: 1,
              price: s.price
            }
          ]
        })),
        locations: localLocations.value.map(loc => ({ town: loc.town, district: loc.district }))
      });
    } catch (error) {
      console.error('Błąd podczas zapisu:', error);
      alert('Nie udało się zapisać danych.');
      return;
    }
  }

  editMode.value = !editMode.value;
};

const showAssignSubjectModal = ref(false)
const slotToAssign = ref<number | null>(null)
const selectedAssignmentSubjectId = ref<number | null>(null)

function handleSlotClick(slotId: number) {
  slotToAssign.value = slotId
  selectedAssignmentSubjectId.value = null
  showAssignSubjectModal.value = true
}

async function confirmSubjectAssignment() {
  console.log("probuje: " + slotToAssign.value + selectedAssignmentSubjectId.value)
  if (slotToAssign.value != null && selectedAssignmentSubjectId.value != null) {
    try {
      await bookSlot({
        mode: "REMOTE",
        userID: myProfile ? null : props.id,
        subjectID: selectedAssignmentSubjectId.value,
        schoolID: 1,
        slotIDs: [slotToAssign.value]
      })

      showAssignSubjectModal.value = false
      slotToAssign.value = null
      selectedAssignmentSubjectId.value = null

      setLessonSlots.value = await getAllSlots(props.id)
    } catch (err) {
      console.error('Błąd podczas przypisywania przedmiotu do slotu:', err)
      alert('Nie udało się przypisać przedmiotu.')
    }
  }
}



function handleAddSubject() {
  if (selectedSubjectId.value == null || subjectPrice.value == null) return

  const subject = subjectOptions.value.find(s => s.id === selectedSubjectId.value)
  if (!subject) return

  const alreadyExists = localSubjects.value.find(s => s.subjectId === subject.id)
  if (alreadyExists) {
    alert('Ten przedmiot został już dodany.')
    return
  }

  localSubjects.value.push({
    subjectId: subject.id,
    name: subject.name,
    price: subjectPrice.value
  })

  selectedSubjectId.value = null
  subjectPrice.value = null
  showSubjectModal.value = false
}


const averageRating = computed(() => {
  if (!props.reviews.length) return 0
  const total = props.reviews.reduce((acc, r) => acc + r.value, 0)
  return total / props.reviews.length
})

const showLocationModal = ref(false);
const newTown = ref('');
const newDistrict = ref<string | null>(null);

function handleAddLocation() {
  const trimmedTown = newTown.value.trim();
  if (!trimmedTown) {
    alert('Miasto jest wymagane.');
    return;
  }
  const trimmedDistict = newDistrict.value != null ? newDistrict.value.trim() : null

  const label: LocationDto = { town: trimmedTown, district: trimmedDistict }

  if (localLocations.value.includes(label)) {
    alert('Taka lokalizacja już istnieje.');
    return;
  }

  localLocations.value.push(label);

  newTown.value = '';
  newDistrict.value = null;
  showLocationModal.value = false;
}


const showSubjectModal = ref(false)
const selectedSubjectId = ref<number | null>(null)
const subjectPrice = ref<number | null>(null)




const showSlotModal = ref(false)
const newSlotDate = ref<number>(Date.now())
const newSlotTime = ref<number>(Date.now())
const timeList = ref<string[]>([])

function addTime() {
  const time = new Date(newSlotTime.value).toTimeString().split(' ')[0]
  if (!newSlotTime.value || timeList.value.includes(time)) return
  timeList.value.push(time)
  newSlotTime.value = Date.now()
}

async function submitSlot() {
  console.log("Selected timestamp:", newSlotDate.value)
  console.log("Formatted date:", new Date(newSlotDate.value).toISOString().split("T")[0])
  if (newSlotDate.value == Date.now() || timeList.value.length === 0) {
    alert('Podaj datę i przynajmniej jedną godzinę')
    return
  }
  const lessonSlotDto = {
    date: new Date(newSlotDate.value).toISOString().split("T")[0],
    timeList: timeList.value
  }

  await addSlots(Array(lessonSlotDto))

  // Reset modal
  newSlotDate.value = Date.now()
  newSlotTime.value = Date.now()
  timeList.value = []
  showSlotModal.value = false

  setLessonSlots.value = await getAllSlots(props.id)

}

function handleCloseTime(index: number) {
  timeList.value.splice(index, 1)
}

const showReviewModal = ref(false)
const newReviewRating = ref<number | null>(null)
const newReviewContent = ref('')

// Replace this with actual API call later
async function submitReview() {
  if (!newReviewRating.value || newReviewContent.value.trim() === '') {
    alert('Podaj ocenę i treść opinii.')
    return
  }
  addReview({
    rate: newReviewRating.value,
    teacherId: props.id,
    content: newReviewContent.value
  })
  // TODO: Send to backend
  console.log("Submitting review:", {
    rating: newReviewRating.value,
    content: newReviewContent.value
  })

  // Reset
  showReviewModal.value = false
  newReviewRating.value = null
  newReviewContent.value = ''

  // Optionally refresh review list
}


onMounted(async () => {
  subjectOptions.value = await fetchSubjects()
  setLessonSlots.value = await getAllSlots(props.id)
  console.log(setLessonSlots.value)
  const me = await getMe()
  const myId: string = me.teacher.user.id
  myProfile.value = (myId === props.id)
})

</script>

<style scoped>
.profile-wrapper {
  flex: 1;
  max-width: 1200px;
  margin: auto;
  box-sizing: border-box;
}

.profile-card {
  background-color: #2c2c3e;
  color: white;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 16px;
}

.profile-info h2 {
  margin: 0;
}

.edit-button {
  color: var(--text-accent-color);
  margin-left: auto;
  margin-bottom: auto;
}

.location-line {
  color: #aaa;
  margin-top: 4px;
}

.review-count {
  color: #888;
  font-size: 0.85em;
}

.profile-description,
.profile-reviews {
  margin-top: 20px;
}

::v-deep(.n-timeline-item-content__title) {
  color: #17dbe9 !important;
  font-weight: bold;
}

:deep(.n-form-item-label, .n-form-item-feedback-wrapper) {
  color: white
}

:deep(.n-button) {
  color: white
}

.stars {
  display: flex;
  align-items: center;
  column-gap: 4px;
}

:deep(.n-card){
  background-color: transparent !important;
}
</style>
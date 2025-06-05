<template>
  <main>
    <div class="form">
      <div class="header">
        <h1 @click="handleChangeHeader('login')" :class="login ? 'focused' : ''">Zaloguj</h1>
        <h1 @click="handleChangeHeader('signup')" :class="signup ? 'focused' : ''">Zarejestruj</h1>
      </div>

      <n-form ref="formRef" :model="formValue" :rules="formRules">
        <n-form-item path="email">
          <n-input v-model:value="formValue.email" placeholder="Email" clearable />
        </n-form-item>

        <n-form-item path="password">
          <n-input v-model:value="formValue.password" placeholder="Hasło" type="password" clearable />
        </n-form-item>

        <template v-if="signup">
          <n-form-item path="role" label="Rejestruję się jako">
            <n-radio-group v-model:value="formValue.role">
              <n-radio-button value="user">Student</n-radio-button>
              <n-radio-button value="teacher">Teacher</n-radio-button>
            </n-radio-group>
          </n-form-item>

          <n-form-item path="username">
            <n-input v-model:value="formValue.username" placeholder="Nazwa użytkownika" />
          </n-form-item>

          <n-form-item path="firstName">
            <n-input v-model:value="formValue.firstName" placeholder="Imię" />
          </n-form-item>

          <n-form-item path="lastName">
            <n-input v-model:value="formValue.lastName" placeholder="Nazwisko" />
          </n-form-item>
        </template>
      </n-form>

      <div class="under-buttons">
        <n-button @click="handleSubmit">Dalej</n-button>
        <div class="divider">LUB</div>
        <div  @click="handleGoogleClick" class="google">
          <NIcon size="large" color="#FFFFFF"><LogoGoogle /></NIcon>
          <span>oogle</span>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { NForm, NFormItem, NInput, NButton, NCheckbox,NIcon, NRadioGroup, NRadioButton, NDatePicker, type FormInst } from 'naive-ui'
import { LogoGoogle } from '@vicons/ionicons5'
import { registerUser ,loginUser,setO2AuthRole} from '@/service/authService'
import { useAuth } from '@/stores/authStore'

const router = useRouter()
const route = useRoute()

const login = computed(() => route.params.activePage === 'login')
const signup = computed(() => route.params.activePage === 'signup')

const formRef = ref<FormInst | null>(null)
const rememberMe = ref(false)

const formValue = ref({
  email: '',
  password: '',
  role: '',
  username: '',
  firstName: '',
  lastName: ''
})

const formRules = computed(() => {
  const base = {
    email: [
      { required: true, message: 'Email jest wymagany', trigger: 'blur' },
      { type: 'email' as const, message: 'Nieprawidłowy adres email', trigger: 'blur' }
    ],
    password: [
      { required: true, message: 'Hasło jest wymagane', trigger: 'blur' },
      {
        validator: (_ :any, value: string) => {
          const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
          if (!regex.test(value)) {
            return new Error('Min. 8 znaków, duża litera, mała litera, cyfra')
          }
          return true
        },
        trigger: 'blur'
      }
    ]
  }

  if (signup.value) {
    return {
      ...base,
      role: [{ required: true, message: 'Wybierz rolę', trigger: 'blur' }],
      username: [{ required: true, message: 'Podaj nazwę użytkownika', trigger: 'blur' }],
      firstName: [{ required: true, message: 'Imię jest wymagane', trigger: 'blur' }],
      lastName: [{ required: true, message: 'Nazwisko jest wymagane', trigger: 'blur' }],
      birthDate: [{ required: true, type: 'date', message: 'Wybierz datę urodzenia', trigger: 'change' }]
    }
  }

  return base
})

function handleChangeHeader(key: string) {
  router.push({ name: 'who-are-you', params: { activePage: key } })

  formValue.value = {
    email: '',
    password: '',
    role: '',
    username: '',
    firstName: '',
    lastName: '',
  }
  rememberMe.value = false
}

async function handleSubmit() {
  formRef.value?.validate(async (errors) => {
    if (!errors) {
      if (login.value) {
        try {
          await loginUser({email: formValue.value.email, password: formValue.value.password})
          console.log('Logowanie:', formValue.value)
          router.push("/catalog")
        } catch (error: any) {
          alert("Błędne hasło lub email!")
        }

      } else {
        await registerUser(formValue.value)
        console.log('Rejestracja:', formValue.value)
      }
    } else {
      console.warn('Błędy walidacji:', errors)
    }
  })
}

async function handleGoogleClick() {
  if(formValue.value.role == '' && signup.value) {
    console.log("rola: " + formValue.value.role + ", signup: " + signup.value)
    alert("Wybierz role!")
    return
  }
  const { setTempRole } = useAuth();
  setTempRole(formValue.value.role);
  console.log("ustawiam role")
  window.location.href = 'http://localhost:8080/oauth2/authorization/google'
}

</script>
<style scoped>

:deep(*){
  --n-font-size: .9rem !important; 
  --n-text-color-hover: rgb(224, 224, 230) !important;
  --n-text-color-pressed: rgb(224, 224, 230) !important;
  --n-text-color-focus: rgb(224, 224, 230) !important;
  --n-text-color-disabled: rgb(51, 54, 57) !important;
  --n-border: 0px solid rgb(224, 224, 230) !important;
  --n-border-hover: 1px solid rgb(224, 224, 230) !important;
  --n-border-pressed: 1px solid rgb(224, 224, 230) !important;
  --n-border-focus: 1px solid rgb(224, 224, 230) !important;
  --n-border-disabled: 1px solid rgb(224, 224, 230) !important;
  --n-ripple-color: rgb(224, 224, 230) !important;
  --n-color-checked: transparent !important;
  --n-text-color:rgb(224, 224, 230) !important;
  --n-border-checked: 1px solid rgb(224, 224, 230) !important;
  --n-border-focus: 1px solid rgb(224, 224, 230) !important;
  --n-color-focus: transparent !important;
  --n-color-focus-error: transparent !important;
}

main{
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - var(--navbar-height));
}
.header{
  display: flex;
  justify-content: space-between;
  margin: 1rem 0;

}

.header > h1{
 flex: 1;
 transition: border-bottom 0.5s ease, color 0.5s ease;
 border-bottom: 2px solid transparent;
 cursor: pointer;
}

.focused{
  border-bottom: 2px solid #359DFF !important;
  color: white;
}

h1{
  display: inline;
  margin: 0px;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.2rem;
  color: grey;
  font-weight:300;
  margin: 0;
}

.form{
  /* min-width: fit-content;
  width: 300px; */
  width: clamp(200px,50vw,300px);
  height: fit-content;
  border-radius: 0.5rem;
  background-color: var(--secondary-color);
  padding: 2rem;
  padding-top:0;

}

:deep(.n-form){
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

.under-buttons{
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.google{
  display: flex;
  color: white;
  cursor: pointer;
}

:deep(.n-checkbox-box){
  --n-size: 1rem;
  background-color: var(--secondary-color);
  border: 1px solid rgb(224, 224, 230) !important;
  --n-box-shadow-focus: 0 0 0 2px transparent;
  
}


.divider {
  width: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  font-weight: lighter;
  font-size: 0.7rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
  margin: 0 5px;
}

:deep(.forgot-password *) {
  color: #359DFF !important;
  font-weight: normal;
}
:deep(.n-button){
  border: 1px solid white;
  border-radius: 10px;
  color: white;
  font-weight: bold;
}
:deep(.n-input){
  background-color: transparent;
  border: 1px dotted white;
}
:deep(.n-form-item-label__text){
  color: white;
  font-weight: bold;
}

:deep(.n-form-item){
  display: block;
  width: 100%;
  margin-bottom: .5rem;
}
:deep(div.n-form-item-feedback-wrapper){
  --n-feedback-height: 12px;
}

:deep(.n-radio-button){
  --n-button-border-color-active: var(--text-accent-color);
  --n-button-border-radius: 3px;
  --n-button-box-shadow: inset 0 0 0 1px #0000;
  --n-button-box-shadow-focus: inset 0 0 0 1px var(--text-accent-color), 0 0 0 2px rgba(24, 160, 88, 0.3);
  --n-button-box-shadow-hover: inset 0 0 0 1px #0000;
  --n-button-color: transparent;
  --n-button-color-active: #FFF;
  --n-button-text-color: white;
  --n-button-text-color-hover: var(--text-accent-color);
  --n-button-text-color-active: var(--text-accent-color);
  --n-height: 34px;
  --n-opacity-disabled: 0.5;
}

</style>
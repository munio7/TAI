<template>
    <div class="form-wrapper">
        <n-card title="User Registration" class="form-card">
            <n-form :model="form" :rules="rules" ref="formRef" label-placement="top" label-width="auto">
                <n-form-item label="Register as" path="role">
                    <n-radio-group v-model:value="form.role" name="role">
                        <n-radio-button value="student">Student</n-radio-button>
                        <n-radio-button value="teacher">Teacher</n-radio-button>
                    </n-radio-group>
                </n-form-item>
                <n-form-item label="Username" path="username">
                    <n-input v-model:value="form.username" placeholder="Enter username" />
                </n-form-item>

                <n-form-item label="Password" path="password">
                    <n-input v-model:value="form.password" type="password" show-password-on="click"
                        placeholder="Enter password" />
                </n-form-item>

                <n-form-item label="Email" path="email">
                    <n-input v-model:value="form.email" placeholder="Enter email" />
                </n-form-item>

                <n-form-item label="First Name" path="firstName">
                    <n-input v-model:value="form.firstName" placeholder="Enter first name" />
                </n-form-item>

                <n-form-item label="Last Name" path="lastName">
                    <n-input v-model:value="form.lastName" placeholder="Enter last name" />
                </n-form-item>

                <n-form-item label="Birth Date" path="birthDate">
                    <n-date-picker v-model:value="form.birthDate" type="date" placeholder="Select birth date" />
                </n-form-item>

                <n-form-item>
                    <n-button type="primary" block @click="handleSubmit">Register</n-button>
                </n-form-item>
            </n-form>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormInst } from 'naive-ui'
import { NRadioGroup, NRadioButton, NDatePicker, NFormItem, NButton, NInput, NForm } from 'naive-ui'

const formRef = ref<FormInst | null>(null)

const form = ref({
    role: '',
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: '',
    birthDate: null as Date | null
})

const rules = {
    role: [{ required: true, message: 'Select profile type', trigger: 'blur' }],
    username: [{ required: true, message: 'Username is required', trigger: 'blur' }],
    password: [{ required: true, message: 'Password is required', trigger: 'blur' }],
    email: [
        { required: true, message: 'Email is required', trigger: 'blur' },
        { type: 'email', message: 'Email is invalid', trigger: 'blur' }
    ],
    firstName: [{ required: true, message: 'First name is required', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Last name is required', trigger: 'blur' }],
    birthDate: [{ required: true, type: 'date', message: 'Birth date is required', trigger: 'change' }]
}

async function registerTeacher(form: any) {
    try {
        var authUrl = '';
        if (form.value.role == "student") {
            authUrl = "http://localhost:8080/auth/user/register"
        }
        else {
            authUrl = "http://localhost:8080/auth/teacher/register"
        }
        const response = await fetch(authUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                username: form.value.username,
                password: form.value.password,
                email: form.value.email,
                firstName: form.value.firstName,
                lastName: form.value.lastName,
                birthDate: form.value.birthDate
            })
        })

        if (!response.ok) {
            throw new Error(`HTTP ${response.status} - ${await response.text()}`)
        }

        const data = await response.json()
        console.log('Registration success:', data)
    } catch (err) {
        console.error('Registration failed:', err)
    }
}

function handleSubmit() {
    formRef.value?.validate((errors) => {
        if (!errors) {
            console.log('Form Submitted:', form.value)
            registerTeacher(form)
        } else {
            console.warn('Validation failed:', errors)
        }
    })
}
</script>


<style scoped>
.form-wrapper {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.form-card {
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    max-width: 500px;
    background-color: var(--secondary-color);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

:deep(.n-form-item) {
    --n-label-text-color: white !important;
}

:deep(.n-radio-button){
    --n-font-size: 14px;
    --n-bezier: cubic-bezier(.4, 0, .2, 1);
    --n-button-border-color: rgb(224, 224, 230);
    --n-button-border-color-active: var(--text-accent-color);
    --n-button-border-radius: 3px;
    --n-button-box-shadow: inset 0 0 0 1px #0000;
    --n-button-box-shadow-focus: inset 0 0 0 1px #FFFF, 0 0 0 2px rgba(24, 160, 88, 0.3);
    --n-button-box-shadow-hover: inset 0 0 0 1px #0000;

    --n-button-text-color-hover: ;
    --n-button-text-color-active: var(--text-accent-color);

}
</style>

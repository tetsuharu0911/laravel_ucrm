<script setup>
import { reactive } from 'vue';
import { router } from '@inertiajs/vue3';
import BreezeValidationErrors from '@/Components/ValidationErrors.vue'

const form = reactive({
    title: null,
    content: null,
})

const props = defineProps({
    errors: Object,
})

const submitFunction = () => {
    router.post('/inertia', form)
}
</script>

<template>
    <BreezeValidationErrors>
        <form @submit.prevent="submitFunction" :errors="errors" >
            <input type="text" name="title" v-model="form.title"><br>
            <div v-if="errors.title">{{ errors.title }}</div>
            <input type="text" name="content" v-model="form.content"><br>
            <div v-if="errors.content">{{ errors.content }}</div>
            <button>送信</button>
        </form>
    </BreezeValidationErrors>
</template>
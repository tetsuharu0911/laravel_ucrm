<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import ValidationErrors from '@/Components/ValidationErrors.vue'
import { reactive } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import { computed } from 'vue';

defineProps({
    errors: Object
})

const form = reactive({
    name: null,
    memo: null,
    price: null,
    errors: {}
})

const isPriceValid = computed(() => !isNaN(parseFloat(form.price)) && isFinite(form.price));

const validateForm = () => {
    form.errors = {};
    if (!form.name) {
        form.errors.name = '商品名は必須です。';
    }
    if (!form.memo) {
        form.errors.memo = 'メモは必須です。';
    }
    if (!form.price) {
        form.errors.price = '価格は必須です。';
    }else if (!isPriceValid.value) {
        form.errors.price = '価格は数値で入力してください。';
    }
}

const storeItem = () => {
    validateForm();
    if (Object.keys(form.errors).length ===0) {
        router.post('/items', form)
    }
}
</script>

<template>
    <Head title="商品登録" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">商品登録</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <BreezeValidationErrors class="mb-4" />
                    <section class="text-gray-600 body-font relative">
                        <form @submit.prevent="storeItem">
                            <div class="container px-5 py-8 mx-auto">
                                <div class="lg:w-1/2 md:w-2/3 mx-auto">
                                    <div class="flex flex-wrap -m-2">
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="name" class="leading-7 text-sm text-gray-600">商品名</label>
                                                <input type="text" id="name" name="name" v-model="form.name"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.name" class="text-red-600 text-xs">{{ form.errors.name }}</div>
                                        </div>

                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="memo" class="leading-7 text-sm text-gray-600">メモ</label>
                                                <textarea id="memo" name="memo" v-model="form.memo"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                            </div>
                                            <div v-if="form.errors.memo" class="text-red-600 text-xs">{{ form.errors.memo }}</div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="price" class="leading-7 text-sm text-gray-600">商品価格</label>
                                                <input id="price" name="price" v-model="form.price"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.price" class="text-red-600 text-xs">{{ form.errors.price }}</div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <button
                                                class="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">登録</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

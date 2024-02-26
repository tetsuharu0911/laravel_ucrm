<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import ValidationErrors from '@/Components/ValidationErrors.vue'
import { reactive } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import { computed } from 'vue';
import { Core as YubinBangoCore } from "yubinbango-core2"; 

defineProps({
    errors: Object
})

const fetchAddress = () => {
    new YubinBangoCore(String(form.postcode), (value) => {
        form.address = value.region + value.locality + value.street
    })
}

const form = reactive({
    name: null,
    kana: null,
    tel: null,
    email: null,
    postcode: null,
    address: null,
    birthday: null,
    gender: null,
    memo: null,
    errors: {}
})

const validateForm = () => {
    form.errors = {};
    if (!form.name) {
        form.errors.name = '氏名は必須です。';
    }
    if (!form.kana) {
        form.errors.kana = '氏名カナは必須です。';
    }
    if (!form.tel) {
        form.errors.tel = '電話番号は必須です。';
    }
    if (!form.email) {
        form.errors.email = 'メールアドレスは必須です。';
    }
    if (!form.postcode) {
        form.errors.postcode = '郵便番号は必須です。';
    }
    if (!form.address) {
        form.errors.address = '住所は必須です。';
    }
    if (!form.birthday) {
        form.errors.birthday = '誕生日は必須です。';
    }
    if (!form.gender) {
        form.errors.gender = '性別は必須です。';
    }
}

const storeCustomer = () => {
    console.log('storeItem');
    validateForm();

    if (Object.keys(form.errors).length === 0) {
        router.post('/customers', form)
    }
}
</script>

<template>
    <Head title="顧客登録" />

    <AuthenticatedLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">顧客登録</h2>
        </template>

        <div class="py-12">
            <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <BreezeValidationErrors class="mb-4" />
                    <section class="text-gray-600 body-font relative">
                        <form @submit.prevent="storeCustomer">
                            <div class="container px-5 py-8 mx-auto">
                                <div class="lg:w-1/2 md:w-2/3 mx-auto">
                                    <div class="flex flex-wrap -m-2">
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="name" class="leading-7 text-sm text-gray-600">顧客名</label>
                                                <input type="text" id="name" name="name" v-model="form.name"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.name" class="text-red-600 text-xs">{{ form.errors.name }}
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="kana" class="leading-7 text-sm text-gray-600">顧客名（カナ）</label>
                                                <input type="text" id="kana" name="kana" v-model="form.kana"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.kana" class="text-red-600 text-xs">{{ form.errors.kana }}
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="tel" class="leading-7 text-sm text-gray-600">tel</label>
                                                <input type="tel" id="tel" name="tel" v-model="form.tel"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.tel" class="text-red-600 text-xs">{{ form.errors.tel }}
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm text-gray-600">メールアドレス</label>
                                                <input type="email" id="email" name="email" v-model="form.email"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.email" class="text-red-600 text-xs">{{ form.errors.email
                                            }}</div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="postcode" class="leading-7 text-sm text-gray-600">郵便番号</label>
                                                <input type="number" id="postcode" name="postcode" v-model="form.postcode" @change="fetchAddress"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.postcode" class="text-red-600 text-xs">{{
                                                form.errors.postcode }}</div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="address" class="leading-7 text-sm text-gray-600">住所</label>
                                                <input type="text" id="address" name="address" v-model="form.address"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                                <div v-if="form.errors.address" class="text-red-600 text-xs">{{
                                                    form.errors.address }}</div>
                                            </div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="birthday" class="leading-7 text-sm text-gray-600">誕生日</label>
                                                <input type="date" id="birthday" name="birthday" v-model="form.birthday"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out">
                                            </div>
                                            <div v-if="form.errors.birthday" class="text-red-600 text-xs">{{
                                                form.errors.birthday }}</div>
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="gender" class="leading-7 text-sm text-gray-600">性別</label>
                                                <div class="mt-2">
                                                    <label class="inline-flex items-center">
                                                        <input type="radio" name="gender" value="0" v-model="form.gender"
                                                            class="text-indigo-600 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                        <span class="ml-2">男性</span>
                                                    </label>
                                                    <label class="inline-flex items-center ml-6">
                                                        <input type="radio" name="gender" value="1" v-model="form.gender"
                                                            class="text-indigo-600 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                        <span class="ml-2">女性</span>
                                                    </label>
                                                    <label class="inline-flex items-center ml-6">
                                                        <input type="radio" name="gender" value="2" v-model="form.gender"
                                                            class="text-indigo-600 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                                        <span class="ml-2">回答なし</span>
                                                    </label>
                                                </div>
                                            </div>
                                            <!-- <div v-if="form.errors.gender" class="text-red-600 text-xs">{{ form.errors.gender }}</div> -->
                                        </div>
                                        <div class="p-2 w-full">
                                            <div class="relative">
                                                <label for="memo" class="leading-7 text-sm text-gray-600">メモ</label>
                                                <textarea id="memo" name="memo" v-model="form.memo"
                                                    class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                                            </div>
                                            <!-- <div v-if="form.errors.memo" class="text-red-600 text-xs">{{ form.errors.memo }}</div> -->
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

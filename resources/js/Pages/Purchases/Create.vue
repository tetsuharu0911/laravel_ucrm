<script setup>
import { getToday } from '@/common'
import { onMounted, reactive, ref, computed } from 'vue'

onMounted(() => {
    form.date = getToday()
    props.items.forEach(item => {
        itemList.value.push({
            id: item.id, name:item.name, price:item.price, quantity: 0
        })
    })
})

const quantity = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
const props = defineProps({
    'customers': Array,
    'items': Array
})
const itemList = ref([])

const form = reactive({
    date: null,
    customer_id: null
})

const totalPrice = computed(() => {
    let total = 0
    itemList.value.forEach(item => {
        total += item.price * item.quantity
    })
    return total
})

</script>

<template>
    日付<br>
    <input type="date" name="date" v-model="form.date">
    会員名<br>
    <select name="customer" v-model="form.customer_id">
        <option v-for="customer in customers" :value="customer.id" :key="customer.id">
            {{  customer.id }} : {{ customer.name }}
        </option>
    </select>
    <table>
        <tbody>
            <tr v-for="item in itemList">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.price  }}</td>
                <td>
                    <select name="quantity" v-model="item.quantity">
                        <option v-for="q in quantity" :value="q">{{ q }}</option>
                    </select>
                </td>
                <td>
                    {{ item.price * item.quantity }}
                </td>
            </tr>
            合計{{ totalPrice }}
        </tbody>
    </table>
</template>
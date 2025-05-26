<template>
    <div>
        <div>
            {{ counterStore.count }}
            {{ counterStore.double }}
        </div>
        <button class="btn btn-primary" @click="counterStore.increment">Increment</button>
    </div>
</template>

<script setup lang="ts">
import { useCounterStore } from '~/store/useCounter.store'

const counterStore = useCounterStore()
</script>
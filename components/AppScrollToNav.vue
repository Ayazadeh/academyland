<template>
    <AppSlider
        :items="items"
        item-container-class="flex-shrink-0"
        :middle="activeItemIndex"
        :arrows="false"
    >
        <template #item="{ label, id, index }">
            <div 
                role="button"
                class="cursor-pointer"
                :class="{ 'text-primary': index === activeItemIndex }"
                @click="scrollToID(id)"
            >
                {{ label }}
            </div>
        </template>
    </AppSlider>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { gsap } from 'gsap';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { useWindowScroll } from '@vueuse/core';

const props = withDefaults(defineProps<{
    items: { id: string, label: string }[];
    offset?: number;
}>(), {
    offset: 300,
})

const route = useRoute();
const activeHash = ref(route.hash || '');

const updateHash = (id: string) => {
    if (import.meta.client) {
        window.history.pushState(null, '', '#' + id);
        activeHash.value = '#' + id;
    }
}

onMounted(() => {
    gsap.registerPlugin(ScrollToPlugin);
    if (route.hash) {
        gsap.to(window, {
            duration: 1,
            scrollTo: { 
                y: route.hash,
                offsetY: props.offset,
            }
        })
    }
})

let scrollTo: any;
const scrollToID = (id: string) => {
    updateHash(id);
    scrollTo = gsap.to(window, {
        duration: 1,
        scrollTo: {
            y: '#' + id,
            offsetY: props.offset,
            autoKill: true,
        }
    })
}

const { y } = useWindowScroll();
watch(y, () => {
    for (let i = props.items.length - 1; i >= 0; i--) {
        const item = props.items[i];
        const el = document.getElementById(item.id);
        if (el && el?.getBoundingClientRect().top <= props.offset + 2) {
            updateHash(item.id);
            return;
        }
        if (i == 0) {
            updateHash('');
        }
    }
})

const activeItemIndex = computed(() => {
    return props.items.findIndex(item => '#' + item.id === unref(activeHash)); 
})
</script>
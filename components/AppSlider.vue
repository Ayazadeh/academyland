<template>
    <div class="relative lg:px-5">
        <template v-if="arrows">
            <button
                class="hidden lg:block absolute top-1/2 -right-5 transition translate--y-1/2"
                @click="clickPrev"
            >
                <ChevronRightIcon />
            </button>
            <button
                class="hidden lg:block absolute top-1/2 -left-5 transition translate--y-1/2"
                @click="clickNext"
            >
                <ChevronLeftIcon />
            </button>
        </template>
        <div class="overflow-x-hidden">
            <div ref="sliderWrapperRef" class="flex">
                <template v-for="(item, index) in items" :key="index">
                    <div
                        :ref="(el) => setChildrenRef(el as HTMLElement, index)"
                        :class="[
                            { 'py-2 px-1.5 first:pr-3 last:pl-3': defaultPadding },
                            itemContainerClass,
                        ]"
                    >
                        <slot name="item" v-bind="item" :index="index" />
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUpdate, onUpdated, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import Draggable from 'gsap/Draggable';
import { useEventListener } from '@vueuse/core';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline';

const props = withDefaults(defineProps<{
    items: any[];
    arrows?: boolean;
    defaultPadding?: boolean;
    itemContainerClass?: string | string[] | Record<string, boolean>;
    config?: Record<string, any>;
    middle?: number;
    end?: number;
    start?: number;
}>(), {
    items: () => ([]),
    arrows: true,
    defaultPadding: true,
    itemContainerClass: '',
    config: () => ({ duration: 1, ease: 'power1' }),
    middle: -1,
    end: -1,
    start: -1,
})

const sliderWrapperRef = ref<HTMLElement | null>(null);
const childrenRefs = ref<HTMLElement[]>([]);
const setChildrenRef = (el: HTMLElement, index: number) => {
    if (el) {
        childrenRefs.value[index] = el;
    }
}

onBeforeUpdate(() => {
    childrenRefs.value = [];
})

const getConfig = () => {
    const el = unref(sliderWrapperRef);
    const maxX: number = el!.scrollWidth - el!.clientWidth;

    return { el, maxX };
}

const recalculate = () => {
    const { el, maxX } = getConfig();

    Draggable.get(unref(el)).applyBounds({ minX: 0, maxX });
}

onUpdated(() => {
    recalculate();
})

onMounted(() => {
    gsap.registerPlugin(Draggable);
    let { el, maxX } = getConfig();
    Draggable.create(unref(el), {
        type: 'x',
        edgeResistance: 0.9,
        bounds: {
            minX: 0,
            maxX,
        },
    })
    useEventListener('resize', recalculate );
})

const getValidX = (x: number) => {
    const { maxX } = getConfig();
    if (x < 0) return 0;
    if (x > maxX) return maxX;
    return x;
}

const getPrevItemsWidth = (activeIndex: number) => {
    const prevItems = props.items.slice(0, activeIndex);
    return prevItems.reduce((acc, item) => acc + item.width, 0);
}

const setActiveIndexStart = (activeIndex: number) => {
    if (childrenRefs.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        gsap.to(unref(el), {
            x: getValidX(xDistance),
            ...props.config,
        })
    }
}

const setActiveIndexEnd = (activeIndex: number) => {
    if (childrenRefs.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack = (unref(el)?.clientWidth || 0) - 
        childrenRefs.value[activeIndex]!.clientWidth;
        gsap.to(unref(el), {
            x: getValidX(xDistance - visibleBack),
            ...props.config,
        })
    }
}

const setActiveIndexMiddle = (activeIndex: number) => {
    if (childrenRefs.value[activeIndex]) {
        const { el } = getConfig();
        const xDistance = getPrevItemsWidth(activeIndex);
        const visibleBack = (unref(el)?.clientWidth || 0) - 
        childrenRefs.value[activeIndex]!.clientWidth;
        gsap.to(unref(el), {
            x: getValidX(xDistance - visibleBack / 2),
            ...props.config,
        })
    }
}


watch(() => props.start, (value) => {
    setActiveIndexStart(value);
})

watch(() => props.middle, (value) => {
    setActiveIndexMiddle(value);
})

watch(() => props.end, (value) => {
    setActiveIndexEnd(value);
})

const clickNext = () => {
    const { el } = getConfig();
    const currentX = gsap.getProperty(unref(el), 'x');
    const plusX = unref(el)!.clientWidth;
    gsap.to(unref(el), {
        x: getValidX(+currentX + plusX),
        ...props.config,
    })
}

const clickPrev = () => {
    const { el } = getConfig();
    const currentX = gsap.getProperty(unref(el), 'x');
    const plusX = unref(el)!.clientWidth;
    gsap.to(unref(el), {
        x: getValidX(+currentX - plusX),
        ...props.config,
    })
}
</script>  
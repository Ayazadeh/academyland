<template>
    <div>
        <select class="select select-primary" data-choose-theme>
            <option disabled selected>Select Theme</option>
            <option v-for="theme in themes" :value="theme">{{ theme }}</option>
        </select>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { themeChange } from 'theme-change'

const themes = [
    'light',
    'dark',
    'cupcake',
    'bumblebee',
    'emerald',
    'corporate',
    'synthwave',
    'retro',
    'cyberpunk',
    'valentine',
    'halloween',
    'garden',
    'forest',
    'aqua',
    'lofi',
    'pastel',
    'fantasy',
    'wireframe',
    'black',
    'luxury',
    'dracula',
    'cmyk',
    'autumn',
    'business',
    'acid',
    'lemonade',
    'night',
    'coffee',
    'winter',
    'dim',
    'nord',
    'sunset',
    'caramellatte',
    'abyss',
    'silk'
]

onMounted(() => {
    themeChange(false)
})
</script>
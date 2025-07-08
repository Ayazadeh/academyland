<template>
	<div
		class="relative min-w-24 transition duration-1000"
		:class="{ 'opacity-0': !authStore.getFullName }"
	>
		<button @click="openMenu" class="btn btn-link no-animation lg:ml-4 t-row">
			<span>
				{{ authStore.getFullName }}
			</span>

			<chevron-down-icon class="w-4 h-4 mr-1" />
		</button>
		<div
			class="absolute inset-x-0 h-0 invisible rounded-box top-10 z-30 bg-white"
            ref="target"
		>
            <button @click="logout" class="p-4 text-error lg:ml-4">خروج</button>
        </div>
	</div>
</template>

<script setup lang="ts">
import { useMenu } from '#imports';
import { ChevronDownIcon } from '@heroicons/vue/24/outline';
import { useAuthStore } from '~/composables/auth/Auth.store';
import { useLogout } from '~/composables/auth/useLogout';

const { openMenu, closeMenu, target } = useMenu();
const authStore = useAuthStore();
const { logout } = useLogout();

</script>
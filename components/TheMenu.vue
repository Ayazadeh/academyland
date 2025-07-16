<template>
		<div
			id="the-menu"
			class="navbar t-row justify-between px-10 3xl:text-sm shadow-lg bg-base-100 z-40"
		>
			<section class="t-row">
				<button
					class="lg:hidden block"
					@click="toggleMenu"
				>
					<Bars3Icon class="w-8" />
				</button>
				<div
					ref="target"
					v-bind="$attrs"
					class="
					invisible 
					opacity-0 
					top-10 
					inset-x-0
					h-0
					bg-base-100
					flex 
					flex-col
					text-center
					absolute
					mt-3 
					rounded-box 
					border 
					shadow-lg
					lg:flex
					lg:flex-row
					lg:items-center
					lg:visible
					lg:opacity-100
					lg:relative
					lg:border-none
					lg:rounded-none 
					lg:shadow-none 
					lg:mt-0
					lg:inset-0
					"
				>
					<router-link
						v-for="(item, index) in links"
						:key="`menu-${index}`"
						:to="item.to"
						class="w-full lg:w-auto py-3 pr-4 cursor-pointer"
					>
						{{ item.title }}
					</router-link>
				</div>
			</section>

			<section class="t-row">
				<client-only>
					<button
						class="btn btn-link no-animation lg:ml-4"
						@click="() => open()"
						v-if="!authStore.isLoggedIn"
					>
						ورود / ثبت نام
					</button>
					<template v-else>
						<TheMenuAuth />
					</template>
				</client-only>

				<router-link
					class="!text-gray-600 font-bold"
					to="/"
				>
					آکادمی لند
				</router-link>
			</section>
		</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/composables/auth/Auth.store';
import { useLoginDialog } from '~/composables/auth/login/useLoginDialog';
import { Bars3Icon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const { open } = useLoginDialog();

const links = [
	{
		title: 'صفحه اصلی',
		to: '/',
	},
	{
		title: 'دوره‌های آموزشی',
		to: '/',
	},
	{
		title: 'مقالات',
		to: '/',
	},
	{
		title: 'درباره آکادمی لند',
		to: '/about',
	},
];

const { toggleMenu, target } = useMenu();
const disable = useEnableByRoute([{ name: 'courses-slug' }]);
useFixMenu('#the-menu', disable);
</script>

<style scoped>
.router-link-exact-active {
	color: green;
}
</style>

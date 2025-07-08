<template>
	<div class="min-h-[4rem]">
		<div
			id="the-menu"
			class="t-row justify-between px-10 py-2.5 3xl:text-sm shadow-lg"
		>
			<section></section>
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

				<router-link class="!text-gray-600 font-bold" to="/">
					آکادمی لند
				</router-link>
			</section>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/composables/auth/Auth.store';
import { useLoginDialog } from '~/composables/auth/login/useLoginDialog';

const authStore = useAuthStore();
const { open } = useLoginDialog();
</script>
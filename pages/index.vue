<template>
	<div>
		<div
			class="flex flex-col relative p-10 lg:pb-32 home-header overflow-hidden"
		>
			<div
				class="z-0 absolute -inset-2 course-cover filter blur-sm contrast-125 home-header"
			>
				<div class="w-full h-full bg-black/50"></div>
			</div>

			<section
				class="flex-1 flex flex-col lg:flex-row items-center justify-center lg:pr-5 xs:mt-8 sm:mt-0 z-10"
			>
				<div class="text-white space-y-6">
					<h1 class="prose-xl g-head-anime">آموزش تخصصی nuxt js و vue js</h1>
					<p class="block g-head-anime lg:w-3/4">
						به دنیای برنامه نویسی آکادمی لند خوش آمدید، آموزش پروژه محور برنامه نویسی با طعم تجربه!
					</p>
					<button
						class="block btn btn-accent btn-wide g-head-anime"
						:class="{ 'transition-none no-animation': !completeAnimation }"
						@click="clickGetStart"
					>
						شروع یادگیری
					</button>
				</div>
			</section>
		</div>
		<section
			class="layout-padding flex flex-col space-y-4 pt-4 lg:pt-0 lg:space-y-0 w-full lg:w-auto lg:flex-row justify-center items-center"
		>
			<Service
				title="پروژه‌های عملی"
				description="آموزش پروژه محور و انتقال تجربه عملی مهمترین وجه آموزش‌های ماست"
			>
				<template #icon>
					<CodeBracketIcon />
				</template>
			</Service>
			<Service
				title="مجموعه آموزش‌های مدرن"
				description="بروز بودن آموزش‌های ما وجه تمایز ماست"
			>
				<template #icon>
					<AcademicCapIcon />
				</template>
			</Service>
			<Service
				title="تجربه عملی مدرس"
				description="سال‌ها تجربه برنامه نویسی در قالب دوره‌های آموزشی منتظر شماست"
			>
				<template #icon>
					<BeakerIcon />
				</template>
			</Service>
		</section>

		<h6 id="featured-courses" class="head text-center">دوره های آکادمی لند</h6>
		<section class="my-3 lg:mt-0 lg:mx-10">
			<AppSlider :items="data">
				<template #item="item">
					<div>{{ item.title }}</div>
				</template>
			</AppSlider>
		</section>
	</div>
</template>

<script setup lang="ts">
import { useFetchApi } from '~/composables/api/useFetchApi'
import { AcademicCapIcon, BeakerIcon, CodeBracketIcon } from '@heroicons/vue/24/outline'
import { gsap } from 'gsap'
import ScrollToPlugin from 'gsap/ScrollToPlugin';

const completeAnimation = ref(false);

onMounted(() => {
	gsap.registerPlugin(ScrollToPlugin);
	const tl = gsap.timeline();
	tl.from('.g-head-anime', {
		ease: 'power4',
		duration: 0.8,
		autoAlpha: 0,
		x: 200,
		stagger: 0.3,
		onComplete: () => {
			completeAnimation.value = true;
			gsap.set('.g-head-anime', { clearProps: 'transform' });
		}
	})
})
const clickGetStart = () => {
	gsap.to(window, {
		duration: 1,
		scrollTo: { 
			y: '#featured-courses',
			offsetY: 110,
		}
	})
}

const $fetch = useFetchApi();
const { data }: { data: Ref<any[]> } = await useLazyAsyncData(
  'courses',
  () => $fetch('/course/index')
)
</script>

<style scoped lang="postcss">
.g-head-anime {
	@apply invisible;
}
#home-head-banner {
	@apply invisible;
}
.home-header {
	background-image: url('~/assets/images/header.jpg');
	background-size: 100% 100%;
}
</style>
  
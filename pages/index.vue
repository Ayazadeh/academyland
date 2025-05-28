<template>
	<div>
		<div
			class="flex flex-col relative p-6 md:p-12 lg:p-16 home-header overflow-hidden"
		>
			<div
				class="z-0 absolute inset-0 course-cover home-header before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/80 before:via-black/60 before:to-black/40"
			></div>

			<section
				class="flex-1 flex flex-col lg:flex-row items-center justify-center z-10 py-12 lg:py-20"
			>
				<div class="text-white space-y-8 max-w-3xl">
					<h1 class="prose-2xl font-bold leading-tight g-head-anime">
						آموزش تخصصی nuxt js و vue js
					</h1>
					<p class="text-lg lg:text-xl opacity-90 font-bold g-head-anime lg:w-4/5">
						به دنیای برنامه نویسی آکادمی لند خوش آمدید، آموزش پروژه محور برنامه
						نویسی با طعم تجربه!
					</p>
					<button
						class="btn btn-accent btn-wide g-head-anime hover:scale-105 transition-transform duration-300 shadow-lg"
						:class="{
							'transition-none no-animation': !completeAnimation,
						}"
						@click="clickGetStart"
					>
						شروع یادگیری
					</button>
				</div>
			</section>
		</div>
		<section
			class="relative z-50 grid lg:-mt-16 lg:grid-cols-3 gap-5 max-w-5xl mx-auto"
		>
			<Service
				title="پروژه‌های عملی"
				description="آموزش پروژه محور و انتقال تجربه عملی"
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

		<h6 id="featured-courses" class="head text-center mt-10">
			دوره های آکادمی لند
		</h6>
		<div v-if="pending">Loading...</div>
		<section v-else class="my-3 lg:mt-0 lg:mx-10">
			<AppSlider :items="data">
				<template #item="{ item }">
					<CourseItem :item="item" />
				</template>
			</AppSlider>
		</section>
	</div>
</template>

<script setup lang="ts">
import {
	AcademicCapIcon,
	BeakerIcon,
	CodeBracketIcon,
} from "@heroicons/vue/24/outline";
import { gsap } from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import { useCourseList } from "~/composables/course/useCourse";

const completeAnimation = ref(false);

onMounted(() => {
	gsap.registerPlugin(ScrollToPlugin);
	const tl = gsap.timeline();
	tl.from(".g-head-anime", {
		ease: "power4",
		duration: 0.8,
		autoAlpha: 0,
		x: 200,
		stagger: 0.3,
		onComplete: () => {
			completeAnimation.value = true;
			gsap.set(".g-head-anime", {
				clearProps: "transform",
			});
		},
	});
});
const clickGetStart = () => {
	gsap.to(window, {
		duration: 1,
		scrollTo: {
			y: "#featured-courses",
			offsetY: 110,
		},
	});
};
const { data, pending } = useCourseList();
</script>

<style scoped lang="postcss">
.g-head-anime {
	@apply invisible;
}
#home-head-banner {
	@apply invisible;
}
.home-header {
	background-image: url("@/assets/images/header.jpg");
	background-size: cover;
	background-position: center;
	position: relative;
}
.home-header::after {
	content: "";
	position: absolute;
	inset: 0;
	background: linear-gradient(
		45deg,
		rgba(0, 0, 0, 0.7) 0%,
		rgba(0, 0, 0, 0.4) 100%
	);
	z-index: 1;
}
@keyframes slowZoom {
	from {
		transform: scale(1);
	}
	to {
		transform: scale(1.1);
	}
}
.course-cover {
	animation: slowZoom 20s infinite alternate ease-in-out;
}
</style>

<template>
	<div v-if="pending">loading...</div>
	<div v-else-if="data">
		<section
			class="
            grid 
            bg-[#220241] 
            lg:grid-cols-3
            "
		>
			<div class="aspect-w-40 aspect-h-21 drop-shadow-lg filter blur-[4px]">
				<figure class="overflow-hidden">
					<img
						class="w-full h-full"
						loading="lazy"
						src="https://academyland.net/api/web/images/courses/store-vue-nuxt.png"
					/>
				</figure>
			</div>
			<div
				class="
                py-4 
                my-auto 
                space-y-3 
                t-col
                items-center
                text-center
                lg:py-0 
                lg:space-y-4 
                "
			>
				<h1 class="font-bold prose-2xl text-white">
					پیاده سازی فروشگاه با vue و nuxt 3
				</h1>
				<div class="t-row">
					<div class="badge badge-secondary badge-lg text-xs">در حال ضبط</div>
				</div>
			</div>
		</section>

		<section class="sticky top-0 bg-base-100 py-4 z-10">
			<AppScrollToNav :items="CourseTabs" />
		</section>

		<main
			class="
            flex 
            flex-col 
            space-y-3 
            grid-cols-1 
            px-3 
            pb-4 
            pt-2 
            lg:space-y-0 
            lg:grid 
            lg:gap-5 
            lg:px-10
            lg:grid-cols-12 
            "
		>
			<section class="lg:col-span-8 t-col space-y-3">
				<div class="card shadow/20 rounded-box p-4">
					<div class="card-body">
						<h6
							:id="CourseTabs[0].id"
							class="card-title text-secondary"
						>
							{{ CourseTabs[0].label }}
						</h6>
						<article>
							<p>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit.
								Laboriosam possimus consequatur alias ipsa a delectus quibusdam
								esse quo. Accusantium dolore modi eius veniam nulla. Soluta ex
								cupiditate voluptates voluptatum quam? Lorem ipsum dolor sit
								amet consectetur adipisicing elit. Harum officia quia ad ipsum
								temporibus aliquam voluptas itaque amet necessitatibus, dolorum
								libero odio voluptatibus. Vero modi suscipit dolor sequi
								molestiae illum. Lorem ipsum dolor, sit amet consectetur
								adipisicing elit. Ab officia sequi molestiae voluptatem sapiente
								error, ipsa laborum asperiores, aut distinctio quos earum
								blanditiis fuga vitae labore at tenetur maxime esse.
							</p>
						</article>
					</div>
				</div>
				<div class="card shadow/20 rounded-box p-4">
					<div class="card-body">
						<h6
							:id="CourseTabs[1].id"
							class="card-title text-secondary"
						>
							{{ CourseTabs[1].label }}
						</h6>
						<div class="h-20">پیش نیازهای دوره در اینجا قرار می‌گیرد</div>
						<div dir="ltr">{{ data }}</div>
					</div>
				</div>
				<div class="card shadow/20 rounded-box p-4">
					<div class="card-body">
						<h6
							:id="CourseTabs[2].id"
							class="card-title text-secondary"
						>
							{{ CourseTabs[2].label }}
						</h6>
						<template v-if="true">
							<div class="h-20">لیست ویدئوهای دوره در اینجا قرار می‌گیرد</div>
						</template>
						<template v-else>
							<p>هنوز ویدئویی منتشر نشده است.</p>
						</template>
					</div>
				</div>

				<div class="card shadow/20 rounded-box p-4">
					<div class="card-body">
						<h6
							:id="CourseTabs[3].id"
							class="card-title text-secondary"
						>
							{{ CourseTabs[3].label }}
						</h6>
						<div class="h-10">لیست سوالات متداول در اینجا قرار می‌گیرد</div>
					</div>
				</div>

				<client-only>
					<div class="card shadow/20 rounded-box p-4">
						<div class="card-body">
							<h6
								:id="CourseTabs[4].id"
								class="card-title text-secondary"
							>
								{{ CourseTabs[4].label }}
							</h6>
							<div class="my-3">
								<template v-if="authStore.isLoggedIn">
									<div>فرم ثبت نظر در اینجا قرار می‌گیرد</div>
								</template>
								<template v-else>
									<p
										role="button"
										@click="openLoginDialog()"
										class="alert alert-info text-sm"
									>
										برای ثبت نظر باید وارد شوید.
									</p>
								</template>
							</div>

							<div class="h-10">نظرات کاربران در اینجا قرار می‌گیرد</div>
						</div>
					</div>
				</client-only>
			</section>
			<aside class="lg:col-span-4 t-col space-y-3">
				<section class="shadow/20 rounded-box p-4">
					<div class="t-row justify-between p-3">
						<span class="block font-medium prose-sm">قیمت دوره</span>
						<span class="block">869,000 تومان</span>
					</div>
					<div
						class="t-row justify-between p-3"
						v-if="true"
					>
						<span class="block font-medium prose-sm">مدت زمان دوره</span>
						<span
							class="block"
							dir="ltr"
							>12 : 20 : 15</span
						>
					</div>
					<div
						class="t-row justify-between p-3"
						v-if="true"
					>
						<span class="block font-medium prose-sm">
							مدت زمان تقریبی دوره
						</span>
						<span class="block">20 ساعت</span>
					</div>
					<div
						class="t-row justify-between p-3"
						v-if="true"
					>
						<span class="block font-medium prose-sm">تعداد قسمت‌ها</span>
						<span class="block"> 70 </span>
					</div>
					<div class="t-row justify-between p-3">
						<span class="block font-medium prose-sm">تعداد شرکت کنندگان</span>
						<span class="block"> 120 </span>
					</div>
					<client-only>دکمه پرداخت و ثبت نام دوره</client-only>
				</section>

				<section class="shadow/20 rounded-box box p-4">
					<div class="t-row">
						<div class="avatar">
							<div class="rounded-full w-20 h-20">
								<img
									src="https://avatars.githubusercontent.com/u/80272331?v=4"
								/>
							</div>
						</div>
						<div class="t-col space-y-2 mr-4">
							<span class="font-semibold">مدرس دوره</span>
							<span>محمد ایازاده</span>
						</div>
					</div>
					<article class="mt-4">
						<p class="text-gray-500">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Recusandae, numquam vero deleniti animi eligendi nam non corporis
							officia odit, odio est, labore voluptas ex suscipit accusamus
							aliquam molestias similique cupiditate. Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Ad dolores omnis odio perspiciatis,
							totam voluptatum saepe hic ea animi enim aliquid nihil laborum
							voluptates aliquam ab ducimus aperiam. Velit, nostrum.
						</p>
					</article>
				</section>
			</aside>
		</main>
	</div>
</template>

<script setup lang="ts">
import { CourseTabs } from '~/composables/course/Course.const'
import { useLoginDialog } from '~/composables/auth/login/useLoginDialog';
import { useAuthStore } from '~/composables/auth/Auth.store';
import { useCourseDetail } from '~/composables/course/useCourseDetail';

const { open: openLoginDialog } = useLoginDialog();

const authStore = useAuthStore();

const route = useRoute()

const { data, pending } = useCourseDetail(route.params.slug as string)
watchEffect(() => {
	console.log('data', data.value);
})
</script>

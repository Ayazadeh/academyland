<template>
	<div v-if="pending">
		<AppSkeleton :type="SkeletonTypes.CUSTOM">
			<div
				class="
				h-96
				w-full
				bg-gray-300
				"
			></div>
		</AppSkeleton>
		<AppSkeleton
			:type="SkeletonTypes.ONE_LINE"
			class="mt-3"
		/>
	</div>
	<div
		v-else-if="error"
		class="alert alert-error"
	>
		خطا: {{ error.message || 'دوره بارگذاری نشد' }}
	</div>
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
						:src="data?.['src']"
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
					{{ data?.['title'] }}
				</h1>
				<div class="t-row">
					<div class="badge badge-secondary badge-lg text-xs">
						{{ data?.['statusText'] }}
					</div>
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
							<p v-html="data?.['short_description']"></p>
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
						<div
							class="h-20"
							v-html="data['requirements']"
						></div>
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
						<template v-if="hasChapter">
							<CourseChapterItem
								v-for="item in data?.['courseChapters']"
								:item="item"
								:key="`chapter-${item.id}`"
							/>
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
						<div v-for="item in data['courseQuestions']">
							{{ item.question }}
						</div>
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
									<div>
										<CourseCommentForm :course-id="data?.['id']" />
									</div>
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

							<CourseComments :course-id="data['id']" />
						</div>
					</div>
				</client-only>
			</section>
			<aside class="lg:col-span-4 t-col space-y-3">
				<section class="rounded-box p-4">
					<div class="t-row justify-between p-3">
						<span class="block font-medium prose-sm">قیمت دوره</span>
						<div class="flex space-x-2">
							<span
								class="line-through prose-xs text-gray-600"
								v-if="showAmount"
							>
								{{ numberFormat(data['amount']) }}
							</span>
							<span>
								{{ getAmount }}
							</span>
						</div>
					</div>
					<div
						class="t-row justify-between p-3"
						v-if="data?.['courseDuration']"
					>
						<span class="block font-medium prose-sm">مدت زمان دوره</span>
						<span
							class="block"
							dir="ltr"
						>
							{{ data['courseDuration'] }}
						</span>
					</div>
					<div
						class="t-row justify-between p-3"
						v-if="data?.['computedEstimateDuration']"
					>
						<span class="block font-medium prose-sm">
							مدت زمان تقریبی دوره
						</span>
						<span class="block">{{ data['computedEstimateDuration'] }}</span>
					</div>
					<div
						class="t-row justify-between p-3"
						v-if="data?.['totalVideoCount']"
					>
						<span class="block font-medium prose-sm">تعداد قسمت‌ها</span>
						<span class="block"> {{ data['totalVideoCount'] }} </span>
					</div>
					<div
						class="t-row justify-between p-3"
						v-if="data?.['userCounter']"
					>
						<span class="block font-medium prose-sm">تعداد شرکت کنندگان</span>
						<span class="block"> {{ data['userCounter'] }} </span>
					</div>
					<client-only>
						<CoursePayButton :course-id="data['id']" />
					</client-only>
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
							محمد ایازاده هستم،‌ دانش آموخته دانشگاه صنعتی کرمانشاه و اکنون
							بعنوان فرانت اند دولوپر مشغول به کار هستم.
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
import { SkeletonTypes } from '~/components/AppSkeleton/Skeleton.enum';
import { numberFormat } from '~/helpers/formatHelper';

// title
useHead({
	title: computed(() => unref(data)?.['title'] || ''),
	meta: [
		{
			name: 'description',
			content: computed(() => unref(data)?.['meta_description'] || '')
		}
	]
})

const { open: openLoginDialog } = useLoginDialog();

const authStore = useAuthStore();

const route = useRoute()
const { data, pending, error } = useCourseDetail(route.params.slug as string)

const showAmount = computed(() => data.value?.['amountOff'] !== data.value?.['amount'])
const getAmount = computed(() => {
    if (data.value?.['amountOff'] === 0) {
        return 'رایگان'
    }
	return numberFormat(data.value?.['amountOff']) + ' تومان';
})

const hasChapter = computed(() => data.value?.['courseChapters'])
</script>

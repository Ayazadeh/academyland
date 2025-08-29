<template>
	<nuxt-link
		:to="to"
		class="group cursor-pointer block h-full"
		:class="[
			hasDefaultWidth ? 'w-[19rem] lg:w-[22rem]' : 'w-full',
			'inline-block'
		]"
	>
		<div class="card border-1 border-black/10 text-accent-content h-full">
			<div class="aspect-[2/1] bg-gray-100 shadow-sm border-b relative">
				<div
					class="absolute inset-x-2 top-2"
					v-if="item.percent"
				>
					<div class="t-row justify-between">
						<small
							class="text-secondary"
							v-if="item.isRecording"
						>
							تخفیف حین ضبط دوره
						</small>
						<div v-else></div>
						<div class="badge badge-secondary py-3">{{ item.percent }} %</div>
					</div>
				</div>
				<figure class="overflow-hidden">
					<img
						class="w-full h-full transition duration-500 transform-gpu group-hover:opacity-90 group-hover:scale-105"
						loading="lazy"
						:src="item.src"
						:alt="item.title"
					/>
				</figure>
			</div>

			<div class="card-body flex flex-col bg-base-100 text-base-content">
				<h3
					class="line-clamp-2 min-h-14 card-title prose-sm group-hover:text-primary transition"
				>
					{{ item.title }}
				</h3>

				<div class="min-h-[6rem] flex-grow">
					<p class="prose-xs line-clamp-4">
						{{ item.short_description }}
					</p>
				</div>

				<div class="flex items-center justify-between mt-3">
					<div class="prose-xs 3xl:prose-2xs text-secondary">
						<client-only>
							<template v-if="cartStore.fetchedOnce">
								<AddToCartButton v-if="!cartStore.isExistInTheCart(item.id)" :id="item.id" />
								<DeleteFromCart v-else :id="item.id" />
							</template>
						</client-only>
					</div>
					<div class="prose-xs 3xl:prose-2xs">
						<div class="t-row gap-x-3 space-x-reverse">
							<span
								v-if="item.showAmount"
								class="line-through prose-xs text-gray-600"
							>
								{{ numberFormat(item.amount) }}
							</span>
							<span>
								{{ getAmount }}
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nuxt-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { numberFormat } from '~/helpers/formatHelper';
import { CourseDto } from '~/composables/course/course.dto';
import { useCartStore } from '~/composables/cart/cart.store';

interface Props {
    item: CourseDto;
    hasDefaultWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    hasDefaultWidth: true,
});

const cartStore = useCartStore();

const to = computed(() => ({
    name: 'courses-slug',
    params: { slug: props.item.slug }
}))
const getAmount = computed(() => {
    if (props.item.amountOff === 0) {
        return 'رایگان'
    }
    return numberFormat(props.item.amountOff) + ' تومان';
})
</script>

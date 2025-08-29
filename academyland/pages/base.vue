<template>
	<div class="flex flex-col space-y-3 justify-center items-center text-center">
		<h1>my base component</h1>
		<ThemeSelector />
		<AppModal v-model="isModalOpen">
			<div>
				<h2>Modal Content</h2>
				<p>This is the content of the modal.</p>
			</div>
		</AppModal>
		<AppButton
			:variant="ButtonVariantEnum.SECONDARY"
			@click="isModalOpen = true"
		>
			<span>دکمه</span>
		</AppButton>
		<AppButton
			@click="showMessage"
			:variant="ButtonVariantEnum.SECONDARY"
		>
			show toast
		</AppButton>
		<AppTextInput
			v-model="textInput"
			name="textInput"
			label="title"
		/>
		{{ textInput }}

		<div class="py-5 min-h-[12rem]">
			<AppCollapse>
				<template #title>title of collapse</template>
				<h2>content of collapse</h2>
			</AppCollapse>
		</div>

		<h2>menu</h2>
		<div class="relative">
			<button
				@click="openMenu"
				class="btn btn-primary no-animation"
			>
				open menu
			</button>
			<div class="bg-orange-200">
				<div
					ref="target"
					class="absolute top-14 inset-x-0 h-0 invisible rounded-box opacity-0 z-30 bg-white"
				>
					<ul class="p-4 space-y-1">
						<li v-for="i in 3">item {{ i }}</li>
					</ul>
				</div>
			</div>
		</div>

		<div>
			<h2>avatar list</h2>
			<AppSkeleton :type="SkeletonTypes.AVATAR_LIST" />

			<h2>card</h2>
			<AppSkeleton :type="SkeletonTypes.CARD" />

			<h2>one line</h2>
			<AppSkeleton :type="SkeletonTypes.ONE_LINE" />

			<h2>threee line</h2>
			<AppSkeleton :type="SkeletonTypes.THREE_LINE" />

			<h2>image</h2>
			<AppSkeleton :type="SkeletonTypes.IMAGE" />

			<h2>custom</h2>
			<AppSkeleton :type="SkeletonTypes.CUSTOM">
				<div class="flex flex-row space-x-2 p-1">
					<div class="rounded-full bg-gray-300 h-12 w-12"></div>
					<div class="rounded bg-gray-300 h-12 min-w-[10rem]"></div>
				</div>
			</AppSkeleton>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ButtonVariantEnum, ToastEnum } from "@/types";
import { SkeletonTypes } from "~/components/AppSkeleton/Skeleton.enum";

const isModalOpen = ref(false);

const { showToast } = useToast()
const showMessage = () => {
    showToast({ message: 'با موفقیت انجام شد', type: ToastEnum.SUCCESS })
}

const textInput = ref('')

const { target, openMenu } = useMenu();
</script>

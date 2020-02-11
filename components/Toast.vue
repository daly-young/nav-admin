<template>
	<transition name="fade">
		<div class="toast" v-if="isOpen">
			<p class="toast-info">{{ toast }}</p>
		</div>
	</transition>
</template>
<script>
	export default {
		name: 'toast',
		data() {
			return {
				toast: '',
				isOpen: false
			}
		},

		methods: {
			openToast(toast) {
				this.toast = toast
				this.isOpen = true
				let timer = setTimeout(() => {
					this.isOpen = false
					clearTimeout(timer)
				}, 2000)
			}
		}
	}
</script>
<style lang="scss">
	.toast {
		position: fixed;
		width: 100%;
		z-index: 121;
		left: 50%;
		top: 80%;
		transform: translate(-50%, -50%);
		-webkit-transform: translate(-50%, -50%);
		text-align: center;
		.toast-info {
			display: inline-block;
			border-radius: 25px;
			background-clip: padding-box;
			background-color: rgba(0, 0, 0, .7);
			margin: 0 auto;
			padding: 0 20px;
			text-align: center;
			font-size: 16px;
			color: #fff;
			line-height: 50px;
			height: 50px;
		}
	}
	
	.fade-enter-active,
	.fade-leave-active {
		transition: opacity 0.8s;
	}
	
	.fade-enter,
	.fade-leave-active {
		opacity: 0;
	}
</style>
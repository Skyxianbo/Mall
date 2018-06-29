<style lang="scss" scoped>
footer {
	width: 100%;
	height: 30px;
	margin-top: 20px;
	line-height: 30px;
	text-align: center;
	border-top: 1px solid #ccc;
}

</style>
<template>
	<footer v-if="show">
		<a href="www.miitbeian.gov.cn">粤ICP备 13020178 号</a>
	</footer>
</template>
<script>
export default {
	data() {
		return {

		}
	},
	computed: {
		show: function() {
			return (this.$route.name != 'login' && this.$route.name != 'error' && this.$route.name != 'home');
		}
	}
}

</script>

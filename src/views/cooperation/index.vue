<style lang="scss" scoped>
div {
	margin: 50px;
	font-size: 24px;
}

</style>
<template>
	<div>{{cooperation}}</div>
</template>
<script>
import { getNotice } from '@/api/notice';
export default {
	name: 'cooperation',
	data() {
		return {
			cooperation: ''
		}
	},
	created() {
		this.getCooperation()
	},
	methods: {
		getCooperation() {
			getNotice({
				type: 2
			}).then(res => {
				this.cooperation = res.returnValue.content;
			})
		}
	}
}

</script>

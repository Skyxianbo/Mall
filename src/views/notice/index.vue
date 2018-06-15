<style lang="scss" scoped>
div {
	margin: 50px;
	font-size: 24px;
}

</style>
<template>
	<div>{{notice}}</div>
</template>
<script>
import { getNotice } from '@/api/notice';
export default {
	name: 'notice',
	data() {
		return {
			notice: ''
		}
	},
	created() {
		this.getNotice()
	},
	methods: {
		getNotice() {
			getNotice({
				type: 1
			}).then(res => {
				this.notice = res.returnValue.content;
			})
		}
	}
}

</script>

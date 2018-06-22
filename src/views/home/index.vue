<style lang="scss" scoped>
.main {
	position: absolute;
	width: 600px;
	top: 30%;
	left: 50%;
	margin-left: -300px;
}

.container {

	border: 5px solid #f4f4f4;
	border-radius: 15px;
	div {
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 20px 30px;
		h1 {
			text-align: center;
		}
		p {
			text-align: center;
			font-size: 20px;
		}
	}
}

footer {
	text-align: center;
	margin-top: 100px;
}

</style>
<template>
	<div class="main">
		<div class="container">
			<div>
				<h1>通知公告</h1>
				<p>{{notice}}</p>
			</div>
		</div>
		<footer>
			<router-link :to="{name: 'goods'}" v-if="show">
				<el-button type="primary" size="medium">确 认</el-button>
			</router-link>
		</footer>
	</div>
</template>
<script>
import { getNotice } from '@/api/notice';
export default {
	name: 'home',
	data() {
		return {
			notice: '',
			show: false
		}
	},
	created() {
		setTimeout(() => {
			this.show = true;
		}, 5000)
		this.getNotice();
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

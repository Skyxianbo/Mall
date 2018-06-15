<style lang="scss" scoped>
.changePassword-container {
	position: absolute;
	width: 500px;
	left: 50%;
	margin-top: 100px;
	margin-left: -250px;
	border: 5px solid #f4f4f4;
	border-radius: 15px;
	.el-form {
		padding: 20px 50px;
		border: 1px solid #ccc;
		border-radius: 10px;
		.title {
			text-align: center;
			font-size: 30px;
		}
		.svg-container {
			width: 30px;
			float: left;
			text-align: center;
			&.svg-container_login {
				.svg-icon {
					width: 20px;
					height: 20px;
				}
			}
		}
		.el-input {
			float: left;
			width: 320px;
		}
		.show-pwd {
			margin-left: 10px;
			cursor: pointer;
		}
		.el-button {
			width: 320px;
			margin-left: 30px;
		}
	}
}

</style>
<template>
	<div class="changePassword-container">
		<el-form autoComplete="on" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
			<h3 class="title">修改密码</h3>
			<!-- <el-form-item prop="username">
				<span class="svg-container svg-container_login">
		           <svg-icon icon-class="user" />
		        </span>
				<el-input name="username" size="medium" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
			</el-form-item> -->
			<el-form-item prop="password">
				<span class="svg-container">
		          <svg-icon icon-class="password"></svg-icon>
		        </span>
				<el-input name="password" size="medium" type="password" v-model="password" autoComplete="on" placeholder="password"></el-input>
				<!-- <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span> -->
			</el-form-item>
			<el-form-item>
				<el-button type="primary" :loading="loading" @click.native.prevent="handleConfirm">
					确 认
				</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>
<script>
import { changePassword } from '@/api/login';
import { getUser } from '@/utils/auth';
export default {
	name: 'changePassword',
	data() {
		return {
			password: '',
			loading: false
		}
	},
	methods: {
		handleConfirm() {
			this.loading = true;
			changePassword(getUser().id, this.password).then(() => {
				this.$alert('修改成功，请重新登录', {
					confirmButtonText: '确定',
					callback: action => {
						this.$store.dispatch('LogOut').then(() => {
							location.reload();
						})
					}
				})
			})
		}
	}
}

</script>

<template>
	<div class="app-header" v-if="show">
		<div class="app-name">
			<p>手机商城</p>
		</div>
		<div class="user-info">
			<section class="date">
				<p>{{date}}</p>
				<p class="user">
					<span>当前用户：{{username}}</span>
					<a href="#" style="color: #ccc;" @click.prevent="logout">退出登录</a>
				</p>
			</section>
		</div>
		<div class="navbar">
			<div class="items">
				<router-link class="item" :class="{active: $route.name == item.children[0].name}" :to="item.path" :key="item.path" v-for="item in routerList" v-if="!item.hidden">
						{{item.children[0].meta.title}}
				</router-link>
			</div>

			</ul>
		</div>
	</div>
</template>
<script>
import { getUser } from '@/utils/auth';
export default {
	computed: {
		date: function() {
			const myDate = new Date(),
				week = ['日', '一', '二', '三', '四', '五', '六'];
			return myDate.getFullYear() + '年' + (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日' + ' 星期' + week[myDate.getDay()];
		},
		username: function() {
			return this.$store.state.user.name || this.user.userName;
		},
		show: function() {
			return (this.$route.name != 'login' && this.$route.name != 'error');
		},
		routerList: function() {
			return this.$router.options.routes;
		},
		user: function() {
			return getUser() || {};
		}
	},
	methods: {
		logout() {
			this.$store.dispatch('LogOut').then(() => {
				location.reload();
			})
		}
	}
}

</script>
<style lang="scss" scoped>
.app-header {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 75px;
	color: white;
	background-color: rgb(50, 163, 214);
	z-index: 100;
	.app-name {
		padding: 0;
		margin: 0;
		float: left;
		height: 75px;
		text-align: left;
		margin-left: 30px;
		p {
			font-size: 30px;
			margin: 0;
			line-height: 75px;
			letter-spacing: 5px;
		}
	}
	.user-info {
		float: left;
		margin-left: 30px;
		display: flex;
		justify-content: center;
		flex-direction: column;
		height: 100%;
		.date {
			font-size: 16px;
			p {
				margin: 10px;
			}
			a {
				margin-left: 10px;
				text-decoration: underline;
			}
		}
	}
	.navbar {
		float: right;
		height: 55px;
		margin: 10px;
		margin-right: 50px;
		background-color: rgb(114, 187, 222);
		border-radius: 20px;
		.items {
			display: flex;
			height: 55px;
			margin: 0;
			padding: 0 30px;
			.item {
				width: 80px;
				height: 55px;
				line-height: 55px;
				text-align: center;
				list-style: none;
				margin: 0 5px;
				&.active {
					background-color: rgb(53, 131, 168);
				}
				&:hover {
					background-color: rgb(53, 131, 168);
				}
			}
		}
	}
}

</style>

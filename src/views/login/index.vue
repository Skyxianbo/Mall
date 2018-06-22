<style rel="stylesheet/scss" lang="scss">
.login-container {
    position: absolute;
    width: 500px;
    top: 20%;
    left: 50%;
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
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title">登 录</h3>
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
          <svg-icon icon-class="user" />
        </span>
                <el-input name="username" size="medium" type="text" v-model="loginForm.username" autoComplete="on" placeholder="username" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
          <svg-icon icon-class="password"></svg-icon>
        </span>
                <el-input name="password" size="medium" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="password"></el-input>
                <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click.native.prevent="handleLogin">
                    Sign in
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name: 'login',
    data() {
        return {
            pwdType: 'password',
            loading: false,
            loginForm: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        showPwd() {
            this.pwdType = this.pwdType == 'password' ? 'text' : 'password';
        },
        handleLogin() {
            this.loading = true;
            this.$store.dispatch('Login', this.loginForm).then(() => {
                this.loading = false;
                this.$router.push({ name: 'goods' });
            }).catch(() => {
                this.loading = false;
            });
        }
    }
}

</script>

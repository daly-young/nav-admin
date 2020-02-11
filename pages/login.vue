<template>
    <div class="login">
        <section class="login__form">
            <h3> 导航系统</h3>
            <p>
                <label for="name">姓名：</label>
                <input type="text" name="name" id="name" placeholder="请填写姓名全拼" v-model="username" />
            </p>
            <p>
                <label for="password">密码：</label>
                <input type="password" name="password" id="password" placeholder="密码不少于6位" v-model="password" />
            </p>
            <div class="login__btns">
                <span :class="{'login__btns-active': toDoLogin,'login__btns-gray': !toDoLogin}" @click="doLogin">登录</span>
                <span :class="{'login__btns-active': !toDoLogin,'login__btns-gray': toDoLogin}" @click="doReg">注册</span>
            </div>
        </section>
        <a href="mailto:wuniu2010@126.com" class="login__mail">问题联系邮箱：wuniu2010@126.com</a>
	    <toast ref="toast"/>
    </div>
    
</template>
<script>
/* global alert */
import { login, register } from '../assets/js/api'
export default {
    name: 'login',
    data() {
        return {
            toDoLogin: true,
            username: '',
            password: ''
        }
    },
    computed: {
        param() {
            return {
                username: this.username,
                password: this.password
            }
        }
    },
    methods: {
        doLogin() {
            if (!this.toDoLogin) {
                this.toDoLogin = true
            } else {
                console.log(this.param, '====')
                this.regName(() => {
                    // 调用登录接口
                    login(this.param).then((data) => {
                        this.callBack(data)
                    })
                })
            }
        },
        doReg() {
            if (this.toDoLogin) {
                this.toDoLogin = false
            } else {
                this.regName(() => {
                    // 调用注册接口
                    register(this.param).then((data) => {
                        this.callBack(data)
                    })
                })
            }
        },
        regName(fn) {
            let nameReg = /^[a-zA-Z]+$/
            if (!nameReg.test(this.username)) {
                this.$refs.toast.openToast('请填写正确的姓名全拼')
                return false
            } else if (this.password.length < 6) {
                this.$refs.toast.openToast('密码不少于6位')
                return false
            }
            fn && fn()
        },
        callBack({ success, errCode, errMsg }) {
            if (success) {
                this.$router.push('/')
            } else {
                this.$refs.toast.openToast(errMsg)
            }
        }
    }
}
</script>
<style lang="sass">
@import '../assets/css/common.scss';
@import '../assets/css/login.scss';
</style>

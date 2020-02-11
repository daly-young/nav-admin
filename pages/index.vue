<template>
    <div class="main">
        <section class="main__nav" style="height:100vh;">
            <p>
                <span :class="{'selected': isPublic}" @click="selectPublicOrPrivate(1)">公有</span>
                <span :class="{'selected': !isPublic}" @click="selectPublicOrPrivate(0)">私有</span>
            </p>
            <ul v-if="cateList.length">
                <li v-for="(item,index) in cateList" @click="selCate(item,index)" :class="{'selected': selIndex===index}">
                    <p>{{item.name}}</p>
                </li>
            </ul>
            <div v-else >
                <img src="../assets/imgs/empty.png">
                <p>没有内容呢，快去添加吧~</p>
                <span @click="toOption" v-if="!isPublic">去添加</span>
            </div>
        </section>
        <section class="main__navlist">
            <ul v-if="urlList.length">
                <li v-for="item in urlList">
                    <a :href="item.content" target="_blank">
                        <span class="main__navlist-img">
                            <img src="../assets/imgs/header.png" />
                        </span>
                        <p>
                            <span>{{item.title}}</span>
                            <span>{{item.content}}</span>
                        </p>
                    </a>
                </li>
            </ul>
            <div v-else>
                <img src="../assets/imgs/empty.png">
                <p>没有内容呢，快去添加吧~</p>
                <span @click="toOption" v-if="!isPublic">去添加</span>
            </div>
        </section>
        <nuxt-link :to="{path: '/option'}" class="set">设置</nuxt-link>
    		
    		<toast ref="toast"/>
    </div>
</template>
<script>
/* global alert */
import { getCateList, getUrlList } from '../assets/js/api'
export default {
    name: 'navMain',
    data() {
        return {
            isPublic: true,
            cateList: [],
            urlList: [],
            selIndex: 0,
            userId: 0,
            first: true
        }
    },
    mounted() {
        this.requestCateList()
    },
    methods: {
        selectPublicOrPrivate(flag) {
            this.isPublic = !!flag
            this.selIndex = 0
            this.first = true
            this.requestCateList()
        },
        requestCateList() {
            getCateList({ isPublic: this.isPublic ? 1 : 0 }).then(({ success, data, errCode, errMsg }) => {
                if (success) {
                    this.cateList = data
                    if (!this.cateList.length) {
                        this.urlList = []
                    } else {
                        this.requestUrlList(data[0]._id)
                    }
                } else {
                    this.failFn(errCode, errMsg)
                }
            })
        },
        requestUrlList(id) {
            getUrlList({ categoryId: id }).then(({ success, data, errCode, errMsg }) => {
                if (success) {
                    this.urlList = data
                } else {
                    this.failFn(errCode, errMsg)
                }
            })
        },
        selCate({ _id }, index) {
            this.selIndex = index
            // 请求项目列表
            this.requestUrlList(_id)
        },
        failFn(errCode, errMsg) {
            if (errCode == -1) {
                this.$router.push('/')
            } else {
                this.$refs.toast.openToast(errMsg)
            }
        },
        toOption() {
            this.$router.push('/option')
        }
    }
}
</script>
<style lang="sass" scoped>
@import '../assets/css/common.scss';
@import '../assets/css/main.scss';
</style>

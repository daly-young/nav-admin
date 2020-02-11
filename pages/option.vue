<template>
    <div class="main">
        <section class="main__nav">
            <p>
                <span :class="{'selected': isPublic}" @click="selectPublicOrPrivate(1)">公有</span>
                <span :class="{'selected': !isPublic}" @click="selectPublicOrPrivate(0)">私有</span>
            </p>
            <ul v-if="cateList.length">
                <li v-for="(item,index) in cateList" :class="{'selected': selIndex===index,'notpower': isPublic&&!isPower,'showEdit': cateEditing}">
                    <div class="main__navContent">
                        <p @click="selCate(item,index)">{{item.name}}</p>
                        <input type="text" v-model="item.name" :placeholder="item.name">
                    </div>
                    <div class=" main__navCateEdit">
                        <span @click="delCate(item,index)">
                            <img src="../assets/imgs/del.png">
                        </span>
                        <span @click="editCate(item,index)">
                            <img src="../assets/imgs/edit.png" v-if="!cateEditing">
                            <img src="../assets/imgs/save.png" v-else>
                        </span>
                    </div>
                </li>
            </ul>
            <div v-else class="main__navNull">
                <img src="../assets/imgs/empty.png">
                <p>{{tipTxt}}</p>
            </div>
            <div class="main__navAdd" v-if="showAdd">
                <input type="text" placeholder="填写链接类目名称" v-model="newCateName">
                <span @click="addCate">新增</span>
            </div>
        </section>
        <section class="main__navlist">
            <ul v-if="urlList.length">
                <li v-for="(item,index) in urlList" :class="{ 'isEdit': selUrlIndex===index, 'notpower': isPublic&&!isPower}" @click="changeStatus(index)">
                    <p>{{item.title}}</p>
                    <p>{{item.content}}</p>
                    <input type="text" v-model="item.title">
                    <textarea v-model="item.content"></textarea>
                    <div>
                        <span @click="delList(item,index)"><i>删除</i></span>
                        <span @click="editList(item,index)"><i>更新</i></span>
                    </div>
                </li>
            </ul>
            <div v-else class="main__navlistNull">
                <img src="../assets/imgs/empty.png">
                <p>{{tipTxt}}</p>
            </div>
            <div class="main__navListAdd" v-if="showAdd">
                <input type="text" placeholder="填写链接名称" v-model="newUrlName">
                <input type="text" placeholder="填写链接地址" v-model="newUrl">
                <span @click="addListItem">新增</span>
            </div>
        </section>
        <nuxt-link :to="{path: '/'}" class="set">退出编辑</nuxt-link>
    		<toast ref="toast"/>
    </div>
</template>
<script>
/* global alert */
import { getCateList, getUrlList, delCateItem, delListItem, addCateItem, addListItem, isPower, editCateItem, editUrl } from '../assets/js/api'
export default {
    name: 'option',
    data() {
        return {
            isPublic: false,
            isPower: false,
            toEdit: false,
            cateList: [],
            urlList: [],
            selIndex: 0,
            selUrlIndex: -1,
            listSelIndex: -1,
            cateEditing: false,
            first: true,
            newCateName: '',
            newUrlName: '',
            newUrl: '',
            selCateId: -1
        }
    },
    computed: {
        showAdd() {
            if (this.isPublic && !this.isPower) {
                return false
            } else {
                return true
            }
        },
        tipTxt() {
            if (this.isPublic && !this.isPower) {
                return '抱歉，您暂时没有权限添加，联系管理员吧~'
            } else {
                return '没有内容呢，快添加吧~'
            }
        }
    },
    mounted() {
        this.getUserType()
    },
    methods: {
        getUserType() {
            isPower().then(({ success, isPower }) => {
                this.isPower = !!isPower
                this.isPublic = this.isPower
                this.requestCateList()
            })
        },
        showEditBlock(index) {
            return this.listSelIndex === index
        },
        showNormalBlock(index) {
            return this.listSelIndex !== index
        },
        showNormalCate(index) {
            if (this.selIndex === index) {
                return this.cateEditing
            } else {
                return true
            }
        },
        selectPublicOrPrivate(flag) {
            this.isPublic = !!flag
            this.selIndex = 0
            this.selUrlIndex = -1
            this.first = true
            this.requestCateList()
        },
        selCate({ _id }, index) {
            this.cateEditing = false
            this.selIndex = index
            this.selUrlIndex = -1
            this.selCateId = _id
            this.requestUrlList(_id)
            // 请求项目列表
        },
        requestCateList() {
            getCateList({ isPublic: this.isPublic ? 1 : 0 }).then(({ success, data, errCode, errMsg }) => {
                if (success) {
                    this.cateList = data
                    if (!this.cateList.length) {
                        this.urlList = []
                    } else {
                        this.selCateId = data[0]._id
                        this.requestUrlList(data[0]._id)
                        this.first = false
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
        editCate(item, index) {
            if (!this.cateEditing) {
                this.cateEditing = true
            } else {
                editCateItem(item).then(({ success, data, errCode, errMsg }) => {
                    if (success) {
                        this.$refs.toast.openToast('更新成功')
                        this.cateEditing = false
                        this.selCateId = data._id
                    } else {
                        this.failFn(errCode, errMsg)
                    }
                })
            }
        },
        delCate({ _id }, index) {
            delCateItem({ categoryId: _id }).then(({ success, errCode, errMsg }) => {
                if (success) {
                    this.cateList.splice(index, 1)
                    if (this.cateList.length) {
                        this.selIndex = 0
                        this.requestUrlList(this.cateList[0]._id)
                        this.cateEditing = false
                    } else {
                        this.urlList = []
                    }
                    this.selIndex = 0
                } else {
                    this.failFn(errCode, errMsg)
                }
            })
        },
        addCate() {
            let param = {
                name: this.newCateName,
                isPublic: this.isPublic ? 1 : 0
            }
            addCateItem(param).then(({ success, data, errCode, errMsg }) => {
                if (success) {
                    this.cateList.unshift(data)
                    this.selCateId = data._id
                    this.selIndex = 0
                    this.urlList = []
                    // console.log(this.cateList, data)
                    this.newCateName = ''
                    this.cateEditing = false
                } else {
                    this.failFn(errCode, errMsg)
                }
            })
        },
        delList({ _id }, index) {
            delListItem({ navId: _id }).then(({ success, errCode, errMsg }) => {
                if (success) {
                    this.urlList.splice(index, 1)
                    this.selUrlIndex = -1
                } else {
                    this.failFn(errCode, errMsg)
                }
            })
        },
        editList(item, index) {
            editUrl(item).then(({ success, errCode, errMsg }) => {
                if (success) {
                    this.$refs.toast.openToast('更新成功')
                    this.selUrlIndex = -1
                } else {
                    this.failFn(errCode, errMsg)
                }
            })
        },
        addListItem() {
            let param = {
                title: this.newUrlName,
                content: this.newUrl,
                categoryId: this.selCateId
            }
            addListItem(param).then(({ success, data, errCode, errMsg }) => {
                if (success) {
                    this.urlList.unshift(data)
                    this.newUrlName = ''
                    this.newUrl = ''
                    this.selUrlIndex = -1
                } else {
                    this.failFn(errCode, errMsg)
                }
            })
        },
        changeStatus(index) {
            this.selUrlIndex = index
        },
        failFn(errCode, errMsg) {
            if (errCode == -1) {
                this.$router.push('/')
            } else {
                this.$refs.toast.openToast(errMsg)
            }
        }
    }
}
</script>
<style lang="sass" scoped>
@import '../assets/css/common.scss';
@import '../assets/css/option.scss';
</style>

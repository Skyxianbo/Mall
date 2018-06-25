<style lang="scss" scoped>
.filter {
    .el-input {
        width: 300px;
    }
    .el-button {
        margin-left: 10px;
    }
}

.form-container {
    width: 100%;
    border: 1px solid #ccc;
    .el-form-item {
        margin: 10px 0;
        .title {
            width: 100px;
            margin: 0 10px;
            float: left;
            text-align: center;
            background-color: rgb(231, 231, 231);
            &.active {
                color: white;
                background-color: rgb(50, 163, 214);
            }
        }
    }
    ul {
        padding: 0;
        margin: 0;
        display: flex;
        li {
            padding: 0 15px;
            list-style: none;
            cursor: pointer;
            &.active {
                color: white;
                background-color: rgb(50, 163, 214);
            }
        }
    }
}

.el-dialog p {
    font-size: 28px;
    text-align: center;
    line-height: 1.5;
}

</style>
<template>
    <div class="app-container">
        <div class="filter">
            <el-form class="form-container">
                <el-form-item>
                    <div :class="['title', {active: !search.classifyId}]" @click="chooseClassify()">全部分类</div>
                    <ul>
                        <li :class="{active: item.id == search.classifyId}" v-for="item in classifyList" @click="chooseClassify(item.id)">{{item.name}}</li>
                    </ul>
                </el-form-item>
                <el-form-item>
                    <div :class="['title', {active: !search.brandId}]" @click="chooseBrand()">全部品牌</div>
                    <ul>
                        <li :class="{active: item.id == search.brandId}" v-for="item in brandList" @click="chooseBrand(item.id)">{{item.name}}</li>
                    </ul>
                </el-form-item>
                <el-form-item>
                    <div class="title">名称</div>
                    <el-input v-model="search.keywords" size="medium" placeholder="请输入关键字"></el-input>
                    <el-button type="primary" size="medium" @click="fetchData()">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div ref="indexTable">
            <el-table :height="height" :data="list" element-loading-text="Loading" border fit highlight-current-row>
                <!-- <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        {{scope.row.name}}
                    </template>
                </el-table-column> -->
                <el-table-column label="型号" align="center">
                    <template slot-scope="scope">
                        {{scope.row.model}}
                    </template>
                </el-table-column>
                <el-table-column label="配置" align="center">
                    <template slot-scope="scope">
                        {{scope.row.config}}
                    </template>
                </el-table-column>
                <el-table-column label="颜色" align="center">
                    <template slot-scope="scope">
                        {{scope.row.color}}
                    </template>
                </el-table-column>
                <el-table-column label="全国价格" align="center">
                    <template slot-scope="scope">
                        <span style="color: red;">￥{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="省内价格" align="center">
                    <template slot-scope="scope">
                        <span style="color: red;">￥{{scope.row.provincePrice}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="库存" align="center">
                    <template slot-scope="scope">
                        {{scope.row.number}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                    <template slot-scope="scope">
                        <router-link style="color: #409EFF" :to="{path: '/order/preOrder/id/'+scope.row.id, query: { name: scope.row.name }}">购买</router-link>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" ref="pages">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="通知公告" :visible.sync="ifDialog" :show-close="showClose" :close-on-click-modal="showClose" width="600px">
            <p>{{notice}}</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="ifDialog = false" :disabled="!showClose">关 闭</el-button>
              </span>
        </el-dialog>
    </div>
</template>
<script>
import { getGoods, addGoods, getClassify, getBrand } from '@/api/goods';
import { getNotice } from '@/api/notice';
export default {
    data() {
        return {
            boxTop: '',
            height: '',
            list: [],
            classifyList: [],
            brandList: [],
            total: 0,
            pageNum: 1,
            pageSize: 20,
            notice: '',
            ifDialog: false,
            showClose: false,
            search: {
                classifyId: '',
                brandId: '',
                keywords: ''
            }
        }
    },
    computed: {
        firstLogin: function() {
            return this.$store.state.user.firstLogin;
        }
    },
    created() {
        this.getNotice();
        this.getClassify();
        this.getBrand();
    },
    mounted() {
        this.boxTop = this.$refs.indexTable.getBoundingClientRect().top;
        this.height = document.documentElement.clientHeight - this.boxTop - 55
        window.addEventListener('resize', this.handleResize);
    },
    activated() {
        this.fetchData();
    },
    methods: {
        getClassify() {
            getClassify({
                parent: 0
            }).then(res => {
                this.classifyList = res.returnValue;
            })
        },
        getBrand() {
            getBrand({
                parent: 1
            }).then(res => {
                this.brandList = res.returnValue;
            })
        },
        fetchData() {
            let param = {
                classifyId: this.search.classifyId,
                brandId: this.search.brandId,
                keywords: this.search.keywords,
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }
            getGoods(param).then(res => {
                this.list = res.returnValue.list;
                this.total = res.returnValue.totalCount;
            })
        },
        handleResize() {
            this.height = document.documentElement.clientHeight - this.boxTop - 55;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.fetchData();
        },
        chooseClassify(id) {
            this.search.classifyId = id;
            this.fetchData();
        },
        chooseBrand(id) {
            this.search.brandId = id;
            this.fetchData();
        },
        getNotice() {
            getNotice({
                type: 1
            }).then(res => {
                this.notice = res.returnValue.content;
                this.ifDialog = true;
                setTimeout(() => {
                    this.showClose = true;
                }, 5000)
            })
        }
    }
}

</script>

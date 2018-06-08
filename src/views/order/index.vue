<style lang="scss" scoped>
.filter {
    .el-input {
        width: 300px;
    }
    .el-button {
        margin-left: 10px;
    }
}

</style>
<template>
    <div class="app-container">
        <div class="filter">
            <el-form class="form-container">
                <el-input v-model="keywords" size="medium" placeholder="请输入订单ID/商品名称"></el-input>
                <el-button type="primary" size="medium" @click="fetchData()">查询</el-button>
            </el-form>
        </div>
        <div ref="indexTable">
            <el-table :height="height" :data="list" element-loading-text="Loading" border fit highlight-current-row>
                <el-table-column label='订单ID' align="center">
                    <template slot-scope="scope">
                        {{scope.row.id}}
                    </template>
                </el-table-column>
                <el-table-column label="商品名称" align="center">
                    <template slot-scope="scope">
                        {{scope.row.goodsName}}
                    </template>
                </el-table-column>
                <el-table-column label="型号" align="center">
                    <template slot-scope="scope">
                        {{scope.row.goodsModel}}
                    </template>
                </el-table-column>
                <el-table-column label="配置" align="center">
                    <template slot-scope="scope">
                        {{scope.row.goodsConfig}}
                    </template>
                </el-table-column>
                <el-table-column label="颜色" align="center">
                    <template slot-scope="scope">
                        {{scope.row.goodsColor}}
                    </template>
                </el-table-column>
                <el-table-column label="单价" align="center">
                    <template slot-scope="scope">
                        {{scope.row.price}}
                    </template>
                </el-table-column>
                <el-table-column label="订单数量" align="center">
                    <template slot-scope="scope">
                        {{scope.row.number}}
                    </template>
                </el-table-column>
                <el-table-column label="总价" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.totalPrices}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="付款图片" align="center">
                    <template slot-scope="scope">
                        <img :src="scope.row.imageUrl" style="width: 50px;height: 50px; cursor: pointer" @click="openImgBox(scope.row.imageUrl)">
                    </template>
                </el-table-column>
                <el-table-column label="是否发货" align="center">
                    <template slot-scope="scope">
                        {{scope.row.audit}}
                    </template>
                </el-table-column>
                <el-table-column label="快递单号" align="center">
                    <template slot-scope="scope">
                        {{scope.row.trackingNumber}}
                    </template>
                </el-table-column>
                <el-table-column label="时间" align="center">
                    <template slot-scope="scope">
                        {{scope.row.datetime}}
                    </template>
                </el-table-column>
                <el-table-column label="地址" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.adress}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="联系人" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.person}}</div>
                    </template>
                </el-table-column>
                <el-table-column label="电话" align="center">
                    <template slot-scope="scope">
                        <div>{{scope.row.tel}}</div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="block" ref="pages">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { getOrder } from '@/api/order';
import { openImageBox } from '@/utils/common';
export default {
    data() {
        return {
            boxTop: '',
            height: '',
            list: [],
            total: 0,
            pageNum: 1,
            pageSize: 20,
            keywords: '',
        }
    },
    created() {
        this.fetchData();
    },
    mounted() {
        this.boxTop = this.$refs.indexTable.getBoundingClientRect().top;
        this.height = document.documentElement.clientHeight - this.boxTop - 125
        window.addEventListener('resize', this.handleResize);
    },
    methods: {
        fetchData() {
            let param = {
                keywords: this.keywords,
                pageSize: this.pageSize,
                pageNum: this.pageNum
            }
            getOrder(param).then(res => {
                this.list = res.returnValue.list;
                this.total = res.returnValue.total;
            })
        },
        handleResize() {
            this.height = document.documentElement.clientHeight - this.boxTop - 125;
        },
        handleSizeChange(val) {
            this.pageSize = val;
            this.fetchData();
        },
        handleCurrentChange(val) {
            this.pageNum = val;
            this.fetchData();
        },
        openImgBox(img) {
            openImageBox(img);
        }
    }
}

</script>

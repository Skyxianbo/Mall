<template>
	<div class="app-container" v-if="flag">
		<el-form class="form-container" :model="formData" label-width="150px" ref="dataForm">
			<div class="title-block">商品信息</div>
			<el-row>
				<!-- 商品名称 -->
				<!-- <el-col :span="24">
					<el-form-item prop="name" label="商品名称" class="postInfo-container-item">
						<span>{{showData.name}}</span>
					</el-form-item>
				</el-col> -->
				<!-- 商品型号 -->
				<el-col :span="24">
					<el-form-item prop="model" label="商品型号" class="postInfo-container-item">
						<span>{{showData.model}}</span>
					</el-form-item>
				</el-col>
				<!-- 商品配置 -->
				<el-col :span="24">
					<el-form-item prop="config" label="商品配置" class="postInfo-container-item">
						<span>{{showData.config}}</span>
					</el-form-item>
				</el-col>
				<!-- 商品颜色 -->
				<el-col :span="24">
					<el-form-item prop="color" label="商品颜色" class="postInfo-container-item">
						<span>{{showData.color}}</span>
					</el-form-item>
				</el-col>
				<!-- 全国价格 -->
				<el-col :span="24">
					<el-form-item prop="price" label="全国价格" class="postInfo-container-item">
						<span>{{showData.price}}</span>
					</el-form-item>
				</el-col>
				<!-- 省内价格 -->
				<el-col :span="24">
					<el-form-item prop="provincePrice" label="省内价格" class="postInfo-container-item">
						<span>{{showData.provincePrice}}</span>
					</el-form-item>
				</el-col>
				<!-- 商品库存 -->
				<el-col :span="24">
					<el-form-item prop="number" label="商品库存" class="postInfo-container-item">
						<span>{{showData.number}}</span>
					</el-form-item>
				</el-col>
			</el-row>
			<div class="title-block">购买配置</div>
			<el-row>
				<el-form-item label="付款图片上传" prop="imageUrl">
					<el-upload class="upload-demo" :action="uploadUrl" :on-success="fileUploadData" :limit="1" :file-list="fileList" list-type="picture" style="width: 400px;">
						<el-button size="small" type="primary">点击上传</el-button>
					</el-upload>
				</el-form-item>
				<!-- 选择全国价格还是省内价格 -->
				<el-col :span="24">
					<el-form-item prop="isNationwide" label="选择价格" class="postInfo-container-item">
						<el-radio-group v-model="formData.isNationwide">
							<el-radio label="1">全国价格</el-radio>
							<el-radio label="2">省内价格</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<!-- 购买数量 -->
				<el-col :span="24">
					<el-form-item prop="number" label="购买数量" class="postInfo-container-item">
						<el-input-number v-model="formData.number" :min="1" label="购买数量" style="width: 200px;"></el-input-number>
					</el-form-item>
				</el-col>
				<!-- 商品总价 -->
				<el-col :span="24">
					<el-form-item prop="totalPrice" label="商品总价" class="postInfo-container-item">
						<span>{{totalPrice}}</span>
					</el-form-item>
				</el-col>
				<!-- 收货人 -->
				<el-col :span="24">
					<el-form-item prop="person" label="收货人" class="postInfo-container-item">
						<el-input size="medium" v-model="formData.person" placeholder="请填写收货人" style="width: 400px">
						</el-input>
					</el-form-item>
				</el-col>
				<!-- 联系方式 -->
				<el-col :span="24">
					<el-form-item prop="tel" label="联系方式" class="postInfo-container-item">
						<el-input size="medium" v-model="formData.tel" placeholder="请填写联系方式" style="width: 400px">
						</el-input>
					</el-form-item>
				</el-col>
				<!-- 收货地址 -->
				<el-col :span="24">
					<el-form-item prop="adress" label="收货地址" class="postInfo-container-item">
						<el-input type="textarea" size="medium" v-model="formData.adress" placeholder="请填写收货地址" style="width: 400px">
						</el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<div class="sub-navbar draft">
			<el-button type="primary" @click="sendData">确 认</el-button>
		</div>
	</div>
</template>
<script>
import { getGoods } from '@/api/goods';
import { addOrder, checkOrder } from '@/api/order';
import { getToken } from '@/utils/auth';
export default {
	data() {
		return {
			flag: false,
			fileList: [],
			showData: {},
			formData: {
				person: '',
				tel: '',
				adress: '',
				number: '',
				imageUrl: '',
				isNationwide: '1'
			},
			uploadUrl: `${process.env.BASE_API}/image/upload?token=${getToken()}`,
			rules: {
				person: [{ required: true, message: "请填写收货人" }],
				tel: [{ required: true, message: "请填写联系方式" }],
				adress: [{ required: true, message: "请填写地址" }],
				number: [{ required: true, message: "请填写购买数量" }],
			}
		}
	},
	computed: {
		totalPrice() {
			return this.formData.isNationwide == 1 ? this.showData.price * this.formData.number : this.showData.provincePrice * this.formData.number;
		}
	},
	created() {
		this.getGoods();
	},
	methods: {
		getGoods() {
			let param = {
				id: this.$route.params.id,
				keywords: '',
				pageSize: 20,
				pageNum: 1
			}
			getGoods(param).then(res => {
				this.flag = true;
				this.showData = res.returnValue.list[0];
			})
		},
		sendData() {
			if (!this.formData.imageUrl) {
				this.$message.error('请上传付款图片');
				return;
			}
			this.$confirm(`您确认要提交此订单吗？`, '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				checkOrder({
					isPay: 0
				}).then(res => {
					if (res.returnValue && res.returnValue.length != 0) {
						this.$message('您当前存在未付清货款，无法下单');
						return;
					} else {
						addOrder({
							goodsId: this.showData.id,
							goodsName: this.showData.name,
							number: this.formData.number,
							imageUrl: this.formData.imageUrl,
							price: this.formData.isNationwide == 1 ? this.showData.price : this.showData.provincePrice,
							adress: this.formData.adress,
							person: this.formData.person,
							tel: this.formData.tel,
							totalPrice: this.totalPrice
						}).then(res => {
							this.$message({
								type: 'success',
								message: '已提交订单!'
							});
							this.$router.push({ name: 'order' });
						})
					}
				})
			}).catch(() => {})
		},
		fileUploadData(res) {
			this.formData.imageUrl = res.returnValue;
		}
	}
}

</script>
<style lang="scss" scoped>
.app-container {
	margin-bottom: 50px;
}

.title-block {
	border-bottom: solid 1px #e6e6e6;
	padding-bottom: 10px;
	margin-bottom: 20px;
}

</style>

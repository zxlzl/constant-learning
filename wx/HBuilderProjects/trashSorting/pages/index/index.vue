<template>
	<view>
		<button type="primary" @click="getImage">拍照或从相册选择</button>
		<view>
			<image :src="imagepath" mode="widthfix"></image>
			<view>
				{{keyword}}
			</view>
			<view v-if="classfy">
				{{classfy.matched?classfy.matched.typename:""}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				imagepath: '',
				keyword: '',
				classfy: null
			}
		},
		onLoad() {



		},
		methods: {
			// 拆解需求
			// 1.选择或者拍照
			getImage() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						this.imagepath = res.tempFilePaths[0]
						// console.log(res)
						this.image2Base64(this.imagepath)
					}
				})
			},
			// 2.图片路径转base64
			image2Base64(path) {
				// #ifdef MP-WEIXIN
				wx.getFileSystemManager().readFile({
					filePath: path,
					encoding: "base64",
					success: async (res) => {
						const result = res.data
						const classfy_res = await this.imageClassfy(result)
						this.parseClassfyResult(classfy_res.result.result)
					}
				});
				// #endif
				// #ifdef APP-PLUS
				plus.io.resolveLocalFileSystemURL(
					path,
					(entry)=>{
						entry.file((file)=>{
							let reader = new plus.io.FileReader()
							reader.onloadend=async (e)=>{
								const result = e.target.result.substr(22)
								const classfy_res = await this.imageClassfy(result)
								console.log(classfy_res)
								this.parseClassfyResult(classfy_res.result.result)
							}
							reader.readAsDataURL(file)
						})
					}
				)
				// #endif

			},
			// 3.调用百度图像识别api
			async imageClassfy(b64) {
				// let [error, res]= await uni.request({
				// 	url: "https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=O9rBRBPjiHF79GxrTEK6tXyp&client_secret=BQEIENCnoizwBVxBIQaTph6FlTxafZDz",

				// })
				// console.log(res)
				// let access_token = res.data.access_token
				// let [err, re]= await uni.request({
				// 	url:"https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",
				// 	method:"POST",
				// 	header:{
				// 		"Content-Type": "application/x-www-form-urlencoded"
				// 	},
				// 	data:{
				// 		access_token:access_token,
				// 		image: b64
				// 	}
				// })
				// this.parseClassfyResult(re.data.result)

				return new Promise((resolve, reject) => {
					uniCloud.callFunction({
						name: 'imageclassfy',
						data: {
							base64: b64,
						},
						success: (res) => {
							resolve(res)
							// this.parseClassfyResult(res.result.result)
						}
					})
				})

			},
			// 4.展示图像识别结果
			async parseClassfyResult(res) {
				console.log(res)
				let itemLists = []
				let abs_result_index
				for (let i = 0; i < res.length; i++) {
					itemLists.push(res[i].keyword + " " + (res[i].score.toFixed(2) * 100) + "%");
					if (res[i].score >= .7) {
						abs_result_index = i
						break
					}
				}
				if (abs_result_index >= 0) {
					let kw = res[abs_result_index].keyword
					console.log('命中', kw)
					await this.searchKeyWord(kw)
					return
				}
				uni.showActionSheet({
					itemList: itemLists,
					success: async (result) => {
						await this.searchKeyWord(res[result.tapIndex].keyword)
					}
				})
			},
			// 5.使用图像识别后的结果 去查询垃圾所属分类 展示结果
			searchKeyWord(kw) {
				this.keyword = kw
				return new Promise((resolve, reject) => {
					uniCloud.callFunction({
						name: "TrashClassify",
						data: {
							keyword: kw,
						},
						success: (res) => {
							this.classfy = res.result
							console.log(res.result)
						}
					})
				})
			}

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

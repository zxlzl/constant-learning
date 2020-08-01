'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)

	const res = await uniCloud.httpclient.request(
		"https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=O9rBRBPjiHF79GxrTEK6tXyp&client_secret=BQEIENCnoizwBVxBIQaTph6FlTxafZDz", {
			dataType: 'json'
		}
	)
	const access_token = res.data.access_token
	
	const classify_res = await uniCloud.httpclient.request("https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general",{
		dataType:"json",
		method:"POST",
		header:{
				"Content-Type": "application/x-www-form-urlencoded"
			},
		data: {
			access_token:access_token,
			image: event.base64
		}
	})
	//返回数据给客户端
	return classify_res.data
};

export default{
	isdebug: process.env.NODE_ENV =="development",
	base_url: process.env.NODE_ENV == "development" ? "http://huaruntest.uboche.net/" : "https://wanxiang.uboche.net/",
	signKey: "3338244878952c728218406144f94be4"
}
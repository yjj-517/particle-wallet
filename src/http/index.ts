// // 接口调用
import axios from "axios";
import { accountStores } from "@/store"; //store
import { message } from "antd";

const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_API, // api 的 base_url
	timeout: 10000, // request timeout
	headers: {
		"Content-Type": "application/json; charset=utf-8", //请求头
	},
});

// 请求拦截
service.interceptors.request.use(
	(config: any) => {
		const { userToken } = accountStores.getState(); //userToken
		if (userToken) {
			// 如果登录就携带token
			config.headers["Authorization"] = "Bearer " + userToken;
		}
		// console.log("config-->", config);
		return config;
	},
	(error: any) => {
		// console.log("error-->", error);
		return Promise.reject(error);
	},
);

// 响应拦截器
service.interceptors.response.use(
	response => {
		// console.log("response=>", response);
		// 对响应数据做点什么
		const res = response.data;
		const { delUser } = accountStores.getState(); //userToken
		if (res.code === 401) {
			// `token` 过期或者账号已在别处登录
			// window.location.href = "/"; // 去主页
			delUser();
		} else {
			return response.data;
		}
	},
	error => {
		const { delUser } = accountStores.getState(); //token
		// console.log("error-->", error);
		// 对响应错误做点什么
		if (error.message.indexOf("timeout") != -1) {
			message.warning("Network Timeout");
		} else if (error.response.status === 401) {
			// `token` 过期或者账号已在别处登录
			message.warning("Login status is invalid, please log in again!");
			delUser();
			// window.location.href = "/"; // 去主页
		} else {
			message.warning("Unknown Error. Please check your network.");
		}

		return Promise.reject(error);
	},
);
export default service;

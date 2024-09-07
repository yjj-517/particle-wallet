//api接口统一管理
import service from "../index";
// import qs from "qs";

// 获取单个轮播图配置
export const getRawConfig = async (config_id: string) =>
	await service({
		url: `/raw-config/${config_id}`,
		method: "get",
	});

// 获取所有轮播图配置
export const getRawConfigs = async () =>
	await service({
		url: "/raw-configs",
		method: "get",
	});

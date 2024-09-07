//collections接口统一管理
import service from "../index";

// 分组列出所有的资产
export const getListByGroup = async (params: any) =>
	await service({
		url: "/asset/list-by-group",
		method: "get",
		params: params,
	});

// 查询资产列表合集
export const getCollections = async (params: any) =>
	await service({
		url: "/asset/collections",
		method: "get",
		params: params,
	});

// 资产详情
export const getNftDetail = async (params: any) =>
	await service({
		url: "/asset/nft-detail",
		method: "get",
		params: params,
	});

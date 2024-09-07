//simdunk接口统一管理
import service from "../index";
// import qs from "qs";

// 获取所有player配置
export const getPlayers = async (params: any) =>
	await service({
		url: "/players",
		method: "get",
		params: params,
	});

// 获取单个player配置
export const getPlayer = async (player_id: string) =>
	await service({
		url: `/player/${player_id}`,
		method: "get",
	});

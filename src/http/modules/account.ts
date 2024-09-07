//account接口统一管理
import service from "../index";

// 登录
export const postAuthLogin = async (data: any) =>
	await service({
		url: "/auth/login",
		method: "post",
		data: data,
	});

// 获取用户信息
export const getProfile = async () =>
	await service({
		url: "/user/profile",
		method: "get",
	});

// 同意用户协议
export const postAgreeAgreement = async () =>
	await service({
		url: "/user/agree-agreement",
		method: "post",
	});

// 修改用户信息
export const postUpdateProfile = async (data: any) =>
	await service({
		url: "/user/update-profile",
		method: "post",
		data: data,
	});

// 修改用户信息
export const getAvatarSelectionLibrary = async () =>
	await service({
		url: "/avatar-selection-library",
		method: "get",
	});

// <!-- account-view -->
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDisconnect } from "@particle-network/connectkit";

import { accountStores } from "@/store/index"; //store
import { getProfile } from "@/http/modules/account"; //接口

// import IconDunk from "@/assets/imgs/wallet/icon-simdunk-dunk.svg";
// import IconSq from "@/assets/imgs/wallet/icon-sq.svg";
import IconCopy from "@/assets/imgs/common/icon-copy.svg?react";
import IconClose from "@/assets/imgs/common/icon-close.svg?react";
import IconUser from "@/assets/imgs/account/top/icon-user.svg?react";
import IconUserDisconnect from "@/assets/imgs/account/top/icon-user-disconnect.svg?react";

const View: React.FC = () => {
	const { disconnect } = useDisconnect(); //wallet-断开连接
	const { userInfo, editUser, delUser, userToken } = accountStores(); //account
	const navigate = useNavigate(); //路由跳转
	const [display, setDisplay] = useState<boolean>(false); //定义user显示
	const userRef = useRef<HTMLDivElement>(null); //用户信息弹窗

	useEffect(() => {
		// 定义点击user框外消失
		const handleClickOutside = (event: MouseEvent) => {
			if (userRef.current && !userRef.current.contains(event.target as Node)) {
				setDisplay(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [userRef.current]);

	// 获取用户信息
	const getUser = () => {
		if (userToken) {
			getProfile().then((res: any) => {
				if (res.code === 0) {
					editUser(res.data.user_info);
				}
			});
		}
	};
	useEffect(() => {
		getUser();
	}, [display]);

	// 退出登录
	const exitUser = () => {
		disconnect(); //断开wallet
		delUser(); //清除token
	};

	return (
		<div className="relative">
			<button
				className="flex justify-center items-center bg-white/20 rounded-lg overflow-hidden"
				onClick={() => {
					setDisplay(true);
				}}
			>
				<img src={userInfo.avatarImg} className="size-[40px] object-cover" />
				<span className="font-Quantico text-lg font-bold px-2.5 hidden md:block">
					{userInfo.address.slice(0, 6) + "..." + userInfo.address.slice(-4)}
				</span>
			</button>
			{display ? (
				<div
					ref={userRef}
					className="absolute top-[50px] right-0 trove-scrollbar p-5 w-[90vw] md:w-[320px] max-h-[80vh] rounded-xl bg-bgcolor-200 flex flex-col gap-5"
				>
					<button
						className="absolute right-4 top-4 p-1 group"
						onClick={() => {
							setDisplay(false);
						}}
					>
						<IconClose className="size-4 group-hover:text-primary" />
					</button>
					{/* user-info */}
					<div className="flex items-center gap-2 mt-4">
						<img src={userInfo.avatarImg} className="size-[48px] object-cover rounded-lg" />
						<div className="flex flex-col">
							<p className="text-sm font-primary text-primary">{userInfo.nickname}</p>
							<div className="flex items-center gap-2">
								<p className="text-sm text-text-200"> {userInfo.address.slice(0, 5) + "..." + userInfo.address.slice(-4)}</p>
								<IconCopy
									className="text-text-200 hover:text-white cursor-pointer size-5"
									onClick={() => {
										navigator.clipboard.writeText(userInfo.address);
									}}
								/>
							</div>
						</div>
					</div>
					{/* 跳转 */}
					<div
						className="group flex items-center cursor-pointer"
						onClick={() => {
							navigate("/account");
							setDisplay(false);
						}}
					>
						<IconUser className="size-6 " />
						<span className="ml-2 group-hover:underline ">My Profile</span>
					</div>
					<div className="border-t border-dashed border-text-300"></div>
					{/* <div className="flex flex-col gap-3">
							// 代币
							<div className="font-bold">Currency Breakdown</div>
							<div className="flex justify-between items-center px-4 h-[56px] bg-bgcolor-100 rounded-lg">
								<div className="flex items-center gap-1.5">
									<img src={IconDunk} className="size-6 object-cover rounded-full" />
									<span>DUNK</span>
								</div>
								<p className="font-Quantico">{userInfo.dunkPrice}</p>
							</div>
							<div className="flex justify-between items-center px-4 h-[56px] bg-bgcolor-100 rounded-lg">
								<div className="flex items-center gap-1.5">
									<img src={IconSq} className="size-6 object-cover rounded-full" />
									<span>SQ</span>
								</div>
								<p className="font-Quantico">{userInfo.dunkPrice}</p>
							</div>
						</div>
						<div className="border-t border-dashed border-text-300"></div> */}
					{/* 退出登录 */}
					<div className="flex justify-end items-center">
						<button
							className="flex items-center gap-3 text-text-200 hover:text-white"
							onClick={() => {
								exitUser();
							}}
						>
							<span>Disconnect</span>
							<IconUserDisconnect />
						</button>
					</div>
				</div>
			) : (
				<></>
			)}
		</div>
	);
};

export default View;

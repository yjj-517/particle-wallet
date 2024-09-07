import React, { useState, useEffect } from "react";

import { getProfile } from "@/http/modules/account"; //接口
import { accountStores } from "@/store/index"; //store
import { useAccount, useDisconnect } from "@particle-network/connectkit";

import ConntenWallet from "@/layout/account-view/connect-wallet/index";
import AccountInfo from "@/layout/account-view/account-info/index";
import AccountType from "./account-type/index";

const View: React.FC = () => {
	const { userToken, delUser, editUser, userInfo, setUserLocalStorage } = accountStores(); //store

	const { disconnect } = useDisconnect(); //wallet-断开连接
	const { address, isConnected, isConnecting, isReconnecting, isDisconnected } = useAccount();
	const [walletConnect, setWalletConnect] = useState<number>(0); //wallet-连接判断0-默认/1-连接/2-未连接
	useEffect(() => {
		// console.log("isConnecting", isConnecting); //正在连接
		// console.log("isReconnecting", isReconnecting); //正在重新连接
		// console.log("isDisconnected", isDisconnected); //是否断开连接
		// console.log("isConnected", isConnected); //是否已经连接
		// <-这里是因为钱包连接的默认值都不正确,这里是为了等待默认值的正确的数值改变->
		if (isConnected) {
			setWalletConnect(1);
		} else {
			setWalletConnect(2);
		}
	}, [isConnected]);
	useEffect(() => {
		// 判断用户手动断开钱包连接
		if (userToken && walletConnect === 1 && !isConnecting && !isReconnecting && isConnected) {
			// 判断用户连接钱包--token未过期
			getProfile()
				.then((res: any) => {
					// console.log(res);
					if (res.code === 0) {
						editUser(res.data.user_info);
					} else {
						disconnect(); //断开wallet
						delUser(); //清除token
					}
				})
				.catch(err => {
					console.log(err);
					disconnect(); //断开wallet
					delUser(); //清除token
				});
		} else if (walletConnect === 2 && !isConnecting && !isReconnecting && isDisconnected) {
			// 判断用户断开钱包--token过期
			disconnect();
			delUser();
		}
	}, [userToken, walletConnect, isConnecting, isReconnecting, isDisconnected, isConnected]);
	useEffect(() => {
		// 判断用户手动切换钱包连接
		if (isConnected && address && userToken) {
			if (userInfo.address.toLowerCase() !== address.toLowerCase()) {
				disconnect();
				delUser();
			}
		}
	}, [isConnected, address, userToken]);
	// 监听储存用户数据在多个窗口的数据同步问题
	useEffect(() => {
		const handleStorageEvent = (event: any) => {
			if (event.key === "sim-account") {
				const storedState = JSON.parse(localStorage.getItem("sim-account") ?? "null");
				// console.log(storedState);
				setUserLocalStorage(storedState.state.userToken, storedState.state.userInfo);
			}
		};
		window.addEventListener("storage", handleStorageEvent);
		return () => {
			window.removeEventListener("storage", handleStorageEvent);
		};
	}, [isConnected]);

	return (
		<>
			{userToken ? (
				<>
					<div className="md:flex hidden">
						<AccountType />
					</div>
					<AccountInfo />
				</>
			) : (
				<ConntenWallet />
			)}
		</>
	);
};

export default View;

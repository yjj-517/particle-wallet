import React, { useEffect, useState } from "react";

import { postAuthLogin } from "@/http/modules/account"; //接口
import { accountStores } from "@/store/index"; //store
import { useWallets, useAccount, useModal, useDisconnect } from "@particle-network/connectkit";
import { ethers } from "ethers"; //ethers
import { setSignmessage } from "@/wallet/wallet"; //签名数据

import { message } from "antd"; //anta
import IconSpin from "@/assets/imgs/common/icon-spin.svg?react"; //IconSpin

const View: React.FC = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false); //Loading
	const { addUser, userToken, delUser } = accountStores(); //store
	const { address, isConnected, isConnecting, isReconnecting } = useAccount();
	const { setOpen } = useModal(); //wallet-弹窗
	const { disconnect } = useDisconnect(); //wallet-弹窗
	const [primaryWallet] = useWallets(); // EOA 的 EIP-1193 提供程序来管理帐户

	// 点击连接钱包按钮
	const connectWallet = async () => {
		if (accountStores.getState().userToken) {
			setOpen(true); //打开kit
		} else {
			disconnect(); //断开wallet
			delUser(); //清除token
			setOpen(true); //打开kit
		}
	};

	// 连接钱包--登录
	const walletLogin = async () => {
		if (!userToken && address && !isLoading && primaryWallet) {
			try {
				setIsLoading(true); //loading
				const EOAprovider: any = await primaryWallet.connector.getProvider();
				const provider = new ethers.BrowserProvider(EOAprovider, "any");
				const signer = await provider.getSigner();
				// 签名--账号----1-登录前面
				const signmessageStr = setSignmessage(address, 1);
				await signer
					.signMessage(signmessageStr)
					.then(async (res: any) => {
						// 绑定签名成功请求接口
						const obj = {
							address: await signer.getAddress(),
							wallet_type: 1,
							signature: res,
							sign_date: signmessageStr,
						};
						// console.log(obj);
						// 签名验证接口
						postAuthLogin(obj)
							.then((res: any) => {
								setIsLoading(false); //loading
								// console.log(res);
								if (res.code === 0) {
									addUser(res.data.token_info.token, res.data.user_info); //修改用户数据
								} else {
									message.warning(res.message);
									disconnect(); //断开wallet
									delUser(); //清除token
								}
							})
							.catch(err => {
								setIsLoading(false); //loading
								message.warning(err.message);
								disconnect(); //断开wallet
								delUser(); //清除token
							});
					})
					.catch(err => {
						console.log(err);
						setIsLoading(false); //loading
						disconnect(); //断开wallet
						delUser(); //清除token
					});
			} catch (err) {
				console.log(err);
				setIsLoading(false); //loading
				disconnect(); //断开wallet
				delUser(); //清除token
			}
		}
	};

	// 根据连接了钱包用户信息判断
	useEffect(() => {
		const timer = setTimeout(() => {
			if (primaryWallet && !isConnecting && !isReconnecting && isConnected) {
				walletLogin();
			}
		}, 500); // 500ms后触发
		return () => {
			clearTimeout(timer);
		};
	}, [primaryWallet, isConnecting, isReconnecting, isConnected]);

	return (
		<button
			className="primary-button w-[120px] py-2 "
			onClick={() => {
				connectWallet();
			}}
		>
			{isLoading ? <IconSpin className="size-7 animate-spin-slow-1" /> : <span>Connect Wallet</span>}
		</button>
	);
};

export default View;

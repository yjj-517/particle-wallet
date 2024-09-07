// particle-wallet ----kit

import React from "react";

import { ConnectKitProvider, createConfig } from "@particle-network/connectkit";
import { authWalletConnectors } from "@particle-network/connectkit/auth";
// evm start
import { mainnet, arbitrum, arbitrumSepolia } from "@particle-network/connectkit/chains";
import { evmWalletConnectors } from "@particle-network/connectkit/evm";
import IconEthereum from "@/assets/imgs/wallet/icon-china-ethereum.svg";
import IconArbitrumOne from "@/assets/imgs/wallet/icon-china-arbitrum-one.svg";
import IconArbitrumSepolia from "@/assets/imgs/wallet/icon-china-arbitrum-sepolia.svg";

const projectId = import.meta.env.VITE_PARTICLE_PROJECT_Id as string;
const clientKey = import.meta.env.VITE_PARTICLE_CLIENT_KEY as string;
const appId = import.meta.env.VITE_PARTICLE_APP_ID as string;
const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string;

const config = createConfig({
	projectId, //particle-projectId
	clientKey, //particle-clientKey
	appId, //particle-appId
	appearance: {
		recommendedWallets: [
			{ walletId: "metaMask", label: "Recommended" },
			{ walletId: "walletConnect", label: "Popular" },
		], //evm钱包排序
		hideContinueButton: true, // 关闭邮箱下面的按钮
		language: "en-US", //默认语言
		mode: "dark", //默认主题
		logo: "", //头部logo
	},
	walletConnectors: [
		// evm start
		evmWalletConnectors({
			walletConnectProjectId: walletConnectProjectId, //walletConnect
		}),
		authWalletConnectors({
			promptSettingConfig: {
				// Optional, changes the frequency in which the user is asked to set a master or payment password
				// 0 = Never ask
				// 1 = Ask once
				// 2 = Ask always, upon every entry
				// 3 = Force the user to set this password
				promptMasterPasswordSettingWhenLogin: 1, //登录输入密码
				promptPaymentPasswordSettingWhenSign: 1, //初次注册设置密码
			},
		}),
	],
	chains: [
		{ ...(mainnet as any), chinaIcon: IconEthereum },
		{ ...(arbitrum as any), chinaIcon: IconArbitrumOne },
		{ ...(arbitrumSepolia as any), chinaIcon: IconArbitrumSepolia },
	], //chains
	// chains: [
	// { ...(mainnet as any), chinaIcon: IconEthereum },
	// { ...(arbitrum as any), chinaIcon: IconArbitrumOne },
	// { ...(arbitrumSepolia as any), chinaIcon: IconArbitrumSepolia },
	// ], //chains
});

// Wrap your application with this component.
export const ParticleConnectkit = ({ children }: React.PropsWithChildren) => {
	return <ConnectKitProvider config={config}>{children}</ConnectKitProvider>;
};

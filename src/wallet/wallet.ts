// 签名数据储存
export const setSignmessage = (address: string, walletSignType: number) => {
	//walletSignType //1-绑定钱包/2-解绑钱包/101-mint
	let signmessage: string = ""; //签名字段
	const timeDate = new Date().getTime() / 1000; //当前标准时间戳
	if (walletSignType === 1) {
		signmessage =
			`simsports.io wants you to sign in with your Wallet address: ` +
			address +
			`
Please ensure that the domain above matches the URL of the current website.
Issued At: ` +
			Math.ceil(timeDate);
	} else {
		signmessage = "Welcome to Simsports.";
	}
	return signmessage;
};

// ipfs
export const ipfsGatewayURL = "https://ipfs.decentralized-content.com/ipfs";

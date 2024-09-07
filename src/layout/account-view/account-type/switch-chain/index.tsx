import React, { useState, useEffect } from "react";

import { useChains, useAccount, useModal } from "@particle-network/connectkit";

const View: React.FC = () => {
	const { setOpen } = useModal(); //wallet-弹窗
	const { chain } = useAccount(); //chain
	const chains = useChains(); //chains
	const [isLoading, setIsLoading] = useState<boolean>(false); //Loading
	// // 监听chain改变
	const isChain = () => {
		const isChainExists = chains.some(item => item.id === chain?.id);
		if (isChainExists) {
			setIsLoading(true); //Loading
		} else {
			setIsLoading(false); //Loading
		}
	};
	useEffect(() => {
		isChain();
	}, [chain]);

	return (
		<>
			<>
				{isLoading ? (
					<>
						{chains.length > 0 && (
							<button
								onClick={() => {
									setOpen(true);
								}}
								// disabled={!account}
								className="p-1.5 bg-white/20 rounded-lg flex items-center justify-center"
							>
								{chains.map((item: any, index: React.Key | null | undefined) => {
									return (
										<React.Fragment key={index}>
											{chain?.id == item.id && <img src={item.chinaIcon} className="size-[28px]" />}
										</React.Fragment>
									);
								})}
							</button>
						)}
					</>
				) : (
					<button
						className="primary-button p-1.5"
						onClick={() => {
							setOpen(true);
						}}
					>
						Switch Network
					</button>
				)}
			</>
		</>
	);
};

export default View;

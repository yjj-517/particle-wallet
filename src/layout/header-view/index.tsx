// header-view
import React from "react";

import { ConnectButton } from "@particle-network/connectkit";
import AccountView from "@/layout/account-view/index";

const View: React.FC = () => {
	return (
		<>
			<div className="fixed top-0 left-1/2 z-50 mx-auto max-h-screen w-screen -translate-x-1/2 flex flex-col justify-between items-center p-3 md:p-6">
				<div className="max-w-[1440px] w-full bg-bgcolor-100/40 px-5 py-3 lg:py-4 backdrop-blur-lg  rounded-2xl flex justify-between items-center gap-4 border border-white/5">
					<AccountView />
				<ConnectButton />
				</div>
			
			</div>
		</>
	);
};

export default View;

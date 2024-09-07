import React from "react";
import { Outlet } from "react-router-dom";

import { accountStores } from "@/store/index"; //store

import HeaderView from "./header-view";
import FooterView from "./footer-view";
import AccountType from "./account-view/account-type/index";

const View: React.FC = () => {
	const { userToken } = accountStores(); //account

	return (
		<div className="relative max-w-[100vw]">
			<div className="relative w-full overflow-x-hidden">
				<HeaderView />
				<div className="relative w-full min-h-[calc(100vh-var(--sm-footer-height))]">
					<Outlet />
				</div>
				<FooterView />
			</div>
			{userToken && (
				<div className="sticky bottom-0 bg-bgcolor-100 z-20 p-2 w-full flex justify-end items-center md:hidden">
					<AccountType />
				</div>
			)}
		</div>
	);
};

export default View;

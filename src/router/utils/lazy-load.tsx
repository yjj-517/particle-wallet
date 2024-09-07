import React, { FC } from "react";
// 懒加载模式的写法，外面需要套一层loading提示的加载组件
// {Element} Comp 需要访问的组件
import "./lazy-load.css";

const withLoading = (Comp: React.LazyExoticComponent<FC>): React.ReactNode => {
	return (
		<React.Suspense fallback={<div id="loading-box">Loading...</div>}>
			<Comp />
		</React.Suspense>
	);
};

export default withLoading;

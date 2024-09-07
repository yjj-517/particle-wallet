import { useEffect } from "react";
import { useRoutes, Navigate, useLocation } from "react-router-dom";
import { RouteObject } from "react-router-dom";
// 定义模块化路由
export const routeModuleList: RouteObject[] = [];
// 导入所有router
const modules: any = import.meta.glob("./modules/**/*.tsx", { eager: true });
// 处理路由
Object.keys(modules).forEach(key => {
	// console.log(key); //输出属性名
	const mod = modules[key].default || {};
	const modList = Array.isArray(mod) ? [...mod] : [mod];
	routeModuleList.push(...modList);
});

export const rootRouter: RouteObject[] = [
	{
		path: "/",
		element: <Navigate to="/home" />, //重定向
	},
	// 嵌套路由
	...routeModuleList,
	// 通配符配置:重定向或者404
	{
		path: "*",
		element: <Navigate to="/exception/404" />,
	},
];

const ScrollToTop = () => {
	const location = useLocation();
	useEffect(() => {
		// 回到顶部
		window.scrollTo(0, 0);
	}, [location.pathname]); // 在 location.pathname 变化时触发滚动

	return null;
};

const Router = () => {
	const routes = useRoutes(rootRouter);
	return (
		<>
			<ScrollToTop />
			{routes}
		</>
	);
};

export default Router;

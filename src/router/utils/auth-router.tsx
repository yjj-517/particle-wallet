// // 路由守卫
// import { useLocation, Navigate } from "react-router-dom";
// import { rootRouter } from "@/router/index";
// import { RouteObject } from "@/router/interface";

// export const searchRoute = (path: string, routes: RouteObject[] = []): RouteObject => {
// 	let result: RouteObject = {};
// 	for (const item of routes) {
// 		if (item.path === path) return item;
// 		if (item.children) {
// 			const res = searchRoute(path, item.children);
// 			if (Object.keys(res).length) result = res;
// 		}
// 	}
// 	return result;
// };
// /**
//  * @description 路由守卫组件
//  * */
// import { accountStores } from "@/store/index"; //store
// const AuthRouter = (props: { children: JSX.Element }) => {
// 	const { pathname } = useLocation();
// 	const route = searchRoute(pathname, rootRouter);
// 	// * 判断当前路由是否需要访问权限(不需要权限直接放行)
// 	if (!route.meta?.isRoot) return props.children;
// 	// * 判断是否有Token
// 	const { userState } = accountStores.getState(); //token
// 	if (userState === false) return <Navigate to="/home" replace />;
// 	return props.children;
// };

// export default AuthRouter;

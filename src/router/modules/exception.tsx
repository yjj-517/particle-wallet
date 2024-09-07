// exception路由
import React from "react";
// loading提示的加载组件
import lazyLoad from "@/router/utils/lazy-load";
// 导航路由组件
import Layout from "@/layout/index";
import { RouteObject } from "@/router/interface";
import { Navigate } from "react-router-dom";

const arrsRouter: Array<RouteObject> = [
	{
		element: <Layout />, //导航
		children: [
			{
				path: "/exception",
				element: <Navigate to="/exception/404" />,
				meta: {
					title: "exception-index",
					isRoot: false,
				},
			},
			{
				path: "/exception/404",
				element: lazyLoad(React.lazy(() => import("@/views/exception/index"))),
				meta: {
					title: "exception-index",
					isRoot: false,
				},
			},
		],
	},
];

export default arrsRouter;

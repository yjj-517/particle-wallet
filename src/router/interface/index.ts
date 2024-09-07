// 路由配置
export interface MetaProps {
	title?: string; //路由名字
	isRoot?: boolean; //登录判断
	info?: boolean; //是否只有一个页面
	icon?: string; //icon图
	id?: Number; //侧边栏导航排行
	key?: string; //侧边栏key值
}
// 自定义路由导航，需要在加入
export interface RouteObject {
	path?: string; //路由地址
	element?: React.ReactNode | null; //组件
	children?: RouteObject[]; //子路由
	meta?: MetaProps;
}

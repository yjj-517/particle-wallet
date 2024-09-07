import React from "react";
//router
import { BrowserRouter } from "react-router-dom"; //router
import Router from "@/router/index"; //router
// import AuthRouter from "@/router/utils/auth-router"; //router

// import { gsap } from "gsap"; //gsap
// import { useGSAP } from "@gsap/react"; //gsap
// import { ScrollTrigger } from "gsap/ScrollTrigger"; //gsap
// gsap.registerPlugin(ScrollTrigger, useGSAP);

// import "slick-carousel/slick/slick.css"; //slick
// import "slick-carousel/slick/slick-theme.css"; //slick

// antd-英文配置
import { ConfigProvider } from "antd";
import enGB from "antd/locale/en_GB";

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<ConfigProvider locale={enGB}>
					{/* <AuthRouter> */}
					<Router />
					{/* </AuthRouter> */}
				</ConfigProvider>
			</BrowserRouter>
		</>
	);
};

export default React.memo(App);

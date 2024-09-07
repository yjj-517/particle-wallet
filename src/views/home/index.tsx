// home
import React, { useState, useEffect } from "react";
import { getRawConfig } from "@/http/modules/api"; //api

const View: React.FC = () => {
	const [spinning, setSpinning] = useState<boolean>(false); //Spinning

	// 获取homeVideo数据
	const getHomeVideo = () => {
		if (!spinning) {
			setSpinning(true); //spinning
			getRawConfig("simsports-video")
				.then((res: any) => {
					console.log(res);
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	useEffect(() => {
		getHomeVideo();
	}, []);
	return (
		<>
			<div>home</div>
		</>
	);
};

export default View;

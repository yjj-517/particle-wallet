import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./styles/index.css"; //styles
import { ParticleConnectkit } from "@/wallet/particle-connectkit"; //particle

//StrictModew这是严格模式,检查仅在开发模式下运行；它们不会影响生产构建。建议ts初学者开启这个模式,便于代码的良好书写
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
	<>
		<React.StrictMode>
			<ParticleConnectkit>
				<App />
			</ParticleConnectkit>
		</React.StrictMode>
	</>,
);

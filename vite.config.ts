import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr"; //svg
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default ({ mode }: any) => {
	const viteEnv = loadEnv(mode, process.cwd());
	return defineConfig({
		plugins: [
			react(),
			svgr({
				include: "**/*.svg?react",
			}),
			nodePolyfills({
				// To add only specific polyfills, add them here. If no option is passed, adds all polyfills
				include: ["path"],
				// To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
				exclude: [
					"http", // Excludes the polyfill for `http` and `node:http`.
				],
				// Whether to polyfill specific globals.
				globals: {
					Buffer: true, // can also be 'build', 'dev', or false
					global: true,
					process: true,
				},
				// Override the default polyfills for specific modules.
				overrides: {
					// Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
					fs: "memfs",
				},
				// Whether to polyfill `node:` protocol imports.
				protocolImports: true,
			}),
		],
		base: viteEnv.VITE_BASE_PATH, //读取静态文件路径
		// 引入文件设置
		resolve: {
			extensions: [".mjs", ".js", ".jsx", ".ts", ".tsx", ".json", ".sass", ".scss", ".less"], // 忽略输入的扩展名
			alias: {
				"@": path.resolve("./src"),
			},
		},
		// 跨域配置
		server: {
			host: "0.0.0.0", //设置地址：http://localhost
			open: true, //启动项目自动弹出浏览器
			port: parseInt(viteEnv.VITE_PORT), //启动端口
			cors: true, // 允许跨域
			proxy: {
				"/api": {
					target: "https://dev-api.simsports.io", //本地开发实际请求地址
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, ""),
				},
			},
		},
		css: {
			modules: {
				/* 
				scopeBehaviour：**指定 CSS 模块的作用域行为。有三个可选值：
				"local"：启用本地作用域，每个类名都将局限于当前模块。这是默认值。
				"global"：所有类名在全局作用域内都是可见的。
				"pure"：启用本地作用域，但对于全局作用域的选择器，Vite 将为其生成一个名字空间。
				localsConvention：**指定生成的本地类名的命名约定。有三个可选值：
				"camelCase"：将类名转换为驼峰命名法，例如 my-class 变成 myClass。
				"asIs"：保留原始类名。
				"camelCaseOnly"：只对包含驼峰命名法的类名进行转换，其他类名保持不变。
				*/
				scopeBehaviour: "local",
				localsConvention: "camelCase",
			},
			preprocessorOptions: {
				// less配置
				// less: {
				// 	charset: false,
				// 	// additionalData: "@import './src/assets/style/global.less';", //注意@import一定有空格
				// },
			},
		},
		build: {
			outDir: "dist",
			// 构建后是否生成 sourcemap 文件
			sourcemap: false,
			// 块大小警告大小限制(kb)
			chunkSizeWarningLimit: 1500,
			// esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
			// minify: "esbuild",
			/** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
			minify: "terser",
			/** 在打包代码时移除 console.log、debugger 和 注释 */
			terserOptions: {
				//打包后移除console和注释
				compress: {
					drop_console: false,
					drop_debugger: true,
					pure_funcs: ["console.log"],
				},
				format: {
					/** 删除注释 */
					comments: false,
				},
			},
			/** 打包后静态资源目录 */
			assetsDir: "static",
			rollupOptions: {
				output: {
					// 分解大块js,
					manualChunks(id) {
						if (id.includes("node_modules")) {
							return id.toString().split("node_modules/")[1].split("/")[0].toString();
						}
					},
					// 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
					entryFileNames: "static/js/[name].[hash].js",
					// 用于命名代码拆分时创建的共享块的输出命名
					chunkFileNames: "static/js/[name].[hash].js",
					// 用于输出静态资源的命名，[ext]表示文件扩展名
					assetFileNames: "static/[ext]/[name].[hash].[ext]",
				},
			},
		},
	});
};

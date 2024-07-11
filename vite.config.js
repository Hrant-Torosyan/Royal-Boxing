import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
	plugins: [react()],
	// server: {
	// 	port: 3000,
	// 	proxy: {
	// 		"/api": {
	// 			target: "http://44.204.224.154:8080",
	// 			changeOrigin: true,
	// 			secure: false,
	// 			rewrite: (path) => path.replace(/^\/api/, ""),
	// 		},
	// 	},
	// },
});

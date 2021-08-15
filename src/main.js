import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Go from './wasm_exec'

const wasmBrowserInstantiate = async (wasmModuleUrl, importObject) => {
	let response = undefined;

	if (WebAssembly.instantiateStreaming) {
		// Fetch the module, and instantiate it as it is downloading
		response = await WebAssembly.instantiateStreaming(fetch(wasmModuleUrl), importObject);
	} else {
		const fetchAndInstantiateTask = async () => {
			const wasmArrayBuffer = await fetch(wasmModuleUrl).then(response =>
				response.arrayBuffer()
			);
			return WebAssembly.instantiate(wasmArrayBuffer, importObject);
		};
		response = await fetchAndInstantiateTask();
	}
	return response;
}

createApp(App).use(store).use(router).mount('#app')


const go = new Go();
const wasmLoad = async () => {
  const wasmModule = await wasmBrowserInstantiate("./main.wasm", go.importObject);
  var wasm = wasmModule.instance;
  go.run(wasm);

  console.log('WASM Complated.')
};

console.log('WASM Loading...')
wasmLoad();
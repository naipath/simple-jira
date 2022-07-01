import App from './App.svelte'

import 'agnostic-svelte/css/common.min.css';
import 'agnostic-svelte/css/common.properties.min.css';
import 'agnostic-svelte/css/opinions.min.css';
import 'agnostic-svelte/css/common.resets.min.css';

const app = new App({
  target: document.getElementById('app')
})

export default app

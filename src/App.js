import { h } from 'preact';
import { Router } from 'preact-router';

import Login from './routes/login';
import Home from './routes/home';
import List from './routes/list';

const App = () => (
	<div id="app">
		<Router>
			<Login path="/login" />
			<Home path="/" />
			<List path="/list" />
		</Router>
	</div>
)

export default App;

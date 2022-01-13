import { h } from 'preact';
import { Router } from 'preact-router';
import Home from '../routes/home';
import UploadDemo from "../routes/uploadDemo";

const App = () => (
	<div id="app">
		<Router>
			<Home path="/" />
			<UploadDemo path="/upload" />
		</Router>
	</div>
)

export default App;

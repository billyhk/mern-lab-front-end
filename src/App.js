import React from 'react';
import { Link, Route, Switch } from 'react-router-dom';

import './App.css';

//components
import JobsList from './components/JobsList';
import Job from './components/Job.js';
import JobCreate from './components/JobCreate';
import JobEdit from './components/JobEdit';
import JobHome from './components/JobsHome';

const App = () => (
	<>
		<header>
			<Link to='/'>Home</Link>
			<Link to='/jobs/create'>Create New Job</Link>
			<Link to='/jobs'>Show All Jobs</Link>
		</header>
		<main>
			<Switch>
				<Route exact path='/' component={JobHome} />
				<Route exact path='/jobs/create' component={JobCreate} />
				<Route exact path='/jobs' component={JobsList} />
				<Route exact path='/jobs:id' component={Job} />
				<Route exact path='/:id/edit' component={JobEdit} />
			</Switch>
		</main>
	</>
);

export default App;

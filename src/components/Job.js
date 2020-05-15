import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { APIURL } from '../config.js';

const Job = ({ match }) => {
	const [deleted, setDeleted] = useState(false);
	const [error, setError] = useState(false);
	const [job, setJob] = useState(null);

	useEffect(() => {
		const url = `${APIURL}/jobs/${match.params.id}`;
		fetch(url)
			.then((response) => response.json())
			.then(setJob)
			.catch(() => {
				setError(true);
			});
	}, [match.params.id]);

	const onDeleteJob = (event) => {
		const url = `${APIURL}/jobs/${match.params.id}`;
		fetch(url, { method: 'DELETE' })
			.then((res) => {
				setDeleted(true);
			})
			.catch(console.error);
	};
	if (deleted) {
		return <Redirect to='/jobs' />;
	}

	if (error) {
		return <div>Sorry, there was a problem getting the jobs</div>;
	}

	if (!job) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			<h3>Title: {job.title}</h3>
			<p>Description: {job.description}</p>
			<button onClick={onDeleteJob}>Delete Job</button>
			<Link to={`/jobs/${match.params.id}/edit`}>Update Job</Link>
		</div>
	);
};

export default Job;

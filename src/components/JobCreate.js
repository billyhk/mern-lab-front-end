import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { APIURL } from '../config.js';
import JobForm from './JobForm.js';

const JobCreate = () => {
	const initialJobState = {
		title: '',
		description: '',
	};

	const [job, setJob] = useState(initialJobState);
	const [createdId, setCreatedId] = useState(null);
	const [error, setError] = useState(false);

	const handleChange = (event) => {
		event.persist();
		setJob({ ...job, [event.target.name]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const url = `${APIURL}/jobs/`;

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(job),
		})
			.then((response) => response.json())
			.then((data) => {
				setCreatedId(data.id);
			})
			.catch(() => {
				setError(true);
			});
	};

	if (createdId) {
		return <Redirect to={`/jobs/${createdId}`} />;
	}
	return (
		<>
			<h3>Create a Job</h3>
			{error && <p>Something went wrong... Please try again!</p>}
			<JobForm
				job={job}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>
		</>
	);
};

export default JobCreate;

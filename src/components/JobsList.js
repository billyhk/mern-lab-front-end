import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { APIURL } from '../config';

const JobsList = (props) => {
	const [jobs, setJobs] = useState([]);
	const [error, setError] = useState(false);
	const [deleted, setDeleted] = useState(false);

	useEffect(() => {
		fetch(`${APIURL}/jobs`)
			.then((response) => response.json())
			.then((data) => {
				setJobs(data);
			})
			.catch(() => {
				setError(true);
			});
	}, []);

	if (error) {
		return <div>Sorry, there was a problem getting the jobs</div>;
	}

	if (jobs.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<ol>
			{jobs.map((job) => (
				<li key={job._id}>
					<Link to={`/jobs/${job._id}`}>
						{job.title}
					</Link>
					<p>{job.description}</p>
				</li>
			))}
		</ol>
	);
};

export default JobsList;

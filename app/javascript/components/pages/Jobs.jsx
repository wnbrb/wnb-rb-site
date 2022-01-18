import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import { getJobs } from '../../datasources';

import 'stylesheets/page';
import 'stylesheets/jobs';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getJobs();
            setJobs(data);
        };

        fetchData();
    }, []);

    console.log({ jobs });

    return (
        <SharedLayout>
            <PageTitle text="Jobs" />
            {jobs.map((job) => (
                <Job
                    key={`${job.title} at ${job.company}`}
                    company={job.company}
                    title={job.title}
                    description={job.description}
                    imageUrl={job.image_url}
                    link={job.link}
                    location={job.location}
                    createdAt={job.created_at}
                />
            ))}
        </SharedLayout>
    );
};

const Job = ({ title, description, imageUrl, company, link, location, createdAt }) => {
    return (
        <>
            <p>{title}</p>
            <p>{description}</p>
            <p>{imageUrl}</p>
            <p>{company}</p>
            <p>{link}</p>
            <p>{location}</p>
            <p>{createdAt}</p>
        </>
    );
};

export default Jobs;

Job.propTypes = {
    title: propTypes.string,
    description: propTypes.string,
    company: propTypes.string,
    imageUrl: propTypes.string,
    link: propTypes.string,
    location: propTypes.string,
    createdAt: propTypes.date,
};

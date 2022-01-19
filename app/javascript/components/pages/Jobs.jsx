import React, { useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
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

    return (
        <SharedLayout>
            <PageTitle text="Jobs" />
            <div className="jobs md:px-44 px-6">
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
            </div>
        </SharedLayout>
    );
};

const Job = ({ title, description, imageUrl, company, link, location, createdAt }) => {
    const postedAt = useMemo(() => {
        const today = new Date();
        const postedDate = new Date(createdAt);
        const msInDay = 24 * 60 * 60 * 1000;

        const diff = (+today - +postedDate) / msInDay;

        let postedDescription;

        if (diff <= 1) {
            postedDescription = 'today';
        } else if (diff < 30) {
            postedDescription = `${diff} days ago`;
        } else {
            const monthDiff = Math.floor(diff / 30);

            if (monthDiff === 1) {
                postedDescription = '1 month ago';
            } else {
                postedDescription = `${diff} months ago`;
            }
        }

        return `Posted ${postedDescription}`;
    }, [createdAt]);

    return (
        <div className="bg-white shadow-lg rounded-lg my-5 p-10 max-w-sm">
            <div className="flex flex-row">
                <img className="w-14 h-14 rounded-full mr-6" src={imageUrl} alt="" />
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg text-[#4a4a4a]">{title}</h2>
                    <div className="mt-1">{company}</div>
                    <div className="font-light">{location}</div>
                </div>
            </div>
            <div className="my-4">{description}</div>
            <div className="flex flex-row justify-between align-center space-x-5">
                <Button type="white" className="w-20">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        Apply
                    </a>
                </Button>
                <div className="">{postedAt}</div>
            </div>
        </div>
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
    createdAt: propTypes.string,
};

import React, { useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import Button from 'components/Button';
import { getJobs } from '../../datasources';
import { postedAtString } from '../../utils';

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

    const [firstSixJobs, restOfJobs] = useMemo(() => {
        if (jobs === []) {
            return [[], []];
        }

        const firstSix = jobs.slice(0, 6);
        const rest = jobs.slice(6, jobs.length);

        return [firstSix, rest];
    }, [jobs]);

    return (
        <SharedLayout>
            <PageTitle text="Jobs" />
            <JobGroup jobs={firstSixJobs} />
            <SponsorUsBanner />
            <JobGroup jobs={restOfJobs} />
        </SharedLayout>
    );
};

const JobGroup = ({ jobs }) => {
    return (
        <div className="w-full flex flex-row justify-center px-40">
            <div className="jobs flex flex-row flex-wrap ">
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
        </div>
    );
};

JobGroup.propTypes = {
    jobs: propTypes.array,
};

const SponsorUsBanner = () => {
    return (
        <div className="sponsor-us-banner w-full flex flex-row justify-center my-20 py-5">
            <div className="bg-white shadow-lg rounded-lg my-5 py-5 px-10 flex flex-row justify-between items-center text-lg">
                Want to see your company&apos;s job on our board?
                <Button type="white" className="ml-5">
                    <a href={'/sponsor-us'} target="_blank" rel="noopener noreferrer">
                        Sponsor Us
                    </a>
                </Button>
            </div>
        </div>
    );
};

const Job = ({ title, description, imageUrl, company, link, location, createdAt }) => {
    return (
        <div className="bg-white shadow-lg rounded-lg my-5 mr-8 p-10 max-w-[22rem]">
            <div className="flex flex-row">
                <img className="w-14 h-14 rounded-full mr-6" src={imageUrl} alt="" />
                <div className="flex flex-col">
                    <h2 className="font-bold text-lg text-[#4a4a4a]">{title}</h2>
                    <div className="mt-1">{company}</div>
                    <div className="font-light">{location}</div>
                </div>
            </div>
            <div className="my-5 h-44">{description}</div>
            <div className="flex flex-row justify-between items-center space-x-5">
                <Button type="white" className="w-20">
                    <a href={link} target="_blank" rel="noopener noreferrer">
                        Apply
                    </a>
                </Button>
                <div>{`Posted ${postedAtString(createdAt)}`}</div>
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

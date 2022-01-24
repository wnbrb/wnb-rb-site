import React, { useEffect, useMemo, useState } from 'react';
import propTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import Button from 'components/Button';
import Card from 'components/Card';
import { getJobs } from '../../datasources';
import { postedAtString } from '../../utils';
import { UnauthorizedError } from '../../errors';

import 'stylesheets/page';
import 'stylesheets/jobs';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [cookies] = useCookies();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJobs(cookies['wnb_job_board_token']);
                setJobs(data);
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    window.location.href = '/jobs/authenticate';
                } else {
                    // TODO: add error boundaries
                    console.log(error.message);
                }
            }
        };

        fetchData();
    }, [cookies]);

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
            <PageTitleWithContainer text="Jobs" />
            <JobGroup jobs={firstSixJobs} />
            <SponsorUsBanner />
            <JobGroup jobs={restOfJobs} />
        </SharedLayout>
    );
};

const JobGroup = ({ jobs }) => {
    return (
        <div className="full flex flex-row flex-wrap justify-center md:justify-between md:max-w-[50rem] lg:max-w-[73rem] mx-auto">
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
    );
};

JobGroup.propTypes = {
    jobs: propTypes.array,
};

const SponsorUsBanner = () => {
    return (
        <div className="sponsor-us-banner w-full flex flex-row justify-center my-20 py-5 px-5">
            <Card className="my-5 py-5 flex flex-row flex-wrap justify-center md:justify-between text-center md:text-left items-center text-lg">
                Want to see your company&apos;s job on our board?
                <Button type="white" className="ml-0 md:ml-5 mt-5 md:mt-0">
                    <a href={'/sponsor-us'} target="_blank" rel="noopener noreferrer">
                        Sponsor Us
                    </a>
                </Button>
            </Card>
        </div>
    );
};

const Job = ({ title, description, imageUrl, company, link, location, createdAt }) => {
    return (
        <Card className="mx-0 my-5 md:mr-8 max-w-[22rem]">
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
        </Card>
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

import * as ReactDOM from 'react-dom';
import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';
import propTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitleWithContainer from 'components/PageTitleWithContainer';
import Button from 'components/Button';
import Card from 'components/Card';
import Banner from 'components/Banner';
import LoadingSpinner from 'components/LoadingSpinner';
import { getJobs } from '../../datasources';
import { UnauthorizedError } from '../../errors';

import 'stylesheets/page';
import 'stylesheets/jobs';

const Jobs = () => {
    const [loading, setLoading] = useState(true);
    const [jobs, setJobs] = useState([]);
    const [query, setQuery] = useState('');
    const [cookies] = useCookies();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJobs(cookies['wnb_job_board_token'], query);
                setJobs(data);
                setLoading(false);
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
        <>
            <Helmet>
                <title>Jobs | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                <PageTitleWithContainer text="Jobs" />
                {loading ? (
                    <LoadingSpinner />
                ) : (
                    <>
                        <JobGroup jobs={firstSixJobs} />
                        <SponsorUsBanner />
                        <JobGroup jobs={restOfJobs} />
                    </>
                )}
            </SharedLayout>
        </>
    );
};

const JobFetchData = (cookies, jobs, query, setSearchResults, setLoading) => {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getJobs(cookies['wnb_job_board_token'], query);
                setSearchResults(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof UnauthorizedError) {
                    window.location.href = '/jobs/authenticate';
                } else {
                    console.log(error.message);
                }
            }
        };

        if (query === '') {
            setSearchResults(jobs);
        } else {
            fetchData();
        }
    }, [cookies, jobs, query, setSearchResults, setLoading]);
};

const JobGroup = ({ jobs }) => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState(jobs);
    const [loading, setLoading] = useState(true);
    const [cookies] = useCookies();

    JobFetchData(cookies, jobs, query, setSearchResults, setLoading);

    const handleSearch = async (e) => {
        setQuery(e.target.value);
    };

    return (
        <div>
            <div className="job-group">
                <input
                    type="text"
                    onChange={handleSearch}
                    style={{
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        padding: '10px',
                        borderRadius: '5px',
                        boxShadow: '#e0e0e0 0px 0px 5px',
                        marginLeft: '2rem',
                        marginRight: '2rem',
                    }}
                    placeholder="Search Job"
                />
            </div>
            <div className="job-group">
                {searchResults.map((job) => (
                    <Job
                        key={`${job.title} at ${job.company}`}
                        company={job.company}
                        title={job.title}
                        description={job.description}
                        imageUrl={job.image_url}
                        link={job.link}
                        location={job.location}
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
        <Banner>
            Want to see your company&apos;s job on our board?
            <Button type="white" className="ml-0 md:ml-5 mt-5 md:mt-0">
                <a href={'/partner-with-us'} target="_blank" rel="noopener noreferrer">
                    Partner with Us
                </a>
            </Button>
        </Banner>
    );
};

const Job = ({ title, description, imageUrl, company, link, location }) => {
    return (
        <Card className="mx-0 my-5 md:mr-8 max-w-[22rem]">
            <div className="flex flex-row">
                <img className="w-14 h-14 shadow-sm rounded-full mr-6" src={imageUrl} alt="" />
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
};

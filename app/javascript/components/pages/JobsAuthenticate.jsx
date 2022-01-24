import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import SharedLayout from 'components/layout/SharedLayout';
import Logo from 'components/icons/Logo';
import Button from 'components/Button';
import Card from 'components/Card';
import { postJobsAuthenticate } from '../../datasources';

import 'stylesheets/page';
import 'stylesheets/jobs_authenticate';
import { UnauthorizedError } from '../../errors';

const JobsAuthenticate = () => {
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [_, setCookie] = useCookies();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await postJobsAuthenticate(password);
            setHasError(false);
            setCookie('wnb_job_board_token', data.token);
            window.location.href = '/jobs';
        } catch (error) {
            if (error instanceof UnauthorizedError) {
                setHasError(true);
                setPassword('');
            } else {
                // TODO: add error boundaries
                console.log(error.message);
            }
        }
    };

    return (
        <SharedLayout>
            <div className="jobs-authenticate-container">
                <Logo className="h-28" />
                <Card className="w-full max-w-[30rem] mt-5">
                    <form className="flex flex-col" onSubmit={(e) => handleLogin(e)}>
                        Password
                        <input
                            type="password"
                            className="rounded-lg mt-3"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        ></input>
                        <Button type="secondary" className="w-40 mt-3">
                            <input
                                type="submit"
                                value="View Job Board"
                                className="bg-transparent hover:cursor-pointer"
                            />
                        </Button>
                        {hasError && (
                            <div className="incorrect-password">Password is incorrect.</div>
                        )}
                        <p className="text-sm mt-5">
                            The WNB.rb job board is password protected. You can find the password in
                            the WNB.rb Slack workspace. To join WNB.rb on Slack,{' '}
                            <a
                                href="https://tinyurl.com/join-wnb-rb"
                                target="_blank"
                                rel="noreferrer noopener"
                                className="underline"
                            >
                                fill out this form.
                            </a>
                        </p>
                    </form>
                </Card>
                <Card className="w-full max-w-[30rem] mt-5">
                    <div className="flex flex-row flex-wrap items-center justify-center md:justify-between text-lg">
                        Want to post a job?
                        <Button type="white" className="mt-3 md:mt-0">
                            <a href="/sponsor-us" target="_blank" rel="noopener noreferrer">
                                Sponsor Us
                            </a>
                        </Button>
                    </div>
                </Card>
            </div>
        </SharedLayout>
    );
};

export default JobsAuthenticate;

import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import SharedLayout from 'components/layout/SharedLayout';
import Logo from 'components/icons/Logo';
import Button from 'components/Button';
import { postJobsAuthenticate } from '../../datasources';

import 'stylesheets/page';
import 'stylesheets/jobs_authenticate';

const JobsAuthenticate = () => {
    const [password, setPassword] = useState('');
    const [hasError, setHasError] = useState(false);
    const [setCookie] = useCookies(['token']);

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const data = await postJobsAuthenticate(password);
            setCookie('token', data.token);
        } catch (error) {
            setHasError(true);
            setPassword('');
        }
    };

    return (
        <SharedLayout>
            <div className="jobs-authenticate-container">
                <Logo className="h-28" />
                <form className="jobs-authenticate-login" onSubmit={(e) => handleLogin(e)}>
                    Password
                    <input
                        type="password"
                        className="rounded-lg mt-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <Button
                        type="secondary"
                        className="w-20 mt-3"
                        onClick={() => console.log(`Password is ${password}`)}
                    >
                        <input type="submit" value="Log In" className="bg-transparent" />
                    </Button>
                    {hasError && <div className="incorrect-password">Password is incorrect.</div>}
                    <p className="text-sm mt-5">
                        The WNB.rb job board is password protected. You can find the password in the
                        WNB.rb Slack workspace. To join WNB.rb on Slack,{' '}
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
                <div className="jobs-authenticate-sponsor-us">
                    Want to post a job?
                    <Button type="white">
                        <a href="/sponsor-us" target="_blank" rel="noopener noreferrer">
                            Sponsor Us
                        </a>
                    </Button>
                </div>
            </div>
        </SharedLayout>
    );
};

export default JobsAuthenticate;

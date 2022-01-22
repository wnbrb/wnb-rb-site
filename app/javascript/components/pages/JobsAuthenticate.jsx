import React, { useState } from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import Logo from 'components/icons/Logo';
import Button from 'components/Button';

import 'stylesheets/page';
import 'stylesheets/jobs_authenticate';

const JobsAuthenticate = () => {
    const [password, setPassword] = useState('');

    return (
        <SharedLayout>
            <div className="jobs-authenticate-container">
                <Logo className="h-28" />
                <div className="jobs-authenticate-login">
                    Password
                    <input
                        type="password"
                        className="rounded-lg mt-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></input>
                    <Button
                        type="secondary"
                        className="text-base w-40 mt-3"
                        onClick={() => console.log(`Password is ${password}`)}
                    >
                        {/*TODO: implement actual password submission logic*/}
                        <button onClick={() => console.log(`Password is ${password}`)}>
                            View Job Board
                        </button>
                    </Button>
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
                </div>
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

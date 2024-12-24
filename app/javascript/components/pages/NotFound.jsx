import React from 'react';
import { Helmet } from 'react-helmet-async';
import SharedLayout from 'components/layout/SharedLayout';
import NewLogo from 'components/icons/NewLogo';

import 'stylesheets/not_found';

const NotFound = () => (
    <>
        <Helmet>
            <title>WNB.rb: 404</title>
        </Helmet>

        <SharedLayout>
            <div className="not-found-container">
                <NewLogo className="h-60 w-60" />
                <div className="not-found-text-container">
                    <h1 className="title-text-lg">404</h1>
                    <p>We couldn&apos;t find the page you were looking for.</p>
                </div>
            </div>
        </SharedLayout>
    </>
);

export default NotFound;

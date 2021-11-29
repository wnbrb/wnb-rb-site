import React from 'react';
import SharedLayout from 'components/layout/SharedLayout';
import PageTitle from 'components/PageTitle';
import 'stylesheets/page';
import 'stylesheets/home';

const Meetups = () => {
    return (
        <SharedLayout>
            <PageTitle text="Past Meetups" />
        </SharedLayout>
    );
};
export default Meetups;

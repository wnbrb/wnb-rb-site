import React from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/PageTitle';

const PageTitleWithContainer = ({ text }) => {
    return (
        <div className="max-w-[73rem] px-10 lg:px-8 xl:px-0 mx-auto my-10 sm:my-20">
            <PageTitle text={text} />
        </div>
    );
};

PageTitleWithContainer.propTypes = {
    text: PropTypes.string,
};

export default PageTitleWithContainer;

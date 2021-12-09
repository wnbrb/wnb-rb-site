import React from 'react';

const AboutUsSection = () => {
    return (
        <>
            <p className="m-2">
                WNB.rb is a global community of women and non-binary Rubyists, ranging in experience
                levels from recent bootcamp grads to CTOs.
            </p>
            <p className="m-2 pt-4">
                Our community-driven initiatives include:
                <ul className={'list-disc ml-10'}>
                    <li>A monthly meetup</li>
                    <li>An interview study group</li>
                    <li>A conference proposal working group</li>
                    <li>A technical book club</li>
                    <li>An active Slack workspace</li>
                    <li>... and more!</li>
                </ul>
            </p>
        </>
    );
};

export default AboutUsSection;

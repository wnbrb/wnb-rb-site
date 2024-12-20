import React from 'react';
import speak from '../../assets/images/speak.png';
import meet from '../../assets/images/meet.png';
import 'stylesheets/meetup';

const Meetspeak = () => {
    return (
        <>
            <div className="meetspeak-layout">
                <div className="meet-card">
                    <img src={meet} alt="location" />
                    <h3>Meetups</h3>
                    <p className="mb-2">
                        <b>Our meetups</b> are held virtually on the last Tuesday of every month at{' '}
                        <a
                            href="https://dateful.com/convert/eastern-time-et?t=12pm"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            12 pm Eastern Time
                        </a>{' '}
                        <i className="bi bi-box-arrow-up-right"></i>. The content is typically
                        focused on Ruby or career-related topics, with 1-2 talks presented in a
                        lecture-style format. Anyone who identifies as a woman or non-binary
                        individual is welcome to attend. Fill in{' '}
                        <a
                            href="/join-us"
                            className="whitespace-nowrap font-medium hover:text-wnbrb-blue-navy"
                        >
                            the Subscription form
                        </a>{' '}
                        to receive an invitation to the Google Group, which will opt you into
                        calendar invites for upcoming meetups.
                    </p>
                </div>

                <div className="speak-card">
                    <img src={speak} alt="speak" />
                    <h3>Interested in speaking?</h3>
                    {` We're constantly on the lookout for presenters, whether you're an experienced speaker or if this is
                        your first time. Speaking at a WNB.rb meetup is an excellent opportunity to
                        enhance your public speaking abilities. If you're interested in giving a
                        talk, please provide your talk details via `}
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdmOJxLdSdy74mXYxsr6ZRRhTN95Yxnq2B6n5mhUoGkVmDUGA/viewform"
                        className="whitespace-nowrap font-medium hover:text-wnbrb-blue-navy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        the Talk Proposal form
                    </a>{' '}
                    <i className="bi bi-box-arrow-up-right"></i> or feel free to contact{' '}
                    <i>Adrianna Chang</i> on the WNB.rb Slack for more information.
                </div>
            </div>
        </>
    );
};

export default Meetspeak;

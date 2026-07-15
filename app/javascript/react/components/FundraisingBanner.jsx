import React, { useEffect, useState } from 'react';
import { getFundraisingProgress } from '../datasources';
import '../stylesheets/fundraising-banner.scss';

const formatAmount = (amount) => `$${Math.round(amount).toLocaleString()}`;

const FundraisingBanner = () => {
    const [progress, setProgress] = useState(null);

    useEffect(() => {
        getFundraisingProgress()
            .then(setProgress)
            .catch(() => setProgress(null));
    }, []);

    // Render nothing until we have a goal to measure against: a bar with no
    // denominator is meaningless, and a failed fetch should leave the page as-is.
    if (progress === null || !progress.goal) {
        return null;
    }

    const percent = Math.min(Math.round((progress.raised / progress.goal) * 100), 100);

    return (
        <div className="fundraising-banner">
            <div className="fundraising-banner-inner">
                <div className="fundraising-banner-copy">
                    <p className="fundraising-banner-headline">WNB.rb is now a 501(c)(3)!</p>
                    <p className="fundraising-banner-detail">
                        Your tax-deductible donation keeps our programs high-quality and free for
                        all.
                    </p>
                </div>

                <div className="fundraising-progress-group">
                    <div
                        className="fundraising-progress"
                        role="progressbar"
                        aria-valuenow={percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${formatAmount(progress.raised)} raised of a ${formatAmount(
                            progress.goal,
                        )} goal`}
                    >
                        <div
                            className="fundraising-progress-fill"
                            style={{ width: `${percent}%` }}
                        />
                    </div>

                    <div className="fundraising-progress-labels">
                        <span>{formatAmount(progress.raised)}</span>
                        <span>{formatAmount(progress.goal)}</span>
                    </div>
                </div>

                <a
                    className="fundraising-banner-cta"
                    href={progress.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Donate
                </a>
            </div>
        </div>
    );
};

export default FundraisingBanner;

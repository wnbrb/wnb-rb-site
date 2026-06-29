import React from 'react';
import '../stylesheets/thankyou';
import mike from 'images/mike.png';
import Gusto from 'images/Gusto-logo.png';
import flagrant from 'images/Flagrant-logo.svg';
import Avo from 'images/avo-logo.png';
import fastRubyIo from 'images/fast-ruby-io-ruby-maintenance-done-right.svg';
import springHealth from 'images/spring-health-logo.svg';

const sponsors = [
    { src: flagrant, alt: 'Flagrant-logo', href: 'https://www.beflagrant.com/' },
    { src: Gusto, alt: 'Gusto-logo', href: 'https://gusto.com/about/careers/join-the-team' },
    { src: Avo, alt: 'avo-logo', href: 'https://avohq.io/' },
    {
        src: fastRubyIo,
        alt: 'fast-ruby-io-logo',
        href: 'https://www.fastruby.io/monthly-ruby-maintenance.html?utm_source=wnbdev&utm_campaign=wnb-rocks-2026',
    },
    { src: springHealth, alt: 'spring-health-logo', href: 'https://www.springhealth.com/' },
];

const Thankyou = () => {
    return (
        <div className="thankyou">
            <h2>Thank You to Our Sponsors</h2>
            <p>
                We are immensely grateful to our sponsors for their generous support and commitment.
                Their invaluable contributions have been instrumental in helping us achieve our
                goals and make a meaningful impact. Together, we are creating opportunities and
                driving change, and we couldn&apos;t have done it without their partnership.
            </p>

            <div className="sponsor-featured">
                <a
                    href="https://mike.daless.io/"
                    className="sponsor-featured-card"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={mike} alt="mike" className="sponsor-featured-image" />
                    <h1 className="font-bold font-besley text-wnbrb-blue-navy">
                        Mike Dalessio
                    </h1>
                    <span className="sponsor-featured-label">Individual Sponsor</span>
                </a>
            </div>

            <div className="sponsor-grid">
                {sponsors.map((s) => (
                    <a
                        key={s.alt}
                        href={s.href}
                        className="sponsor-card"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={s.src} alt={s.alt} className="sponsor-image" />
                    </a>
                ))}
            </div>
        </div>
    );
};
export default Thankyou;

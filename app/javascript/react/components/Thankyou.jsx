import React from 'react';
import '../stylesheets/thankyou';
import mike from 'images/mike.png';
import Gusto from 'images/Gusto-logo.png';
import flagrant from 'images/Flagrant-logo.svg';
import Avo from 'images/avo-logo.png';
import fastRubyIo from 'images/fast-ruby-io-ruby-maintenance-done-right.svg';

const Thankyou = () => {
    return (
        <div className="thankyou">
            <h2>Thank You to Our Sponsors</h2>
            <p>
                We are immensely grateful to our sponsors for their generous support and commitment.
                Their invaluable contributions have been instrumental in helping us achieve our
                goals and make a meaningful impact. Together, we are creating opportunities and
                driving change, and we couldn’t have done it without their partnership.
            </p>

            <div className="sponsor">
                <div className="sponsor-1">
                    <img src={mike} alt="mike" className="sponsor-image" />

                    <a
                        href="https://mike.daless.io/"
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <h1 className="font-bold font-besley  text-wnbrb-blue-navy">
                            Mike Dalessio
                        </h1>
                    </a>
                </div>

                <div className="sponsor-2">
                    <a
                        href="https://www.beflagrant.com/"
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={flagrant} alt="Flagrant-logo" className="sponsor-image" />
                    </a>
                </div>

                <div className="sponsor-3">
                    <a
                        href="https://gusto.com/about/careers/join-the-team"
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={Gusto} alt="Gusto-logo" className="sponsor-image" />
                    </a>
                </div>

                <div className="sponsor-4">
                    <a
                        href="https://avohq.io/"
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={Avo} alt="avo-logo" className="sponsor-image" />
                    </a>
                </div>

                 <div className="sponsor-5">
                    <a
                        href="https://www.fastruby.io/monthly-ruby-maintenance.html?utm_source=wnbdev&utm_campaign=wnb-rocks-2026"
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={fastRubyIo} alt="fast-ruby-io-logo" className="sponsor-image" />
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Thankyou;

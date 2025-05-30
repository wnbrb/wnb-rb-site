import React from 'react';
import 'stylesheets/thankyou';
import mike from '../../assets/images/mike.png';
import Gusto from '../../assets/images/Gusto-logo.png';
import flagrant from '../../assets/images/Flagrant-logo.svg'

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
                        <h1 className="font-bold font-besley text-2xl text-wnbrb-blue-navy">
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
                        href="https://gusto.com/"
                        className="link"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <img src={Gusto} alt="Gusto-logo" className="sponsor-image" />
                    </a>
                </div>
            </div>
        </div>
    );
};
export default Thankyou;

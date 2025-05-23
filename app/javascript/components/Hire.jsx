import React from 'react';
import Button from 'components/Button';
import four from '../../assets/images/four.jpg';
import 'stylesheets/hire';

const Hire = () => {
    return (
        <div className="hire-layout">
            <div className="hire w-100 md:w-1/2 flex-1 flex flex-col">
                <img className="hire-img" src={four} alt="Hire-from-wnb-rb" />
                <h2 className="font-syne mb-2 pt-4">Hire from WNB.rb</h2>
                <p className="font-noto text-base mb-8 grow  w-[90%] md:w-[80%] lg:w-[50%]">
                    Even if you aren&apos;t a sponsor, you can hire from our community by posting
                    your open jobs on our job board.
                </p>
                <Button
                    type="primary"
                    className="font-bold"
                    onClick={() => {
                        window.open('mailto:sarah@wnb-rb.dev', '_blank', 'noopener noreferrer');
                    }}
                >
                    Post a job
                </Button>
            </div>
        </div>
    );
};

export default Hire;

import React from "react";
import hire from '../../assets/images/hire.svg'
import Button from 'components/Button';
import 'stylesheets/hire';

const Hire = () => {
    return (
        <div className="hire-layout">
            <div className="hire w-100 md:w-1/2 flex-1 flex flex-col">
                <img src={hire} alt='Hire' />
                        <h2 className="text-2xl font-bold mb-2">Hire from WNB.rb</h2>
                        <p className="mb-8 grow">
                            Even if you aren&apos;t a sponsor, you can hire from our community by
                            posting your open jobs on our job board.
                        </p>
                        <a
                            href="https://buy.stripe.com/28o4gW9cZ7oKbwQ7sJ"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button type="primary" className="max-w-[8rem] ">
                                Post a job
                            </Button>
                        </a>
                    </div>
        </div>
    );
}

export default Hire;
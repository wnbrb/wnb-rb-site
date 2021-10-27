import React from 'react';
import Button from '../Button';

const CTA = () => {
    return (
        <div className="flex justify-center" style={{ backgroundColor: '#fdf3f3' }}>
            <div
                className="container max-w-3xl rounded-lg shadow-lg border-gray-200 border flex flex-wrap flex-col sm:flex-row justify-between items-center px-10 py-4 mx-3 my-7"
                style={{ backgroundColor: '#FFFFFF' }}
            >
                <h3 className="text-2xl font-medium">Interested in sponsoring WNB.rb?</h3>
                <a className="" href="mailto: womennonbinary.rb@gmail.com">
                    <Button>Contact Us</Button>
                </a>
            </div>
        </div>
    );
};

export default CTA;

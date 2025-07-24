/*global grecaptcha*/
/*eslint no-undef: "error"*/
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import SharedLayout from 'components/layout/SharedLayout';
import Card from 'components/Card';
import Button from 'components/Button';
import AlertBanner from '../AlertBanner';
import { submitLeadForm } from '../../datasources';
import PageTitle from 'components/PageTitle';

import 'stylesheets/join_us';

const JoinUs = () => {
    const gtoken = window.gtoken;

    const initialValues = {
        name: '',
        email: '',
        identifyAs: false,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        identifyAs: Yup.boolean()
            .required('This is a required question')
            .oneOf([true], 'This is a required question'),
    });

    const [showBanner, setShowBanner] = React.useState(null);

    const handleBannerClose = () => {
        setShowBanner(null);
    };

    const onSubmit = async function (values, { resetForm }) {
        if (typeof gtoken === 'undefined') {
            try {
                const resolvedValue = await submitLeadForm(values);

                if (resolvedValue.status === 501) {
                    setShowBanner({
                        type: 'error',
                        message: `Something went wrong. Please try again: ${resolvedValue.json.error}`,
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                } else if (resolvedValue.status === 200) {
                    resetForm();
                    setShowBanner({
                        type: 'success',
                        message: `${values.name}, thank you for joining WNB.rb! You will receive an email inviting you to our Discord server shortly.`,
                    });
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            } catch (error) {
                console.log(error);
            }
            return;
        }

        return new Promise((resolve) => {
            grecaptcha.ready(function () {
                grecaptcha
                    .execute(gtoken, {
                        action: 'submit',
                    })
                    .then(async function (token) {
                        try {
                            const resolvedValue = await submitLeadForm({
                                ...values,
                                identifyAs: values.identifyAs == true ? 'Yes' : 'No',
                                gtoken: token,
                            });

                            if (resolvedValue.status === 200) {
                                resetForm();
                                setShowBanner({
                                    type: 'success',
                                    message: `${values.name}, thank you for joining WNB.rb! You will receive an email inviting you to our Discord server shortly.`,
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                            resolve();
                        } catch (error) {
                            console.log(error);
                            resolve();
                        }
                    });
            });
        });
    };

    React.useEffect(() => {
        if (typeof gtoken === 'undefined') {
            return; // Skip executing the code if window.gtoken is undefined
        }
        const script = document.createElement('script');
        script.src = `https://www.google.com/recaptcha/api.js?render=${gtoken}`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        // cleanup function to remove the script when the component unmounts
        return () => {
            document.body.removeChild(script);
        };
    }, [gtoken]);

    return (
        <>
            <Helmet>
                <title>Join Us | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                {!!showBanner && (
                    <AlertBanner
                        message={showBanner.message}
                        type={showBanner.type}
                        onClose={handleBannerClose}
                    />
                )}
                <div className="join-us-form-container">
                    <PageTitle text="WNB.rb" altText="Women and Non-Binary Rubyists">
                        <p className="mt-8 font-syne text-base font-semibold">
                            A virtual community for women & non-binary Rubyists.
                        </p>
                    </PageTitle>
                    <Card className="w-full max-w-[50rem] mt-5">
                        <h1 className="join text-black font-syne text-2xl">Join</h1>
                        <p className="mb-4">
                            By filling out this form, you are requesting an invite to the WNB.rb
                            Discord server. WNB.rb will only use your email to send you an invite
                            link; your information will never be shared without your consent. For
                            more information see our{' '}
                            <a
                                href="https://tinyurl.com/wnb-rb-coc"
                                className="whitespace-nowrap font-medium hover:text-wnbrb-blue-navy"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                code of conduct
                            </a>{' '}
                            or learn more{' '}
                            <a
                                href="/"
                                className="whitespace-nowrap font-medium hover:text-wnbrb-blue-navy"
                            >
                                about us
                            </a>
                            .
                        </p>
                        <Formik
                            {...{ initialValues, validationSchema, onSubmit }}
                            validateOnMount={true}
                        >
                            {({ isSubmitting, isValid }) => (
                                <Form>
                                    <div className="form-group">
                                        <h2 className="font-besley text-2xl mb-4">About You </h2>

                                        <label htmlFor="name" className="mb-3 font-besley">
                                            What is your name?
                                        </label>
                                        <Field name="name" type="text" id="name" />
                                        <ErrorMessage
                                            name="name"
                                            component="p"
                                            className="error-message"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email" className="font-besley">
                                            What is your email?
                                        </label>
                                        <Field name="email" type="text" id="email" />
                                        <ErrorMessage
                                            name="email"
                                            component="p"
                                            className="error-message"
                                        />
                                    </div>

                                    <fieldset role="group">
                                        <legend className="font-besley ">
                                            Do you identify as a woman or non-binary person?
                                        </legend>
                                        <p className="input-description">
                                            We ask that anybody who fills out this form identify as
                                            a woman or non-binary person. We recognize that it may
                                            be unsafe for members of the queer community to publicly
                                            identify with a gender other than the one they were
                                            assigned at birth. Anyone who identifies as a woman or
                                            non-binary person, publicly or privately, regardless of
                                            their name, appearance, or gender presentation, is
                                            welcome. For more information, see our{' '}
                                            <a
                                                href="https://tinyurl.com/wnb-rb-coc"
                                                className="whitespace-nowrap font-medium hover:text-[#2e0880]"
                                                rel="noopener noreferrer"
                                                target="_blank"
                                            >
                                                code of conduct
                                            </a>
                                            .
                                        </p>
                                        <label htmlFor="identifyAs" className="label-checkbox">
                                            <Field
                                                type="checkbox"
                                                id="identifyAs"
                                                name="identifyAs"
                                                tabIndex="0"
                                            />
                                            Yes
                                        </label>

                                        <ErrorMessage
                                            name="identifyAs"
                                            component="p"
                                            className="error-message"
                                        />
                                    </fieldset>

                                    <Button
                                        type="primary"
                                        className="submit mt-4 mx-auto"
                                        disabled={isSubmitting || !isValid}
                                    >
                                        <input
                                            type="submit"
                                            value={isSubmitting ? 'Sending...' : 'Submit'}
                                            className="bg-transparent w-full hover:cursor-pointer"
                                            disabled={isSubmitting || !isValid}
                                        />
                                        {isSubmitting && (
                                            <span className="ml-2 inline-block animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                                        )}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Card>
                </div>
            </SharedLayout>
        </>
    );
};

export default JoinUs;

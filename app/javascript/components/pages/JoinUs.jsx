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
        joindiscord: '',
        joinGoogleGroup: '',
        identifyAs: false,
        currentJob: '',
        lookingForJob: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        joindiscord: Yup.string().required('This is a required question'),
        joinGoogleGroup: Yup.string().required('This is a required question'),
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
                const submitForm = submitLeadForm(values);

                submitForm.then(function (resolvedValue) {
                    if (resolvedValue.status === 501) {
                        setShowBanner({
                            type: 'error',
                            message: `Something went wrong. Please try again: ${resolvedValue.json.error}`,
                        });

                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
            } catch (error) {
                console.log(error);
            }
            return;
        }

        grecaptcha.ready(function () {
            grecaptcha
                .execute(gtoken, {
                    action: 'submit',
                })
                .then(function (token) {
                    try {
                        const submitForm = submitLeadForm({
                            ...values,
                            identifyAs: values.identifyAs == true ? 'Yes' : 'No',
                            gtoken: token,
                        });

                        submitForm.then(function (resolvedValue) {
                            const status = resolvedValue.status;

                            if (status === 200) {
                                resetForm();
                                setShowBanner({
                                    type: 'success',
                                    message: `${values.name}, thank you for joining WNB.rb! You will receive an email within the next week.`,
                                });
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }
                        });
                    } catch (error) {
                        console.log(error);
                    }
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
                    <PageTitle text="Wnb.rb" altText="Women and Non-Binary Rubyists">
                        <p className="mt-3 font-besley text-base">
                            A virtual community for women and non-binary Rubyists.
                        </p>
                    </PageTitle>
                    <Card className="w-full max-w-[50rem] mt-5">
                        <h1 className="join">Join</h1>
                        <p className="mb-4">
                            By filling out this form, you give the organizers of WNB.rb permission
                            to add you to our discord workspace and/or Google Group.
                        </p>
                        <p className="mb-4">
                            WNB.rb will not share your email with other community members or
                            third-party organizations. Your membership in the Google Group will
                            remain hidden from everyone except the WNB.rb organizers. See our{' '}
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
                        <p className="mb-4">
                            Learn more{' '}
                            <a
                                href="/"
                                className="whitespace-nowrap font-medium hover:text-[#2e0880]"
                            >
                                about us
                            </a>
                            .
                        </p>

                        <Formik {...{ initialValues, validationSchema, onSubmit }}>
                            {({ isSubmitting, isValid }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="name" className="mb-3">
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
                                        <label htmlFor="email">What is your email?</label>
                                        <Field name="email" type="text" id="email" />
                                        <ErrorMessage
                                            name="email"
                                            component="p"
                                            className="error-message"
                                        />
                                    </div>
                                    <fieldset role="group">
                                        <legend>
                                            Would you like to be added to our discord workspace?
                                        </legend>
                                        <p className="input-description">
                                            discord is WNB.rb‘s primary means of communication. It is
                                            an awesome community of over 350 Rubyists and includes
                                            channels for advice, technical help, interview prep, and
                                            much more!
                                        </p>
                                        <label
                                            htmlFor="joindiscord_yes"
                                            className="label-radiobutton"
                                        >
                                            <Field
                                                type="radio"
                                                id="joindiscord_yes"
                                                name="joindiscord"
                                                value="Yes"
                                            />
                                            Yes
                                        </label>
                                        <label htmlFor="joindiscord_no" className="label-radiobutton">
                                            <Field
                                                type="radio"
                                                id="joindiscord_no"
                                                name="joindiscord"
                                                value="No"
                                            />
                                            No
                                        </label>
                                        <label
                                            htmlFor="joindiscord_already_in"
                                            className="label-radiobutton"
                                        >
                                            <Field
                                                type="radio"
                                                id="joindiscord_already_in"
                                                name="joindiscord"
                                                value="Already in WNB.rb discord"
                                            />
                                            Already in WNB.rb discord
                                        </label>
                                        <ErrorMessage
                                            name="joindiscord"
                                            component="p"
                                            className="error-message"
                                        />
                                    </fieldset>

                                    <fieldset role="group">
                                        <legend>
                                            Would you like to be added to our Google Group?
                                        </legend>
                                        <p className="input-description">
                                            This allows us to send you the invitation for our
                                            monthly meetups featuring two technical talks and
                                            breakout rooms.
                                        </p>
                                        <label
                                            htmlFor="joinGoogleGroup_yes"
                                            className="label-radiobutton"
                                        >
                                            <Field
                                                type="radio"
                                                id="joinGoogleGroup_yes"
                                                name="joinGoogleGroup"
                                                value="Yes"
                                            />
                                            Yes
                                        </label>
                                        <label
                                            htmlFor="joinGoogleGroup_no"
                                            className="label-radiobutton"
                                        >
                                            <Field
                                                type="radio"
                                                id="joinGoogleGroup_no"
                                                name="joinGoogleGroup"
                                                value="No"
                                            />
                                            No
                                        </label>
                                        <label
                                            htmlFor="joinGoogleGroup_already_in"
                                            className="label-radiobutton"
                                        >
                                            <Field
                                                type="radio"
                                                id="joinGoogleGroup_already_in"
                                                name="joinGoogleGroup"
                                                value="Already in WNB.rb Google Group"
                                            />
                                            Already in WNB.rb discord
                                        </label>
                                        <ErrorMessage
                                            name="joinGoogleGroup"
                                            component="p"
                                            className="error-message"
                                        />
                                    </fieldset>

                                    <fieldset role="group">
                                        <legend>
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
                                        </p>
                                        <label htmlFor="identifyAs" className="label-checkbox">
                                            <Field
                                                type="checkbox"
                                                id="identifyAs"
                                                name="identifyAs"
                                            />
                                            Yes
                                        </label>

                                        <ErrorMessage
                                            name="identifyAs"
                                            component="p"
                                            className="error-message"
                                        />
                                    </fieldset>

                                    <h2>About Your Work</h2>
                                    <p className="mb-8">
                                        The following questions are about your work. Only the WNB.rb
                                        organizers will use this information. We use it to better
                                        understand the needs of community members, and how we can
                                        support them. You are not required to answer them.
                                    </p>

                                    <div className="form-group">
                                        <label htmlFor="currentJob">
                                            Where do you currently work?
                                        </label>
                                        <p className="input-description">
                                            If you‘re self-employed, unemployed, or a student,
                                            please let us know as well!
                                        </p>
                                        <Field name="currentJob" type="text" id="currentJob" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="lookingForJob">
                                            Are you currently looking for a job, or do you
                                            anticipate looking for a job in the next 6 months?
                                        </label>
                                        <Field
                                            name="lookingForJob"
                                            type="text"
                                            id="lookingForJob"
                                        />
                                    </div>

                                    <Button
                                        type="secondary"
                                        className="submit mt-4 mx-auto"
                                        disabled={isSubmitting || !isValid}
                                    >
                                        <input
                                            type="submit"
                                            value="Submit"
                                            className="bg-transparent w-full hover:cursor-pointer"
                                            disabled={isSubmitting || !isValid}
                                        />
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

import React from 'react';
import { Helmet } from 'react-helmet';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import SharedLayout from 'components/layout/SharedLayout';
import Logo from 'components/icons/Logo';
import Card from 'components/Card';
import Button from 'components/Button';

import 'stylesheets/join_us';

const JoinUs = () => {
    return (
        <>
            <Helmet>
                <title>Join Us | WNB.rb</title>
            </Helmet>
            <SharedLayout>
                <div className="join-us-form-container">
                    <Logo className="h-28" />
                    <Card className="w-full max-w-[50rem] mt-5">
                        <h1>Join WNB.rb!</h1>
                        <p className="mb-4">
                            WNB.rb is an online community for women and non-binary Rubyists.
                        </p>
                        <p className="mb-4">
                            We have a Slack group where we coordinate many community driven
                            initiatives (interview prep group, a CFP working group, a book club,
                            etc), ask each other for advice, share interesting Ruby resources and so
                            much more!
                        </p>
                        <p className="mb-4">
                            We also have a monthy meetup which features two technical talks, and
                            breakout groups for community building. To register for our monthly
                            meetup, you must first join our Google Group. Once added, you will
                            receive an email with a calendar event for each of our future meetups.
                        </p>
                        <p className="mb-4">
                            By filling out this form, you give the organizers of WNB.rb permission
                            to add you to our Slack workspace and / or Google Group.
                        </p>
                        <p className="mb-4">
                            WNB.rb will not share your email with other community members or
                            third-party organizations. Your membership in the Google Group will
                            remain hidden from everyone except the WNB.rb organizers.
                        </p>
                        <p className="mb-4">
                            See our code of conduct{' '}
                            <a
                                href="https://tinyurl.com/wnb-rb-coc"
                                className="whitespace-nowrap font-medium hover:text-red-400"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                here
                            </a>
                        </p>
                        <hr className="my-8" />
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                joinSlack: '',
                                joinGoogleGroup: '',
                                identifyAs: false,
                                currentJob: '',
                                lookingForJob: '',
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Name is required'),
                                email: Yup.string()
                                    .email('Invalid email address')
                                    .required('Email is required'),
                                joinSlack: Yup.string().required('This is a required question'),
                                joinGoogleGroup: Yup.string().required(
                                    'This is a required question',
                                ),
                                identifyAs: Yup.boolean()
                                    .required('This is a required question')
                                    .oneOf([true], 'This is a required question'),
                            })}
                            onSubmit={async (values) => {
                                await new Promise((r) => setTimeout(r, 500));
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name" className="mb-3">
                                        What is your name?
                                    </label>
                                    <Field name="name" type="text" />
                                    <ErrorMessage
                                        name="name"
                                        component="p"
                                        className="error-message"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">What is your email?</label>
                                    <Field name="email" type="text" />
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="error-message"
                                    />
                                </div>
                                <fieldset role="group">
                                    <legend>
                                        Would you like to be added to our Slack workspace?
                                    </legend>
                                    <p className="input-description">
                                        Slack is WNB.rb‘s primary means of communication. It is an
                                        awesome community of over 350 Rubyists and includes channels
                                        for advice, technical help, interview prep, and much more!
                                    </p>
                                    <label htmlFor="joinSlack_yes" className="label-radiobutton">
                                        <Field
                                            type="radio"
                                            id="joinSlack_yes"
                                            name="joinSlack"
                                            value="Yes"
                                        />
                                        Yes
                                    </label>
                                    <label htmlFor="joinSlack_no" className="label-radiobutton">
                                        <Field
                                            type="radio"
                                            id="joinSlack_no"
                                            name="joinSlack"
                                            value="No"
                                        />
                                        No
                                    </label>
                                    <label
                                        htmlFor="joinSlack_already_in"
                                        className="label-radiobutton"
                                    >
                                        <Field
                                            type="radio"
                                            id="joinSlack_already_in"
                                            name="joinSlack"
                                            value="Already in WNB.rb Slack"
                                        />
                                        Already in WNB.rb Slack
                                    </label>
                                    <ErrorMessage
                                        name="joinSlack"
                                        component="p"
                                        className="error-message"
                                    />
                                </fieldset>

                                <fieldset role="group">
                                    <legend>Would you like to be added to our Google Group?</legend>
                                    <p className="input-description">
                                        This allows us to send you the invitation for our monthly
                                        meetups featuring two technical talks and breakout rooms.
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
                                        Already in WNB.rb Slack
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
                                        We ask that anybody who fills out this form identify as a
                                        woman or non-binary person. We recognize that it may be
                                        unsafe for members of the queer community to publicly
                                        identify with a gender other than the one they were assigned
                                        at birth. Anyone who identifies as a woman or non-binary
                                        person, publicly or privately, regardless of their name,
                                        appearance, or gender presentation, is welcome. For more
                                        information, see our{' '}
                                        <a
                                            href="https://tinyurl.com/wnb-rb-coc"
                                            className="whitespace-nowrap font-medium hover:text-red-400"
                                            rel="noopener noreferrer"
                                            target="_blank"
                                        >
                                            code of conduct
                                        </a>
                                    </p>
                                    <label htmlFor="identifyAs" className="label-checkbox">
                                        <Field type="checkbox" id="identifyAs" name="identifyAs" />
                                        Yes
                                    </label>

                                    <ErrorMessage
                                        name="identifyAs"
                                        component="p"
                                        className="error-message"
                                    />
                                </fieldset>
                                <hr className="my-12" />
                                <h2>About Your Work</h2>
                                <p className="mb-8">
                                    The following questions are about your work. Only the WNB.rb
                                    organizers will use this information. We use it to better
                                    understand the needs of community members, and how we can
                                    support them. You are not required to answer them.
                                </p>

                                <div className="form-group">
                                    <label htmlFor="currentJob">Where do you currently work?</label>
                                    <p className="input-description">
                                        If you‘re self-employed, unemployed, or a student, please
                                        let us know as well!
                                    </p>
                                    <Field name="currentJob" type="text" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lookingForJob">
                                        Are you currently looking for a job, or do you anticipate
                                        looking for a job in the next 6 months?
                                    </label>
                                    <Field name="lookingForJob" type="text" />
                                </div>
                                <hr className="my-12" />

                                <Button type="secondary" className="w-full md:w-6/12 mt-4 mx-auto">
                                    <input
                                        type="submit"
                                        value="Submit"
                                        className="bg-transparent hover:cursor-pointer"
                                    />
                                </Button>
                            </Form>
                        </Formik>
                    </Card>
                </div>
            </SharedLayout>
        </>
    );
};

export default JoinUs;

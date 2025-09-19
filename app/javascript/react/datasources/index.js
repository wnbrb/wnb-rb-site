import { UnauthorizedError } from '../errors';

const API_ROOT = '/api';

export const getPastMeetups = async () => {
    const result = await fetch(`${API_ROOT}/events/past`);
    const json = await result.json();
    return json.data;
};

export const getJobs = async (token) => {
    if (token === null || token === undefined) {
        throw new UnauthorizedError('Unauthorized to view jobs');
    }

    const headers = new Headers();
    headers.append('Authorization', `Bearer ${token}`);

    const result = await fetch(`${API_ROOT}/jobs`, { headers });

    if (result.status === 401) {
        throw new UnauthorizedError('Unauthorized to view jobs');
    } else if (result.status != 200) {
        throw new Error('There was an error fetching the jobs.');
    }

    const json = await result.json();
    return json.data;
};

export const postJobsAuthenticate = async (password) => {
    const result = await fetch(`${API_ROOT}/jobs/authenticate`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            password,
        }),
    });

    if (result.status === 401) {
        throw new UnauthorizedError('The password was incorrect');
    } else if (result.status != 201) {
        throw new Error('There was an error verifying the password');
    }

    return await result.json();
};

export const submitLeadForm = async (info) => {
    const csrf = document.querySelector("meta[name='csrf-token']").getAttribute('content');
    return fetch(`${API_ROOT}/register-user`, {
        method: 'post',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrf,
        },
        body: JSON.stringify(info),
    })
        .then(async (resp) => {
            const responseStatus = resp.status;
            const json = await resp.json();

            return {
                status: responseStatus,
                json: json,
            };
        })
        .catch((err) => err);
};

export const donationAmounts = (environment) => {
    return environment === 'development' ? testDonationAmounts : productionDonationAmounts;
};

const testDonationAmounts = [
    { value: 10, link: 'https://buy.stripe.com/test_fZe3cr0hWfIN0i4289' },
    { value: 25, link: 'https://buy.stripe.com/test_14k3crfcQaot7Kw6oq' },
    { value: 50, link: 'https://buy.stripe.com/test_6oEaET9Sw1RXfcY8wz' },
    { value: 75, link: 'https://buy.stripe.com/test_8wM28n4yc7chfcY007' },
    { value: 100, link: 'https://buy.stripe.com/test_14k14je8MgMRd4Q3cc' },
    { value: 200, link: 'https://buy.stripe.com/test_fZe8wL8Os0NT9SEeUY' },
    { value: 500, link: 'https://buy.stripe.com/test_bIYfZdggU1RX9SE5kp' },
    { value: 1000, link: 'https://buy.stripe.com/test_9AQfZd0hWdAF1m8cMS' },
];

const productionDonationAmounts = [
    { value: 10, link: 'https://buy.stripe.com/14k14KcpbcJ4bwQbIK' },
    { value: 25, link: 'https://buy.stripe.com/dR600G74RbF0fN6003' },
    { value: 50, link: 'https://buy.stripe.com/7sI00G60N9wSeJ2bIM' },
    { value: 75, link: 'https://buy.stripe.com/6oEeVA60NbF06cwcMR' },
    { value: 100, link: 'https://buy.stripe.com/7sI14K74RcJ40Sc6ou' },
    { value: 200, link: 'https://buy.stripe.com/00gaFk1Kx9wSfN6dQX' },
    { value: 500, link: 'https://buy.stripe.com/4gw3cSexj38u44o7sA' },
    { value: 1000, link: 'https://buy.stripe.com/8wMeVAbl710mdEY009' },
];

export const getPastMeetup = async (year, month, day) => {
    const result = await fetch(`${API_ROOT}/events/${year}/${month}/${day}`);
    const json = await result.json();
    return json.data;
};

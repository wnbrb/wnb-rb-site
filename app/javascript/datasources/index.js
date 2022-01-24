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

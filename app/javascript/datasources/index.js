const API_ROOT = '/api';

export const getPastMeetups = async () => {
    const result = await fetch(`${API_ROOT}/events/past`);
    const json = await result.json();
    return json.data;
};

export const getJobs = async () => {
    const result = await fetch(`${API_ROOT}/jobs`);
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

    if (result.status !== 201) {
        throw new Error('Incorrect password');
    }

    return await result.json();
};

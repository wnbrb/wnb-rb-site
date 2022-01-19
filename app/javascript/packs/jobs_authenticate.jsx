import React from 'react';
import ReactDOM from 'react-dom';
import JobsAuthenticate from 'components/pages/JobsAuthenticate';
// import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
// import { useCookies } from 'react-cookie';
// import { postJobsAuthenticate } from '../datasources';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.createElement('div');
    body.style = 'min-height: 100vh';

    ReactDOM.render(<JobsAuthenticate />, document.body.appendChild(body));
});
//     ReactDOM.render(<PasswordInput />, document.body.appendChild(body));
// });

// const PasswordInput = () => {
//     const [password, setPassword] = useState('');
//     const [setCookie] = useCookies(['token']);

//     const handleSubmit = async () => {
//         const data = await postJobsAuthenticate(password);
//         console.log({ data });
//         setCookie('token', data.token);
//     };

//     return (
//         <>
//             <>
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                 ></input>
//                 <button onClick={(e) => handleSubmit(e)}>Submit</button>
//             </>
//         </>
//     );
// };

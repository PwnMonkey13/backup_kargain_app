import React from 'react';

const userAgent = ({userAgent}) => {
    return <div>Hello World {userAgent}</div>
};

userAgent.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    return { userAgent };
};

export default userAgent;

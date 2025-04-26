const basicAuth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        res.set('WWW-Authenticate', 'Basic realm="Access to the registrations"');
        return res.status(401).send('Authentication required.');
    }

    const base64Credentials = authHeader.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    const validUsername = process.env.USER_NAME;
    const validPassword = process.env.USER_PWD;

    if (username === validUsername && password === validPassword) {
        next();
    } else {
        res.set('WWW-Authenticate', 'Basic realm="Access to the registrations"');
        return res.status(401).send('Access denied.');
    }
};

module.exports = basicAuth;
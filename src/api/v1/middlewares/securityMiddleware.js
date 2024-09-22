import helmet from 'helmet';

const securityMiddleware = helmet({
    contentSecurityPolicy: false,
    frameguard: {
        action: 'deny'
    },
    referrerPolicy: {
        policy: 'no-referrer'
    },
    hsts: false,
    xssFilter: true,
    noSniff: true,
    hidePoweredBy: true
});

export default securityMiddleware;

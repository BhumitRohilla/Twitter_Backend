require('dotenv').config();

const config = (env) => {
    switch(env) {
        case 'testing': {
            return {
                cookie : {
                    domain: '.twitter.bhumitrohilla.in',
                    maxAge: 60 * 60 * 1000,
                    sameSite: 'strict',
                    httpOnly: true,
                },
                port: 4000,
                host: 'backend.twitter.bhumitrohilla.in',
            }
        }
    }
}

module.exports = config(process.env.NODE_ENV);
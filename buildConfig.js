const env = process.env.BUILD_ENV;
const config = {
    development: {
        captUrl: 'https://cfgpassportuat2.eastmoney.com/captcha/scripts/em_capt.js'
    },
    test: { captUrl: 'https://cfgpassportuat2.eastmoney.com/captcha/scripts/em_capt.js' },
    production: { captUrl: 'https://cfgpassport2.eastmoney.com/captcha/scripts/em_capt.js' }
};
module.exports = config[env];

const secrets = {
    dbURI: 'mongodb://testUser:testing1@ds135441.mlab.com:35441/to-do-app-cond'
};


export const getSecret = key => secrets[key];
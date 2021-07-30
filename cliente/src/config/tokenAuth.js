import clientAxios from './axios';

const tokenAuth = token => {
    if(token) {
        clientAxios.defaults.headers.common['x-token'] = token;
    } else {
        delete clientAxios.defaults.headers.common['x-token'];
    }
}

export default tokenAuth;
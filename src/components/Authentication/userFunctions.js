import axios from 'axios'
import { LOGIN_URL } from '../../config/rest_endpoints'
// export const RegisterUser = newUser => {

//     return axios.post(`http://localhost:8080/api/account/signup`, {
//         "firstName": newUser.f_name,
//         "lastName": newUser.l_name,
//         "email": newUser.email,
//         "password": newUser.password,
//     }).then(res => {
//         console.log('UserRegister', res);
//     }).catch(err => {
//         console.log('err', err);
//     })
// }

export const UserLogin = user => {

    return axios.post(LOGIN_URL, {
        email: user.email,
        password: user.password,
    },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        }
    ).then(res => {
        let token = res.headers['x_auth_token'];
        console.log('token', token);
        localStorage.setItem('token', token)
        console.log('Login', res);
        return res.data
    }).catch(err => {
        console.log('err', err);
    })
}
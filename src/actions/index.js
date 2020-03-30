import axios from 'axios';
import { LOGIN_URL } from "../config/rest_endpoints";
import { Notifications } from '../components/common/notification';
import { DATA_KEY } from './globalKeys';
import { getUser } from './session';
export const ACTIVE_USER = "save_user";



/**
 * Validate the user
 * ----------------------
 * 
 * @param {*} loginDetails : {username, password}
 */
export function login(loginDetails) {
    return function (dispatch) {
        let body = {
            email: loginDetails.username,
            password: loginDetails.password
        }
        let header = { headers: { 'Content-Type': 'application/json' } }
        let error = () => Notifications.notify("Unable to Authorized User", "error", "error");

        axios.post(LOGIN_URL, body, header).then(res => {
            let token = res.headers['x_auth_token'];
            if (res.status === 200) {
                res = {
                    ...res.data.data,
                    "permissions": "/,/accounts",
                    "token": token
                }
                res = { [DATA_KEY]: res }
                dispatch({
                    type: ACTIVE_USER,
                    payload: res
                })
            }
            else {
                error()
            }
        }).catch(_ => {
            error()
        })
    }
}



/**
 *  Get the user Details
 * ------------------------
 * 
 */
export function fetchUser() {
    return function (dispatch) {
        let res = getUser()
        res = { [DATA_KEY]: res }

        dispatch({
            type: ACTIVE_USER,
            payload: res
        })
    }
}
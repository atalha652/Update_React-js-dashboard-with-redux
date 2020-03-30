import { isValidDict } from "./validator";

export const SESSION_USER_KEY = "user"


export function saveUser(user) {
    if (isValidDict(user)) {
        localStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
    }
}

export function getUser() {
    let user = localStorage.getItem('user');
    if (user) {
        return JSON.parse(user)
    }
    return null
}
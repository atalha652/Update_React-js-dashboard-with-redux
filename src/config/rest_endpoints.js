const PROTOCOL = 'http';
const SERVER_IP = '207.38.67.26';
const PORT = '8080';

export const SERVER_PATH = `${PROTOCOL}://${SERVER_IP}:${PORT}`;
export const ROOT_URL = `${SERVER_PATH}`;

// Login url
//post
export const LOGIN_URL = `${ROOT_URL}/login`

// For Main Page
//get
export const USER_COUNT = `${ROOT_URL}/user/count`
//get
export const CALL_COUNT = `${ROOT_URL}/callcount`

// For Account 
//post
export const ACCOUNT_CREATED = `${ROOT_URL}/user`
//get
export const ACCOUNT_LISTING = `${ROOT_URL}/user`
//update user
export const Account_Update = `${ROOT_URL}/user`
//change status
export const Account_STATUS_CHANGE = `${ROOT_URL}/user`

// For Add_additonal_info_account
//For Billing
//post
export const BILLING_CREATED = `${ROOT_URL}/user`
//get
export const BILLING_LISTING = `${ROOT_URL}/user`

//ServerConnfig
//post
export const SERVER_CREATED = `${ROOT_URL}/user`
//get
export const SERVER_LISTING = `${ROOT_URL}/user`

//Call_logs
//post

//get
export const CALL_LOG_LISTING = `${ROOT_URL}/user`

//Balance ADD
//post
export const BALANCE_ADD = `${ROOT_URL}/user`
//get


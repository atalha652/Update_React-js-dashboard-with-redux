import {ACTIVE_USER} from '../actions'
import { DATA_KEY } from '../actions/globalKeys';

export default function (state={}, action) {
    switch(action.type) {
        case ACTIVE_USER:
            var tempState = action.payload[DATA_KEY];
            return tempState;
        default:
            return state;
    }
}
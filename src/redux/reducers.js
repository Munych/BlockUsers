import {
    combineReducers,
} from 'redux';
import {CHANGE_MODAL_VISIBLE, BLOCK_USER} from './action-types'
import BlockUser from '../BlockUser';

const initialState = {
    visible: false,
    dar: "213", 
}

export const modal = (state = initialState, action) => {
    console.log(state)
    if (action.type === CHANGE_MODAL_VISIBLE) {
        console.log(action.content)
        return {
            visible: !state.visible,
            content: action.content, 
        }
    }

    if (action.type === 'TEST') {
        return {
            test: 'test',
        }
    }
    if (action.type === BLOCK_USER){
        console.log(action.block)
        return {
           // content: action.payload.content,
            blocks: action.block    
        }
    }
    console.log(state.blocks)
    return state;
};

export const reducers = combineReducers({
    modal,
});

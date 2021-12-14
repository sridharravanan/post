import {
    SUBMIT_POST_REQUEST,
    SUBMIT_POST_SUCCESS,
    SUBMIT_POST_FAILURE,
    SUBMIT_POST_RESET,
} from "../../actions/post/actionType";

import { SubmitActions, SubmitPostState } from "../../actions/post/type";


export const initialState: SubmitPostState = {
    pending: false,
    post: { id: 0, userId: 0, title: "", body: "" },
    error: null
};

export default (state = initialState, action: SubmitActions) => {
    switch (action.type) {
        case SUBMIT_POST_REQUEST:
            return {
                ...state,
                pending: true,
            };

        case SUBMIT_POST_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error,
                isSuccess:false,
            };
        case SUBMIT_POST_SUCCESS:
            return {
                ...state,
                pending: false,
                error: [],
                isSuccess:true,
            };
            case SUBMIT_POST_RESET:
                return {...initialState};
        default:
            return {
                ...state,
            };
    }
};
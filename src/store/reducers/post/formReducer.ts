import {
    SUBMIT_POST_REQUEST,
    SUBMIT_POST_SUCCESS,
    SUBMIT_POST_FAILURE,
} from "../../actions/post/actionType";

import { SubmitActions, SubmitPostState } from "../../actions/post/type";


const initialState: SubmitPostState = {
    pending: false,
    post: {
        title: "",
        body: "",
    },
    error: null,
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
            };

        default:
            return {
                ...state,
            };
    }
};
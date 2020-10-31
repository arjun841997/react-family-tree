import api from "../api";
import {NotificationManager} from 'react-notifications';
export const saveTree = (data) => async(dispatch) => {
    const response = await api.post('/family', data);
    NotificationManager.success('Family Tree Saved Successfully.', 'Success!!');
    dispatch({
        type: 'SAVE_TREE',
        payload: response
    });
}

export const getFamilies = (data) => async(dispatch) => {
    const response = await api.get('/family');
    dispatch({
        type: 'GET_FAMILIES',
        payload: response
    });
}
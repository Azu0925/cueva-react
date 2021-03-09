export const SET_REQUEST_ERROR_ACTION = 'SET_REQUEST_ERROR_ACTION'
export const setRequestErrorAction = (error) => {
    return{
        type:'SET_REQUEST_ERROR_ACTION',
        payload:error
    }
}
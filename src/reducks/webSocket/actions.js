export const CHANGE_WEBSOCKET_ACTION = 'CHANGE_WEBSOCKET_ACTION'
export const changeWebSocketAction = (connection) => {
    console.log('actiionConnection',connection)
    return{
        type:'CHANGE_WEBSOCKET_ACTION',
        payload:connection
    }
}
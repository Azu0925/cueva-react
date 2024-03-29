export const UPDATE_MAP_SIZE_ACTION = 'UPDATE_MAP_SIZE_ACTION';
export const updateMapSizeAction = (size) => {
    return{
        type:'UPDATE_MAP_SIZE_ACTION',
        payload:size
    }
}

export const CHANGE_MAP_ACTION = 'CHANGE_MAP_ACTION';
export const changeMapAction = (pMap) => {
    return{
        type:'CHANGE_MAP_ACTION',
        payload:pMap
    }
}

export const FETCH_MAP_DETAIL_ACTION = 'FETCH_MAP_DETAIL_ACTION';
export const fetchMapDetailAction = (detail) => {
    return{
        type:'FETCH_MAP_DETAIL_ACTION',
        payload:detail
    }
}

export const UPDATE_MAP_ACTION = 'UPDATE_MAP_ACTION';
export const updateMapAction = (mapInfo) => {
    console.log('マップ更新処理アクション発酵')
    return{
        type:'UPDATE_MAP_ACTION',
        payload:mapInfo
    }
}

export const UPDATE_AXIS_ACTION = 'UPDATE_AXIS_ACTION';
export const updateAxisAction = (axis) => {
    return{
        type:'UPDATE_AXIS_ACTION',
        payload:axis
    }
}

export const UPDATE_MAP_ID_ACTION = 'UPDATE_MAP_ID_ACTION';
export const updateMapIdAction = (mapInfo) => {
    return{
        type:'UPDATE_MAP_ID_ACTION',
        payload:mapInfo
    }
}

export const  UPDATE_NAP_AXIS = 'UPDATE_NAP_AXIS';
export const updateMapAxisAction = (axis) => {
    return{
        type:'UPDATE_NAP_AXIS',
        payload:axis
    }
}

export const CLEAR_MAP_ACTION = 'CLEAR_MAP_ACTION'
export const clearMapAction = () => {
    return{
        type:'CLEAR_MAP_ACTION'
    }
}
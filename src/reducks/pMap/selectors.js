import {createSelector} from 'reselect';

const pMapSelector = state => state;

export const getMapSize = createSelector(
    [pMapSelector],
    state => state.pMap.size
)

export const getUnsetRefCurrent = createSelector(
    [pMapSelector],
    state => state.pMap.unsetRefCurrent
)

export const getMapHostId = createSelector(
    [pMapSelector],
    state => state.pMap.hostId
)

export const getMapNameAndDetail = createSelector(
    [pMapSelector],
    state => [state.pMap.mapName,state.pMap.mapDetail]
)

export const getMapAxis = createSelector(
    [pMapSelector],
    state => state.pMap.axis
)

export const getMapId = createSelector(
    [pMapSelector],
    state => state.pMap.mapId
)
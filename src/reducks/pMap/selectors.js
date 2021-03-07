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

export const getMapNameAndDetail = createSelector(
    [pMapSelector],
    state => [state.pMap.map_name,state.pMap.map_description]
)

export const getMapAxis = createSelector(
    [pMapSelector],
    state => state.pMap.axis
)

export const getMapId = createSelector(
    [pMapSelector],
    state => state.pMap.map_id
)

export const getMap = createSelector(
    [pMapSelector],
    state => state.pMap
)

export const getMapName = createSelector(
    [pMapSelector],
    state => state.pMap.map_name
)
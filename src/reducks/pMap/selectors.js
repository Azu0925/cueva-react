import {createSelector} from 'reselect';

const pMapSelector = state => state;

export const getCards = createSelector(
    [pMapSelector],
    state => state.pMap.cards
)

export const getSelectedCard = createSelector(
    [pMapSelector],
    state => state.pMap.cards[state.pMap.selectedCardId]
)
export const getSelectedCardId = createSelector(
    [pMapSelector],
    state => state.pMap.selectedCardId
)

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
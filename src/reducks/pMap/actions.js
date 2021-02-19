export const ADD_CARD_ACTION = 'ADD_CARD_ACTION';
export const addCardAction = (card) => {
    return{
        type:'ADD_CARD_ACTION',
        payload:card
    }
}

export const UPDATE_CARD_ACTION = 'UPDATE_CARD_ACTION';
export const updateCardAction = (card) => {
    return{
        type:'UPDATE_CARD_ACTION',
        payload:card
    }
}

export const SELECT_CARD_ACTION = 'SELECT_CARD_ACTION'
export const selectCardAction = (selectedCardId) => {
    return{
        type:'SELECT_CARD_ACTION',
        payload:selectedCardId
    }
}

export const DELETE_CARD_ACTION = 'DELETE_CARD_ACTION'
export const deleteCardAction = (deleteMaterial) => {
    return{
        type:'DELETE_CARD_ACTION',
        payload:deleteMaterial
    }
}

export const SORT_CARDS_ACTION = 'SORT_CARDS_ACTION'
export const sortCardsAction = (cards) => {
    return{
        type:'SORT_CARDS_ACTION',
        payload:cards
    }
}

export const DESELECT_CARD_ACTION = 'DESELECT_CARD_ACTION'
export const deselectCardAction = (cards) => {
    return{
        type:'DESELECT_CARD_ACTION'
    }
}

export const FETCH_CARDS_ACTION = 'FETCH_CARDS_ACTION';
export const fetchCardsAction = (cards) => {
    return{
        type:'FETCH_CARDS_ACTION',
        payload:cards
    }
}

export const UPDATE_MAP_SIZE_ACTION = 'UPDATE_MAP_SIZE_ACTION';
export const updateMapSizeAction = (size) => {
    return{
        type:'UPDATE_MAP_SIZE_ACTION',
        payload:size
    }
}
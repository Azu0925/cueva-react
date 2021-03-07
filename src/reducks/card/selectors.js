import {createSelector} from 'reselect';

const cardSelector = state => state;

export const getCards = createSelector(
    [cardSelector],
    state => state.cards.cards
)

export const getSelectedCard = createSelector(
    [cardSelector],
    state => state.cards.cards.filter(card => card.id === state.cards.selectedCardId)[0]
)
export const getSelectedCardId = createSelector(
    [cardSelector],
    state => state.cards.selectedCardId
)

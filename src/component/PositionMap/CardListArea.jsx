import React from 'react'
import {useSelector} from 'react-redux'
import {getCards,getSelectedCardId} from '../../reducks/card/selectors'
import {makeStyles} from '@material-ui/styles';
import {CardTitle} from './index'

const useStyles = makeStyles({
    root:{
        width:'100%',
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'space-around',
        alignItems:'center'
    }
})

const CardListArea = () => {
    console.log('CardListArea再レンダリング')
    const classes = useStyles()
    const selector = useSelector(state => state)
    
    const cards = getCards(selector)
    const selectedCardId = getSelectedCardId(selector)
    return(
        <div className={classes.root}>
            {cards.length > 0 && (
                cards.map((card,i) => (
                    <CardTitle id={i} name={card.name} selectedCardId={selectedCardId}  key={i} />
                ))
            )}
        </div>
    )


}

export default CardListArea
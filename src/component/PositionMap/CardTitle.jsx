import React from 'react'
import {useDispatch} from 'react-redux'
import {selectCard} from '../../reducks/pMap/operations'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    root:{
        width:'30%',
        height:'3rem',
        border:'solid 1px gray',
        marginTop:'1rem',
        marginBottom:'1rem',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
    },
    selectedCard:{
        width:'30%',
        height:'3rem',
        border:'solid 3px black',
        marginTop:'1rem',
        marginBottom:'1rem',
        display:'flex',
        justifyContent:'space-around',
        alignItems:'center'
    },
    title:{
        textAlign:'center'
    }
})

const CardTitle = (props) => {
    console.log('CardTitle再レンダリング')
    const classes = useStyles()
    const dispatch = useDispatch()

    const selectedCardId = props.selectedCardId
    const id = props.id
    const name = props.name

    const handleOnClick = () => {
        dispatch(selectCard(id))
        console.log('通過')
    }

    return(
        <Card
            className={(id === selectedCardId) ? classes.selectedCard : classes.root}
            onClick={() => handleOnClick()}
        >
            <p className={classes.title}>{name}</p>
        </Card>
    )



}
export default CardTitle
import React from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/styles';
import {InputText} from '../UIKit/index'
import {updateCard} from '../../reducks/pMap/operations'
import {getSelectedCard,getSelectedCardId} from '../../reducks/pMap/selectors'


const useStyles = makeStyles({
    root:{
        padding:'1rem',
    },
    coordinate:{
        width:'30%',
        display:'inline-block',

    },
    label:{
        display:'inline-block',
        paddingTop:'1rem'
    }
})

const EditPositionMap = () => {
    console.log('EditPositionMap再レンダリング')
    const classes = useStyles();
    const dispatch = useDispatch()
    const selector = useSelector(state => state)

    const selectedCard = getSelectedCard(selector)//storeのcardsから選択中のカードのみを取得。
    const selectedCardId = getSelectedCardId(selector)//storeのselectedCardIdを取得。

    //選択中カードがある場合は代入
    let {name,detail,x,y,width,height} = ""
    if(selectedCardId !== ""){
        name = selectedCard.name
        detail = selectedCard.detail
        x = selectedCard.x
        y = selectedCard.y
        width = selectedCard.width
        height = selectedCard.height
    }
    
    const handleBlurOfName = (e) => {
        const newName = e.target.value
        dispatch(updateCard(selectedCardId,newName,detail,x,y,width,height))
    }
    const handleBlurOfDetail = (e) => {
        const newDetail = e.target.value;
        dispatch(updateCard(selectedCardId,name,newDetail,x,y,width,height))
    }

    const handleKeyDown =(e) => {
        if(e.keyCode === 13) e.target.blur()
    }

    return(
        <Paper elevation={3} className={classes.root}>
            <InputText
                fullWidth={true}
                label={"カード名"}
                multiline={true}
                required={true}
                rows={1}
                type={"text"}
                shrink={true}
                defaultValue={name}
                onBlur={(e) => handleBlurOfName(e)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="spacer--medium" />
            <InputText
                fullWidth={true}
                label={"カード詳細（KBF）"}
                multiline={true}
                required={true}
                rows={2}
                type={"text"}
                shrink={true}
                defaultValue={detail}
                onBlur={(e) => handleBlurOfDetail(e)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="spacer--medium" />
            <p className={classes.label}>横軸（Ｘ座標）：{x}</p>
            <div className="spacer--extra-extra-small" />
            <p className={classes.label}>縦軸（Ｙ座標）：{y}</p>
            <div className="spacer--medium" />
        </Paper>
    )
}

export default EditPositionMap;
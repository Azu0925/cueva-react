import React,{useEffect,useCallback} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {PositionCard,DraggableCard} from './index'
import {makeStyles} from '@material-ui/styles';
import {addCard,deselectCard,fetchCards} from '../../reducks/pMap/operations';
import {getCards,getSelectedCardId,getUnsetRefCurrent} from '../../reducks/pMap/selectors'

const useStyles = makeStyles({
    root:{
        height:'100%'
    }
})


const PositionMap= () => {
    console.log('PositionMap再レンダリング')
    const classes = useStyles()
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const Cards = getCards(selector);//storeのcardsを取得
    const selectedCardId = getSelectedCardId(selector)//storeのselectedCardIdを取得
    const unsetRefCurrent = getUnsetRefCurrent(selector)
    
    const generateCard = useCallback((e) => {//ダブルクリックで座標を取得してカードを追加
        const newPosition = {
            x:e.offsetX,
            y:e.offsetY
        }
        dispatch(addCard("","",newPosition.x,newPosition.y,100,150));
    },[dispatch])

    

    useEffect(() => {//最初にダブルクリックのイベントリスナーを登録。
        let target = document.getElementById('generateCardArea');
        target.addEventListener('dblclick',(e) => generateCard(e));
    },[generateCard])

    return(
        <>
            <div className={classes.root} id="generateCardArea">
                {Cards.length > 0 && (//cardsの中身がある場合、cardsの要素数だけmapで回してCardコンポ―ネントを作成
                    Cards.map((card,i) => (
                        <DraggableCard
                            card={card}
                            key={i}
                            id={i}
                            isSelected={i === selectedCardId}
                            unsetRefCurrent={unsetRefCurrent}
                        />
                    ))
                )}
            </div>
        </>
    )
    
}

export default PositionMap

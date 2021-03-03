import React,{useEffect,useCallback} from 'react'
import {useDispatch,useSelector} from 'react-redux';
import {DraggableCard} from './index'
import {makeStyles} from '@material-ui/styles';
import {addCard} from '../../reducks/card/operations';
import {getCards,getSelectedCardId} from '../../reducks/card/selectors'
import {updateMapAxis} from '../../reducks/pMap/operations';
import {getUnsetRefCurrent,getMapAxis,getMapId} from '../../reducks/pMap/selectors'
import {InputText} from '../../component/UIKit'

const useStyles = makeStyles({
    root:{
        height:'100%',
    },
    axis:{
        
    },
    verticalAxis:{
        position: 'absolute',
        left: 'calc(50% + 1em)',
        whiteSpace: 'nowrap',
    },
    vaHigh:{
        top: '2em'
    },
    vaLow:{
        bottom:'2em'
    },
    horizontalAxis:{
        position: 'absolute',
        top: 'calc(50% + 1em)',
        whiteSpace: 'nowrap',
        writingMode: 'initial'
    },
    haHigh:{
        right: '2em'
    },
    haLow:{
        left:'2em'
    }

})


const PositionMap= () => {
    console.log('PositionMap再レンダリング')
    const classes = useStyles()
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const axis = getMapAxis(selector)//storeの軸情報（上下左右を取得）
    const Cards = getCards(selector);//storeのcardsを取得
    const selectedCardId = getSelectedCardId(selector)//storeのselectedCardIdを取得
    const unsetRefCurrent = getUnsetRefCurrent(selector)
    const mapId = getMapId(selector)

    //////////マップ上軸のタイトル
    const vaHigh = axis.vaHigh
    const vaLow = axis.vaLow
    const haHigh = axis.haHigh
    const haLow = axis.haLow

    useEffect(() => {
        console.log('Axis_effect')
    },[vaHigh,vaLow,haHigh,haLow])

    const handleOnBlurOfVaHigh = (e) => dispatch(updateMapAxis(e.target.value,vaLow,haHigh,haLow))
    const handleOnBlurOfVaLow = (e) => dispatch(updateMapAxis(vaHigh,e.target.value,haHigh,haLow))
    const handleOnBlurOfHaHigh = (e) => dispatch(updateMapAxis(vaHigh,vaLow,e.target.value,haLow))
    const handleOnBlurOfHaLow = (e) => dispatch(updateMapAxis(vaHigh,vaLow,haHigh,e.target.value))

    const handleKeyDown =(e) => {
        if(e.keyCode === 13) e.target.blur()
    }

    //////////マップ上カード
    const generateCard = useCallback((e) => {//ダブルクリックで座標を取得してカードを追加
        if(mapId === "") return//マップ非選択時にカードを生成してはいけないのでリターン
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
            <div id="generateCardArea">
                
                {
                    //縦軸(高)///////////////////////////////////////////
                }
                <div className={classes.verticalAxis + " " + classes.vaHigh}>
                    <InputText
                        fullWidth={true}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        shrink={true}
                        variant={"outlined"}
                        defaultValue={vaHigh}
                        onBlur={(e) => handleOnBlurOfVaHigh(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                {
                    //縦軸(低)///////////////////////////////////////////
                }
                <div className={classes.verticalAxis + " " + classes.vaLow}>
                    <InputText
                        fullWidth={true}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        shrink={true}
                        variant={"outlined"}
                        defaultValue={vaLow}
                        onBulur={(e) => handleOnBlurOfVaLow(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                {
                    //横軸(高)///////////////////////////////////////////
                }
                <div className={classes.horizontalAxis + " " + classes.haHigh}>
                    <InputText
                        fullWidth={true}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        shrink={true}
                        variant={"outlined"}
                        defaultValue={haHigh}
                        onBlur={(e) => handleOnBlurOfHaHigh(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                {
                    //横軸(低)///////////////////////////////////////////
                }
                <div className={classes.horizontalAxis + " " + classes.haLow}>
                    <InputText
                        fullWidth={true}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"text"}
                        shrink={true}
                        variant={"outlined"}
                        defaultValue={haLow}
                        onBlur={(e) => handleOnBlurOfHaLow(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                </div>
                
                {Cards.length > 0 && (//cardsの中身がある場合、cardsの要素数だけmapで回してCardコンポ―ネントを作成
                    Cards.map((card,i) => (
                        <DraggableCard
                            card={card}
                            key={i}
                            id={card.id}//←ここただのiにしてたけど、card自体のIdをdraggableカードの非同期で渡さないといけないから変更してる。
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

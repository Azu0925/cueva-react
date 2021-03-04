import React,{useState,useEffect,useRef,useCallback,useContext} from 'react'
import {WebSocketContext} from '../../templete/Main'
import {useDispatch,useSelector} from 'react-redux'
import {selectCard,updateCard,deleteCard} from '../../reducks/card/operations'
import {getMapSize} from '../../reducks/pMap/selectors'
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import {InputText} from '../UIKit'
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    card:{
        position:'absolute',
        backgroundColor:'white',
        border:'solid 1px gray',
        paddingBottom:0,
    },
    selectedCard:{
        position:'absolute',
        overflow:'auto',
        backgroundColor:'white',
        border:'solid 1px black',
        paddingBottom:0
        
    },
    handleArea:{
        height:'20%'
    },
    mainArea:{
        height:'70%'
    },
    footer:{
        height:'10%',
        backgroundColor:'red',
        paddingBottom:0,
        marginBottom:0,
    },
    iconWrapper:{
        display:'flex',
        justifyContent:'flex-end'
    },
    iconButton:{
        padding:0,
        margin:'5px 5px 0 0',
    },
    icon:{
        width:'1rem',
        height:'1rem'
    }
})

const DraggableCard = (props) => {
    //console.log('card再レンダリング')
    const classes = useStyles()
    const dispatch = useDispatch()
    const selector = useSelector(state => state)

    const mapSize = getMapSize(selector)
    const mapWidth = mapSize.width
    const mapHeight = mapSize.height

    const cardId = props.id//ここのprops.idをmapのkeyではなくDBに登録されているカード自体のカードIDにしても大丈夫なはず21/03/03
    const card = props.card
    const name = card.name
    const detail = card.detail
    const x = card.x
    const y = card.y
    const width = card.width
    const height = card.height


    const cardRef = useRef(null);
    const ws = useContext(WebSocketContext);

    const [currentName,setCurrentName] = useState("")
    const [currentX,setCurrentX] = useState(0)
    const [currentY,setCurrentY] = useState(0)
    const [currentWidth,setCurrentWidth] = useState(0)
    const [currentHeight,setCurrentHeight] = useState(0)
    
    const inputCurrentName = useCallback((e) => {
        setCurrentName(e.target.value)
    },[setCurrentName])

    useEffect(() => {//カードのサイズ変更を検知するResizeObserverAPIの設定と破棄
        const resizeObserver = new ResizeObserver((entries) => {
            setCurrentWidth(entries[0].borderBoxSize[0].inlineSize)
            setCurrentHeight(entries[0].borderBoxSize[0].blockSize)
        });
        cardRef.current && resizeObserver.observe(cardRef.current);

        return () => {
            resizeObserver.disconnect()
        }

    },[])

    useEffect(() => {
        setCurrentName(name)
        setCurrentX(x)
        setCurrentY(y)
        setCurrentWidth(width)
        setCurrentHeight(height)
    },[name,detail,x,y,width,height])

    const handleOnDrag = (DraggableEvent,DraggableData) => {//ドラッグ操作（要素の移動のみ）に発火
        setCurrentX(prevState => prevState + DraggableData.deltaX)
        setCurrentY(prevState => prevState + DraggableData.deltaY)
    }

    const handleOnStop = () => {
        console.log('mouseup')

        let x = currentX
        let y = currentY

        if(x < 0) x = 0
        if(y < 0) y = 0
        if(x + currentWidth > mapWidth) x = mapWidth - currentWidth
        if(y + currentHeight > mapHeight) y = mapHeight - currentHeight
        dispatch(updateCard(cardId,
                            currentName,
                            detail,
                            Math.floor(x),
                            Math.floor(y),
                            Math.floor(currentWidth),
                            Math.floor(currentHeight),
                            ws
        ))
    }

    const handleOnMouseDown = () => {
        dispatch(selectCard(cardId))
    }

    const handleOnKeyDown =(e) => {
        if(e.keyCode === 13) e.target.blur()
    }

    const handleOnBlur = (e) => {
        dispatch(updateCard(
            cardId,
            e.target.value,
            detail,
            Math.floor(currentX),
            Math.floor(currentY),
            Math.floor(currentWidth),
            Math.floor(currentHeight),
            ws
        ))
    }

    const handleDeleteIcon = (e) => {
        e.stopPropagation()
        dispatch(deleteCard(cardId,ws))
    }

    return(
        <Draggable
            key={cardId}
            position={{
                x:currentX,
                y:currentY
            }}
            onDrag={handleOnDrag}
            onMouseDown={handleOnMouseDown}
            onStop={handleOnStop}
            //handle=".handleArea"
        >
            <Paper
                ref={cardRef}
                key={cardId}
                style={{
                    width:`${currentWidth}px`,
                    height:`${currentHeight}px`,
                }}
                className={(props.isSelected) ? classes.selectedCard : classes.card}
            >
                
                <div className={classes.mainArea} >
                    <InputText
                        fullWidth={true}
                        multiline={false}
                        required={true}
                        rows={1}
                        type={"text"}
                        shrink={true}
                        value={currentName}
                        autoFocus={true}
                        onBlur={(e) => handleOnBlur(e)}
                        onKeyDown={(e) => handleOnKeyDown(e)}
                        onChange={(e) => inputCurrentName(e)}
                    />
                    <p>{detail}</p>
                    x:{currentX}y:{currentY}
                </div>
                
                <div className={classes.iconWrapper}>
                <IconButton className={classes.iconButton} onClick={(e) => handleDeleteIcon(e)} >
                    <DeleteOutlineOutlinedIcon className={classes.icon} />
                </IconButton>
                </div>
                
            </Paper>
        </Draggable>

    )

    
}

export default DraggableCard


/*
<p>
                        name:{currentName}detail:{currentDetail}
                    </p>
                    <p>
                        x:{currentX}y:{currentY}
                    </p>
                    <p>
                    width:{currentWidth}
                    </p>
                    <p>
                    height:{currentHeight}
                    </p>
*/
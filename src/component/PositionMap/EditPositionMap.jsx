import React,{useState,useCallback,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import Paper from '@material-ui/core/Paper';
import {makeStyles} from '@material-ui/styles';
import {InputText,ErrorMessage} from '../UIKit/index'
import {updateCard} from '../../reducks/pMap/operations'
import {getSelectedCard,getSelectedCardId,getMapSize} from '../../reducks/pMap/selectors'


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
    },
    between:{
        display:'flex',
        justifyContent:'space-between'
    }
})

const EditPositionMap = () => {
    console.log('EditPositionMap再レンダリング')
    const classes = useStyles();
    const dispatch = useDispatch()
    const selector = useSelector(state => state)

    const mapSize = getMapSize(selector)
    const mapWidth = mapSize.width
    const mapHeight = mapSize.height

    const selectedCard = getSelectedCard(selector)//storeのcardsから選択中のカードのみを取得。
    const selectedCardId = getSelectedCardId(selector)//storeのselectedCardIdを取得。
    
    const [name,setName] = useState("")
    const [detail,setDetail] = useState("")
    const [x,setX] = useState(0)
    const [y,setY] = useState(0)
    const [width,setWidth] = useState(0)
    const [height,setHeight] = useState(0)

    const [xErr,setXErr] = useState(false)
    const [yErr,setYErr] = useState(false)
    const [widthErr,setWidthErr] = useState(false)
    const [heightErr,setHeightErr] = useState(false)

    const inputName = useCallback((e) => {
        setName(e.target.value)
    },[])
    const inputDetail = useCallback((e) => {
        setDetail(e.target.value)
    },[])
    const inputX = useCallback((e) => {
        setX(e.target.value)
    },[])
    const inputY = useCallback((e) => {
        setY(e.target.value)
    },[])
    const inputWidth = useCallback((e) => {
        setWidth(e.target.value)
    },[])
    const inputHeight = useCallback((e) => {
        setHeight(e.target.value)
    },[])

    let {propsName,propsDetail} = ""
    let {propsX,propsY,propsWidth,propsHeight} = 0
    if(selectedCardId !== ""){//選択中カードがある場合は代入
        propsName = selectedCard.name
        propsDetail = selectedCard.detail
        propsX = selectedCard.x
        propsY = selectedCard.y
        propsWidth = selectedCard.width
        propsHeight = selectedCard.height
    }

    useEffect(() => {
        setName(propsName)
        setDetail(propsDetail)
        setX(propsX)
        setY(propsY)
        setWidth(propsWidth)
        setHeight(propsHeight)
    },[propsName,propsDetail,propsX,propsY,propsWidth,propsHeight])
    
    const errorCheck = () => {
        return (!xErr && !yErr && !widthErr && !heightErr ) ? true : false
    }

    const handleBlurOfName = (e) => {
        const newName = e.target.value
        if(errorCheck()) dispatch(updateCard(selectedCardId,newName,detail,x,y,width,height))
    }
    const handleBlurOfDetail = (e) => {
        const newDetail = e.target.value;
        if(errorCheck()) dispatch(updateCard(selectedCardId,name,newDetail,x,y,width,height))
    }

    const handleBlurOfX = (e) => {
        let newX = e.target.value;
        if((!newX || newX === "") || isNaN(newX)){
            setXErr('数値を入力してください')
            return;
        }
        setXErr(false)
        newX = Number(newX)
        if(newX < 0) newX = 0
        if(newX + width > mapWidth) newX = mapWidth - width

        if(errorCheck() || (!yErr && !widthErr && !heightErr )) dispatch(updateCard(selectedCardId,name,detail,newX,y,width,height))
    }
    const handleBlurOfY = (e) => {
        let newY = e.target.value;
        if((!newY || newY === "") || isNaN(newY)){
            setYErr('数値を入力してください')
            return;
        }
        setYErr(false)
        newY = Number(newY)

        if(newY < 0) newY = 0
        if(newY + height > mapHeight) newY = mapHeight - height

        if(errorCheck() || (!xErr && !widthErr && !heightErr )) dispatch(updateCard(selectedCardId,name,detail,x,newY,width,height))
    }
    const handleBlurOfWidth = (e) => {
        let newWidth = e.target.value;
        if((!newWidth || newWidth === "") || isNaN(newWidth)){
            setWidthErr('数値を入力してください')
            return;
        }
        setWidthErr(false)
        newWidth = Number(newWidth)

        if(newWidth < 0) newWidth = 0
        if(x + newWidth > mapWidth) newWidth = mapWidth - x

        if(errorCheck() || (!xErr && !yErr && !heightErr )) dispatch(updateCard(selectedCardId,name,detail,x,y,newWidth,height))
    }
    const handleBlurOfHeight = (e) => {
        let newHeight = e.target.value;
        if((!newHeight || newHeight === "") || isNaN(newHeight)){
            setHeightErr('数値を入力してください')
            return;
        }
        setHeightErr(false)
        newHeight = Number(newHeight)
        console.log('newHeight',newHeight)
        if(newHeight < 0) newHeight = 0
        if(y + newHeight > mapHeight) newHeight = mapHeight - y
        console.log('afterNewHeight',newHeight)
        if(errorCheck() || (!xErr && !yErr && !widthErr )) dispatch(updateCard(selectedCardId,name,detail,x,y,width,newHeight))
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
                type={"number"}
                shrink={true}
                //defaultValue={name}
                value={name}
                onChange={(e) => inputName(e)}
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
                //defaultValue={detail}
                value={detail}
                onChange={(e) => inputDetail(e)}
                onBlur={(e) => handleBlurOfDetail(e)}
                onKeyDown={(e) => handleKeyDown(e)}
            />
            <div className="spacer--medium" />
            <div className={classes.between}>
                <div>
                    <InputText
                        fullWidth={true}
                        label={"x座標"}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"number"}
                        shrink={true}
                        variant={"outlined"}
                        //defaultValue={detail}
                        value={x}
                        onChange={(e) => inputX(e)}
                        onBlur={(e) => handleBlurOfX(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <ErrorMessage msg={xErr} />
                </div>
                <div>
                    <InputText
                        fullWidth={true}
                        label={"y座標"}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"number"}
                        shrink={true}
                        variant={"outlined"}
                        //defaultValue={detail}
                        value={y}
                        onChange={(e) => inputY(e)}
                        onBlur={(e) => handleBlurOfY(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <ErrorMessage msg={yErr} />
                </div>
            </div>
            <div className={classes.between}>
                <div>
                    <InputText
                        fullWidth={true}
                        label={"横幅"}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"number"}
                        shrink={true}
                        variant={"outlined"}
                        //defaultValue={detail}
                        value={width}
                        onChange={(e) => inputWidth(e)}
                        onBlur={(e) => handleBlurOfWidth(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <ErrorMessage msg={widthErr} />
                </div>
                <div>
                    <InputText
                        fullWidth={true}
                        label={"縦幅"}
                        multiline={true}
                        required={true}
                        rows={1}
                        type={"number"}
                        shrink={true}
                        variant={"outlined"}
                        //defaultValue={detail}
                        value={height}
                        onChange={(e) => inputHeight(e)}
                        onBlur={(e) => handleBlurOfHeight(e)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <ErrorMessage msg={heightErr} />
                </div>
            </div>

        </Paper>
    )
}

export default EditPositionMap;
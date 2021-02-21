import React,{useState,useEffect,useCallback} from 'react';
import {useDispatch} from 'react-redux'
import {useInteractJS} from '../../hooks/hooks'
import {updateCard,selectCard,deleteCard} from '../../reducks/pMap/operations'
import {InputText} from '../UIKit'
import {makeStyles} from '@material-ui/styles';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';

const useStyles = makeStyles({
    test:{
        fontSize:'0.5rem'
    },
    selected:{//選択中のカード
        border: 'solid 2px black'
    },
    card:{
        border: 'solid 1px gray',
    },
    cardContent:{
        padding:1
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

const PositionCard = (props) => {
    console.log('card再レンダリング')
    const classes = useStyles()
    
    const unsetRefCurrent = props.unsetRefCurrent
    const interact = useInteractJS(props.card,unsetRefCurrent);//props受け取ったcardの位置情報をinteract.jsのカスタムフックに渡す。
    const dispatch = useDispatch()
    //interact.jsにより作成された動く要素の情報をinteractのオブジェクトから取得
    //でもnameとdetailはpropsから取得。interactにはマウスで可変できる位置とサイズのみ管理してもらう。
    const cardId = props.id
    const x = interact.position.x
    const y = interact.position.y
    const width = interact.position.width
    const height = interact.position.height
    //InputTextのdefaultValueは初期リロードのみだからpropsから代入した変数を渡していても、EdiPositionMapでnameとdetailが変更された時、反映できない
    //nameとdetailはローカルstateで管理して、毎回描画後に変更されたpropsを反映させるようにする。(InputTextのvalueで表示)
    const n = props.card.name
    const d = props.card.detail
    const [name,setName] = useState("")
    const [detail,setDetail] = useState("")

    useEffect(() => {
        setName(n)
        setDetail(d)
    },[n,d])

    const inputName = useCallback((e) => {
        setName(e.target.value)
    },[])

    const handleMouseDown = () => {//要素をクリックではなく、押したタイミングでstoreのselectedCardIdを更新
        dispatch(selectCard(cardId))
    }

    const handleMouseUp = () => {//要素をドラッグして離した時に新しい座標またはサイズをstoreに更新
        dispatch(updateCard(cardId,name,detail,Math.floor(x),Math.floor(y),Math.floor(width),Math.floor(height)))
    }

    const handleBlurOfName = (e) => {
        const newName = e.target.value
        dispatch(updateCard(cardId,newName,detail,Math.floor(x),Math.floor(y),Math.floor(width),Math.floor(height)))
    }

    const handleKeyDown =(e) => {
        if(e.keyCode === 13) e.target.blur()
    }

    const handleDeleteIcon = (e) => {
        e.stopPropagation()
        //interact.disable()
        dispatch(deleteCard(cardId,interact.ref.current))
    }

    return(
        <Card
            key={cardId}
            ref={interact.ref}
            style={{
                ...interact.style,
                //border: '1px solid gray',
                backgroundColor: 'white',
            }}
            className={(props.isSelected) ? classes.selected : classes.card}
            onMouseUp={() => handleMouseUp()}
            onMouseDown={() => handleMouseDown()}
        >

            <div className={classes.iconWrapper}>
                <IconButton className={classes.iconButton} onClick={(e) => handleDeleteIcon(e)} >
                    <DeleteOutlineOutlinedIcon className={classes.icon} />
                </IconButton>
            </div>

            <InputText
                fullWidth={true}
                multiline={false}
                required={true}
                rows={1}
                type={"text"}
                shrink={true}
                value={name}
                autoFocus={true}
                onBlur={(e) => handleBlurOfName(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                id="name"
                onChange={(e) => inputName(e)}
            />
            <CardContent className={classes.cardContent}>
                <p>{detail}</p>
            </CardContent>
            <Divider />
            <p className={classes.test}>x:{x}y:{y}</p>
            <p className={classes.test}>width:{width}height:{height}</p>
    </Card>
    )
}

export default PositionCard
import React,{useState,useRef,useEffect} from 'react'
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    testcard:{
        backgroundColor:'yellow',
        position:'absolute',
    }
})

const VanillaDraggableCard = (props) => {
    
    const classes = useStyles()
    const cardRef = useRef(null)
    const [cardX,setCardX] = useState(props.card.x)
    const [cardY,setCardY] = useState(props.card.y)
    const [cardWidth,setCardWidth] = useState(props.card.width)
    const [cardHeight,setCardHeight] = useState(props.card.height)

    /** */

    useEffect(() => {
        return () => {
            document.removeEventListener("mousemove",handleMouseMove)
        }
    },[])


    const handleMouseDown = (e) => {
        console.log('mousedown')
        document.addEventListener("mousemove",handleMouseMove)
    }

    const handleDragStart = (e) => {
        return false
    }

    const handleMouseMove = (event) => {
        console.log('mousmove',event)

        const x = event.offsetX;
        const y = event.offsetY;
        console.log('xy',x,y)
        setCardX(x)
        setCardY(y)
        
    }

    const handleMouseUp = (event) => {
        document.removeEventListener("mousemove",handleMouseMove)
    }

    return(
        <>
            <Paper
                className={classes.testcard}
                ref={cardRef}
                onMouseDown={(e) => handleMouseDown(e)}
                onDragStart={(e) => handleDragStart(e)}
                onMouseUp={(e) => handleMouseUp(e)}
                style={{
                    transform:`translate3D(${cardX}px, ${cardY}px, 0)`,
                    width:`${cardWidth}px`,
                    height:`${cardHeight}px`,
                    }}
                key={props.id}
            >
                x:{cardX}y:{cardY}
            </Paper>
        </>
    )
}

export default VanillaDraggableCard

/*

 console.log('mousmove')
        const x = event.clientX;
        const y = event.clientY;
        console.log('clientY',event.clientY)
        console.log('offsetY',event.offsetY)
        const width = cardRef.current.offsetWidth;
        const height = cardRef.current.offsetHeight;
        cardRef.current.style.top = (y-height/2) + "px";
        cardRef.current.style.left = (x-width/2) + "px";
*/
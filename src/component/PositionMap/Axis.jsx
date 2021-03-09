import React from 'react'
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles({
    cross : {
        margin: '0 50px',
        position: 'relative',
        width: '30px', /* 縦棒の幅 */
        height: '120px', /* 縦棒の長さ */
        background: 'red', /* 縦棒の色 */

        "&:after":{
            content: "",
            position: 'absolute',
            top: '45px', /* 横棒のy位置 */
            left: '-45px', /* 横棒のX位置 */
            width: '120px', /* 横棒の長さ */
            height: '30px', /* 横棒の幅 */
            background: 'red' /* 横棒の色 */
        }
    }

})

const Axis = (props) => {
const classes = useStyles()

    return(
        <div id="axis">

        </div>
    )

}
export default Axis
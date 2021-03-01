import React from 'react'
import {useSelector} from 'react-redux'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/styles';
import {HeaderMenuArea} from './index'
import {getIsSignedIn} from '../../reducks/user/selectors'

const useStyles = makeStyles({
    tool:{
        display:'flex',
        justifyContent:'flex-end',
    }
})


const Header = () => {
    const classes = useStyles()
    const selector = useSelector(state => state)

    let IsSignedIn = getIsSignedIn(selector)
    IsSignedIn = true
        return (
            <AppBar>
                <Toolbar className={classes.tool}>
                    {IsSignedIn && (//サインインしていないなら各種ツールは全て使用不可にする
                        <HeaderMenuArea />
                    )}
                </Toolbar>
            </AppBar>
        )

}

export default Header
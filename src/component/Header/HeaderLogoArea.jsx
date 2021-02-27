import React from 'react';
import {makeStyles} from '@material-ui/styles';
import logo from '../../assets/logo/cueva_logo_text.webp';

const useStyles = makeStyles({
    logo: {
        height: '50px'
    },
    logoImg: {
        height: '110%'
    }
});

const HeaderLogoArea = () => {
    const classes = useStyles()
    return (
        <h1 className={classes.logo}>
            <img src={logo} alt="CUEVA" className={classes.logoImg}></img>
        </h1>
    )
}

export default HeaderLogoArea
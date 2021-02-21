import React,{useState,useEffect,useRef} from 'react';
import IconButton from "@material-ui/core/IconButton";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
    display: 'flex',
    },
    paper: {
    marginRight: '1rem',
    },
});

export const ToggleMenu = (props) =>  {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);
    const dialogMenus = props.dialogMenus
    
    const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false)
    };

    const openDialog = (event,i) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            console.log('return')
            return;
        }
        setOpen(false)
        dialogMenus[i].openFunc()
    }
    

    const handleListKeyDown = (event) => {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }
    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <div className={classes.root}>
            <div>
                <IconButton
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >

                    {props.icon}

                </IconButton>

            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                        >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    {dialogMenus.length > 0 && (
                                        dialogMenus.map((menu,i) => (
                                        <MenuItem onClick={(e) => openDialog(e,i)} key={i} >{menu.label}</MenuItem>
                                    )))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    </div>
    );
}

export default ToggleMenu
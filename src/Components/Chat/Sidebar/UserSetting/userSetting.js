import React from 'react'
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';

import useStyles from "./useStyles"
import cssClasses from "./userSetting.module.css"

function UserSetting(){
    const classes = useStyles();
    const userData=JSON.parse(localStorage.getItem('currentUser'))
    const u_avatar=userData.name.charAt(0)
    return(
        <div className={cssClasses.container}>
            <Box
                className={classes.box}
            >
            <Box p={1} justifyContent="flex-start" >
                <Avatar className={`${classes.purple} ${classes.large}`}>{u_avatar}</Avatar>
            </Box>
            <Box p={1} justifyContent="flex-end">
                <MenuIcon
                    fontSize="large" 
                />
            </Box>
            </Box>
            { /*<Avatar alt="Shilpa morrine" variant="round" className={classes.large} src={imga} />*/}
        </div>
    )
}
export default UserSetting;
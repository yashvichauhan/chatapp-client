import React from "react";
import {Alert, AlertTitle} from "@material-ui/lab";
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    alertBox: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


const AlertBox = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.alertBox}>
            {
                !props.message ? '' :
                    <Alert severity={props.type} variant={"outlined"}>
                        <AlertTitle><strong>{props.type.toUpperCase()}</strong></AlertTitle>
                        <strong> {props.message} </strong>
                    </Alert>
            }
        </div>
    )
}

export default AlertBox
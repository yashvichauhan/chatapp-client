import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 600,
        border: '4px solid black',
        maxHeight: 800
    },
    error : {
        width : 600,
        // border: '4px solid red',
        marginTop: theme.spacing(2),
        textAlign : "left"
    },
    form: {
        width: "inherit", // Fix IE 11 issue.
        paddingLeft: 70,
        paddingRight: 70,
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4)
    },
    submit: {
        width: 250,
        marginTop: theme.spacing(1),
        paddingLeft: 20,
    }
}));

export default useStyles
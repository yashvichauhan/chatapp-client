import {makeStyles} from "@material-ui/core/styles";
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    large:{
        width: "35px",
        height: "35px",
        alignItems:"center"
    },
    purple: {
        color: theme.palette.getContrastText(deepPurple[400]),
        backgroundColor: deepPurple[400],
    },
    box:{
        display:"flex",
        flexWrap:"nowrap",
        alignItems:"center",
        padding:theme.spacing(1),
        justifyContent: "space-between"
    },
    menuIcon:{
        alignSelf:"flex-end",
        flexDirection:"row"
    }
}));

export default useStyles
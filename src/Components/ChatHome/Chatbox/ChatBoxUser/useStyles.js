import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
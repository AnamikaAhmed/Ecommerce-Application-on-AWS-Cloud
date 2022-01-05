import { makeStyles } from '@mui/styles';



const useStyles = makeStyles((theme) => ({
    
    root: {
        '& .MuiTextField-root': {
            flexGrow: 1
        },
    },
    title: {
        display: 'flex',
        width:'100%',
        flexFlow: 'row',
      },

    Button:{
        padding: '50px',
        margin: '10px 0',
        float: "right",
        position: "relative",
    }

}));

export default useStyles;
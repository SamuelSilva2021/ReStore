import {AppBar, Switch, Toolbar, Typography} from '@mui/material';
import SwitchCustom from '../../components/SwitchCustom';


interface Props {
    darkMode:boolean
    alteraTema: () => void
}

export default function Header({darkMode, alteraTema}: Props){
    return(
        <AppBar position='static' sx={{mb: 4}}>
            <Toolbar>
                <Typography variant='h6'>
                    SA-STORE
                </Typography>
                <SwitchCustom checked={darkMode} onChange={alteraTema}/>
            </Toolbar>
        </AppBar>
    )
}
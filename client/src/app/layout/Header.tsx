import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { NavLink, Link } from "react-router-dom";
import SwitchCustom from "../components/SwitchCustom";
import { useStoreContext } from "../context/StoreContext";

interface Props {
  darkMode: boolean;
  alteraTema: () => void;
}

const linksNavegacao = [
  { title: "Catálogo", path: "/catalog" },
  { title: "Sobre", path: "/about" },
  { title: "Contato", path: "/contact" },
];

const linksUsuario = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
  color: "inherit",
  textDecoration: "none",
  borderRadius: 2,
  height: 39,

  "&:hover": {
    backgroundColor: "primary.dark",
    color:'white'
  },
  "&.active": {
    color: "white",
    backgroundColor: "primary.dark",
    fontWeight: "bold",
  },
  marginLeft: 1,
};


export default function Header({ darkMode, alteraTema }: Props) {
  const {cesta} = useStoreContext();
  const itemCount = cesta?.items.reduce((sum, item)=> sum + item.quantidade, 0);

  return (
    <AppBar position='static' sx={{mb:4}} color='default'>
      <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItens:"center"}}>
        <Box display='flex' alignItems='center' >
          <Button component={NavLink} exact to="/" sx={navStyles}>
            Incio
          </Button>
          {/* <SwitchCustom checked={darkMode} onChange={alteraTema} /> */}
        </Box>

        {/* Cria os links de nevegação das paginas da navBar */}
        <List sx={{ display: "flex" }}>
          {linksNavegacao.map(({ title, path }) => (
            <ListItemButton
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              <ListItemText
                primary={title.toUpperCase()}
                primaryTypographyProps={{
                  color: "text.secundary",
                  fontWeight: "bold",
                  variant: "body2",
                }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/cesta' sx={navStyles}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          {/* cria os links de navegação do usuário */}
          <List sx={{ display: "flex" }}>
            {linksUsuario.map(({ title, path }) => (
              <ListItemButton
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                <ListItemText
                  primary={title.toUpperCase()}
                  primaryTypographyProps={{
                    color: "text.secundary",
                    fontWeight: "bold",
                    variant: "body2",
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

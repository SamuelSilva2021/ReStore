import { Home, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import SwitchCustom from "../components/SwitchCustom";

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
  borderRadius: 5,
  height: 39,

  "&:hover": {
    backgroundColor: "primary.dark",
  },
  "&.active": {
    color: "info.dark",
    backgroundColor: "primary.light",
    fontWeight: "bold",
  },
  marginLeft: 1,
};

export default function Header({ darkMode, alteraTema }: Props) {
  return (
    <AppBar position="static" sx={{ mb: 6 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItens: "center",
        }}
      >
        <Box display='flex' alignItems='center' >
          <Button component={NavLink} exact to="/" sx={navStyles}>
            Incio
          </Button>
          <SwitchCustom checked={darkMode} onChange={alteraTema} />
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
          <IconButton sx={{ color: "inherit" }}>
            <Badge badgeContent={2} color="secondary">
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

import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import HomePage from "../../features/home/HomePage";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import CestaPage from "../../features/cesta/CestaPage";
import { getCookie } from "../utils/util";
import utils from "../api/utils";
import LoadingComponent from "./LoadingComponent";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppDispatch } from "../store/configureStore";
import { setCesta } from "../../features/cesta/cestaSlice";

function App() {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const compradorId = getCookie('compradorId');
    if(compradorId){
      utils.Cesta.get()
      .then(cesta => dispatch(setCesta(cesta)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
    }else{
      setLoading(false);
    }
  }, [dispatch])

  const [darkMode, setDarkMode] = useState(false);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === "light" ? "#eaeaea" : "#121212",
      },
    },
  });

  function alteraTema() {
    setDarkMode(!darkMode);
  }

  if(loading) return <LoadingComponent mensagem="Inicializando app..."/>

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer
        position="bottom-right"
        theme="colored"
        autoClose={4000}
      />
      <CssBaseline />
      <Header darkMode={darkMode} alteraTema={alteraTema}/>
      <Container fixed>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/catalog" component={Catalog} />
          <Route exact path="/catalog/:id" component={ProductDetails} />
          <Route exact path="/about" component={AboutPage} />
          <Route exact path="/contact" component={ContactPage} />
          <Route exact path="/server-error" component={ServerError} />
          <Route exact path="/cesta" component={CestaPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route component={NotFound} />
        </Switch>
      </Container>
    </ThemeProvider>
  );
}

export default App;

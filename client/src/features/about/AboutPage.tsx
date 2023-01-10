import {
  Alert,
  AlertTitle,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import utils from "../../app/api/utils";

export default function AboutPage() {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  function getValidationError() {
    utils.TestErros.getValidationError()
      .then(() => console.log("should not see this"))
      .catch((error) => setValidationErrors(error));
  }

  return (
    <Container>
      <Typography gutterBottom variant="h2">
        Erros para testes
      </Typography>
      <ButtonGroup fullWidth>
        <Button
          variant="contained"
          onClick={() =>
            utils.TestErros.get400Error().catch((error) => console.log(error))
          }
        >
          Teste 400
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            utils.TestErros.get401Error().catch((error) => console.log(error))
          }
        >
          Teste 401
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            utils.TestErros.get404Error().catch((error) => console.log(error))
          }
        >
          Teste 404
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            utils.TestErros.get500Error().catch((error) => console.log(error))
          }
        >
          Teste 500
        </Button>
        <Button variant="contained" onClick={getValidationError}>
          Teste getValidationError
        </Button>
      </ButtonGroup>
      {validationErrors.length > 0 &&
        <Alert severity="error">
          <AlertTitle>Erro de validação</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Alert>
      }
    </Container>
  );
}

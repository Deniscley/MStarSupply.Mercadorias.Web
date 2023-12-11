import { Alert } from "@mui/material";

function AlertError() {
  return (
    <Alert variant="filled" severity="error">
      Ouve um erro ao realizar a ação solicitada!
    </Alert>
  );
}

export default AlertError;

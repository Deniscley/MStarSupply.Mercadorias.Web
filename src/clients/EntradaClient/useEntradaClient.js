import { useCallback } from "react";
import axios from "axios";

const useEntradaClients = () => {
  const cadastrarEntrada = useCallback(
    (data) =>
      axios.post("https://localhost:44304/api/entrada/inserir-entrada", data),
    []
  );

  const retornarEntradas = useCallback(
    (id) =>
      axios
        .get("https://localhost:44304/api/entrada/obter-todas-entradas")
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  return useCallback(
    () => ({
      cadastrarEntrada,
      retornarEntradas,
    }),
    [cadastrarEntrada, retornarEntradas]
  );
};

export default useEntradaClients;

import { useCallback } from "react";
import axios from "axios";

const URI = "https://localhost:44304";

const useEntradaClients = () => {
  const cadastrarEntrada = useCallback(
    (data) => axios.post(`${URI}/api/entrada/inserir-entrada`, data),
    []
  );

  const retornarEntradas = useCallback(
    (id) =>
      axios
        .get(`${URI}/api/entrada/obter-todas-entradas`)
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

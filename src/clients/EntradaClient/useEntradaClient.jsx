import { useCallback } from "react";
import axios from "axios";

const URI = "https://localhost:44304";

const useEntradaClients = () => {
  const cadastrarEntrada = useCallback(
    (data) => axios.post(`${URI}/api/entrada/inserir-entrada`, data),
    []
  );

  const obterItensDaPagina = useCallback(
    (data) =>
      axios
        .get(`${URI}/api/entrada/obter-todas-entradas?pagina=${data}`)
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  return useCallback(
    () => ({
      cadastrarEntrada,
      obterItensDaPagina,
    }),
    [cadastrarEntrada, obterItensDaPagina]
  );
};

export default useEntradaClients;

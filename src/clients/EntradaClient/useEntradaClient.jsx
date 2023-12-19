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
        .get(`${URI}/api/entrada/obter-itens-pagina?pagina=${data}`)
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  const obterTodosItensDaPagina = useCallback(
    () =>
      axios
        .get(`${URI}/api/entrada/obter-todos-itens-pagina`)
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  return useCallback(
    () => ({
      cadastrarEntrada,
      obterItensDaPagina,
      obterTodosItensDaPagina,
    }),
    [cadastrarEntrada, obterItensDaPagina, obterTodosItensDaPagina]
  );
};

export default useEntradaClients;

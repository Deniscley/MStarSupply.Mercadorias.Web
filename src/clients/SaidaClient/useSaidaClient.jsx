import { useCallback } from "react";
import axios from "axios";

const URI = "https://localhost:44304";

const useSaidaClients = () => {
  const cadastrarSaida = useCallback(
    (data) => axios.post(`${URI}/api/saida/inserir-saida`, data),
    []
  );

  const obterItensDaPagina = useCallback(
    (data) =>
      axios
        .get(`${URI}/api/saida/obter-itens-pagina?pagina=${data}`)
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  const obterTodosItensDaPagina = useCallback(
    () =>
      axios
        .get(`${URI}/api/saida/obter-todos-itens-pagina`)
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  return useCallback(
    () => ({
      cadastrarSaida,
      obterItensDaPagina,
      obterTodosItensDaPagina,
    }),
    [cadastrarSaida, obterItensDaPagina, obterTodosItensDaPagina]
  );
};

export default useSaidaClients;

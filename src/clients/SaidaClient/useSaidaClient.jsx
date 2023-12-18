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
        .get(`${URI}/api/saida/obter-todas-saidas?pagina=${data}`)
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  return useCallback(
    () => ({
      cadastrarSaida,
      obterItensDaPagina,
    }),
    [cadastrarSaida, obterItensDaPagina]
  );
};

export default useSaidaClients;

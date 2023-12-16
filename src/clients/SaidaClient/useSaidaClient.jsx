import { useCallback } from "react";
import axios from "axios";

const URI = "https://localhost:44304";

const useSaidaClients = () => {
  const cadastrarSaida = useCallback(
    (data) => axios.post(`${URI}/api/saida/inserir-saida`, data),
    []
  );

  const retornarSaidas = useCallback(
    (id) =>
      axios
        .get(`${URI}/api/saida/obter-todas-saidas`)
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  return useCallback(
    () => ({
      cadastrarSaida,
      retornarSaidas,
    }),
    [cadastrarSaida, retornarSaidas]
  );
};

export default useSaidaClients;

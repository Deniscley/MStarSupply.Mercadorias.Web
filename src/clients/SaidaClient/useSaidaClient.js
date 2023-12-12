import { useCallback } from "react";
import axios from "axios";

const useSaidaClients = () => {
  const cadastrarSaida = useCallback(
    (data) =>
      axios.post("https://localhost:44304/api/saida/inserir-saida", data),
    []
  );

  const retornarSaidas = useCallback(
    (id) =>
      axios
        .get("https://localhost:44304/api/saida/obter-todas-saidas")
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

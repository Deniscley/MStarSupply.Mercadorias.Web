import { useCallback } from "react";
import axios from "axios";

const useMercadoriaClients = () => {
  const cadastrarMercadoria = useCallback(
    (data) =>
      axios.post(
        "https://localhost:44304/api/mercadoria/inserir-mercadoria",
        data
      ),
    []
  );

  const retornarMercadorias = useCallback(
    (id) =>
      axios
        .get("https://localhost:44304/api/mercadoria/obter-todas-mercadorias")
        .then((response) =>
          response?.data ? response : { data: { ...response } }
        ),
    []
  );

  return useCallback(
    () => ({
      cadastrarMercadoria,
      retornarMercadorias,
    }),
    [cadastrarMercadoria, retornarMercadorias]
  );
};

export default useMercadoriaClients;

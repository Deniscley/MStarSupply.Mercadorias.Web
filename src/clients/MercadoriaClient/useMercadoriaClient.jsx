import { useCallback } from "react";
import axios from "axios";

const URI = "https://localhost:44304";

const useMercadoriaClients = () => {
  const cadastrarMercadoria = useCallback(
    (data) => axios.post(`${URI}/api/mercadoria/inserir-mercadoria`, data),
    []
  );

  const retornarMercadorias = useCallback(
    (id) =>
      axios
        .get(`${URI}/api/mercadoria/obter-todas-mercadorias`)
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

import { useCallback } from "react";
import axios from "axios";

const useMercadoriaClients = () => {
  const cadastrarMercadoria = useCallback(
    (data) =>
      axios.put(`${process.env.URI}/api/mercadoria/inserir-mercadoria`, data),
    []
  );

  const cadastrarEntrada = useCallback(
    (data) =>
      axios.put(`${process.env.URI}/api/mercadoria/inserir-entrada`, data),
    []
  );

  return useCallback(
    () => ({
      cadastrarMercadoria,
      cadastrarEntrada,
    }),
    [cadastrarMercadoria, cadastrarEntrada]
  );
};

export default useMercadoriaClients;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useEntradaClientes from "../../../clients/EntradaClient/useEntradaClient";
import useSaidaClientes from "../../../clients/SaidaClient/useSaidaClient";
import { Chart } from "react-google-charts";
import useUtils from "../../../hooks/useUtils";
import { Grid, Box } from "@mui/material";

export const optionsEntradas = {
  title: "Gráfico de Entradas no Mês",
};

export const optionsSaidas = {
  title: "Gráfico de Saídas no Mês",
};

function Inicio() {
  const clientesEntrada = useEntradaClientes();
  const clientesSaida = useSaidaClientes();
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const { formatDateTime } = useUtils();
  const [entradaData, setEntradaData] = useState([]);
  const [saidaData, setSaidaData] = useState([]);

  const retornarDadosEntradaNoDisplay = (entradas) => {
    const data = entradas?.map((entrada) => [
      formatDateTime(entrada?.data),
      entrada?.quantidade,
    ]);
    data?.unshift(["Data", "Quantidade"]);
    setEntradaData(data);
  };

  const retornarDadosSaidaNoDisplay = (saidas) => {
    const data = saidas?.map((saida) => [
      formatDateTime(saida?.data),
      saida?.quantidade,
    ]);
    data?.unshift(["Data", "Quantidade"]);
    setSaidaData(data);
  };

  const buscarEntradas = () => {
    clientesEntrada()
      .obterTodosItensDaPagina()
      .then(
        (response) => {
          setEntradas(response?.data);
        },
        (error) => {
          console.error("Erro na requisição:", error);
        }
      );
  };

  const buscarSaidas = () => {
    clientesSaida()
      .obterTodosItensDaPagina()
      .then(
        (response) => {
          setSaidas(response?.data);
        },
        (error) => {
          console.error("Erro na requisição:", error);
        }
      );
  };

  useEffect(() => {
    const fetchData = async () => {
      await buscarEntradas();
      await buscarSaidas();
    };

    fetchData().catch((error) => error.message);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await retornarDadosEntradaNoDisplay(entradas);
      await retornarDadosSaidaNoDisplay(saidas);
    };

    fetchData().catch((error) => error.message);
  }, [entradas, saidas]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} mt={5} mb={1}>
          <h1>Gráfico de Visualização das Entradas</h1>
        </Grid>
        <Grid item xs={12} md={12} mb={1}>
          <Chart
            chartType="PieChart"
            data={entradaData}
            options={optionsEntradas}
            width={"100%"}
            height={"650px"}
          />
          <Box mt={1}>
            <h3>Quantidade Total: {entradas[0]?.quantidade_Total}</h3>
          </Box>
        </Grid>

        <Grid item xs={12} md={12} mt={5} mb={1}>
          <h1>Gráfico de Visualização das Saídas</h1>
        </Grid>
        <Grid item xs={12} md={12} mb={1}>
          <Chart
            chartType="PieChart"
            data={saidaData}
            options={optionsSaidas}
            width={"100%"}
            height={"650px"}
          />
          <Box mt={1}>
            <h3>Quantidade Total: {saidas[0]?.quantidade_Total}</h3>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Inicio;

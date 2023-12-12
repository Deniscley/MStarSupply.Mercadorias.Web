/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import useEntradaClientes from "../../../clients/EntradaClient/useEntradaClient";
import useSaidaClientes from "../../../clients/SaidaClient/useSaidaClient";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import useUtils from "../../../hooks/useUtils";

function Inicio() {
  const clientesEntrada = useEntradaClientes();
  const clientesSaida = useSaidaClientes();
  const { formatDateTime } = useUtils();
  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);

  const buscarEntradas = () => {
    clientesEntrada()
      .retornarEntradas()
      .then(
        (response) => {
          setEntradas(response.data);
        },
        () => {
          // AlertError();
        }
      );
  };

  const buscarSaidas = () => {
    clientesSaida()
      .retornarSaidas()
      .then(
        (response) => {
          setSaidas(response.data);
        },
        () => {
          // AlertError();
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

  return (
    <>
      <Grid item xs={12} md={12} mt={5} mb={2}>
        <h1>Entradas</h1>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Quantidade</TableCell>
              <TableCell style={{ textAlign: "center" }}>Data</TableCell>
              <TableCell style={{ textAlign: "center" }}>Local</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Número de Registro
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entradas.map((item) => (
              <TableRow key={item.id}>
                <TableCell style={{ textAlign: "center" }}>
                  {item.quantidade}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {formatDateTime(item.data)}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.local}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.numeroRegistro}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Grid item xs={12} md={12} mt={5} mb={2}>
        <h1>Saídas</h1>
      </Grid>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ textAlign: "center" }}>Quantidade</TableCell>
              <TableCell style={{ textAlign: "center" }}>Data</TableCell>
              <TableCell style={{ textAlign: "center" }}>Local</TableCell>
              <TableCell style={{ textAlign: "center" }}>
                Número de Registro
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {saidas.map((item) => (
              <TableRow key={item.id}>
                <TableCell style={{ textAlign: "center" }}>
                  {item.quantidade}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {formatDateTime(item.data)}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.local}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.numeroRegistro}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Inicio;

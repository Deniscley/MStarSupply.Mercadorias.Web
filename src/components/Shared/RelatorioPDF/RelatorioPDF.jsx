/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import useEntradaClientes from "../../../clients/EntradaClient/useEntradaClient";
import useSaidaClientes from "../../../clients/SaidaClient/useSaidaClient";
import useUtils from "../../../hooks/useUtils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Button,
  Grid,
} from "@mui/material";

const exportar = "Exportar para PDF";

const RelatorioPDF = () => {
  const clientesEntrada = useEntradaClientes();
  const clientesSaida = useSaidaClientes();
  const { formatDateTime } = useUtils();
  const pdfRefEntrada = useRef();
  const pdfRefSaida = useRef();

  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);

  const buscarEntradas = () => {
    clientesEntrada()
      .retornarEntradas()
      .then(
        (response) => {
          setEntradas(response?.data);
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
          setSaidas(response?.data);
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

  const gerarPDFEntrada = () => {
    const pdf = new jsPDF("p", "pt", "letter");
    const canvas = pdfRefEntrada.current;

    html2canvas(canvas).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(
        imgData,
        "PNG",
        40,
        40,
        canvas.width * 0.35,
        canvas.height * 0.35
      );
      pdf.save("relatorio_mensal.pdf");
    });
  };

  const gerarPDFSaida = () => {
    const pdf = new jsPDF("p", "pt", "letter");
    const canvas = pdfRefSaida.current;

    html2canvas(canvas).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(
        imgData,
        "PNG",
        40,
        40,
        canvas.width * 0.35,
        canvas.height * 0.35
      );
      pdf.save("relatorio_mensal.pdf");
    });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} mt={5} mb={2}>
          <h1>Exportar Relatório em PDF</h1>
        </Grid>

        <Grid item xs={12} md={12} mt={2} mb={2}>
          <h2>Relatório de Entrada</h2>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table ref={pdfRefEntrada}>
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
            {entradas?.map((item) => (
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
      <Box minWidth={170} m={1}>
        <Button
          variant="contained"
          color="primary"
          title="Adicionar"
          fullWidth
          onClick={gerarPDFEntrada}
        >
          {exportar}
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12} mt={4} mb={2}>
          <h2>Relatório de Saída</h2>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table ref={pdfRefSaida}>
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
            {saidas?.map((item) => (
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
      <Box minWidth={170} m={1}>
        <Button
          variant="contained"
          color="primary"
          title="Adicionar"
          fullWidth
          onClick={gerarPDFSaida}
        >
          {exportar}
        </Button>
      </Box>
    </>
  );
};

export default RelatorioPDF;

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
  Typography,
} from "@mui/material";
import Paginacao from "../Paginacao/Paginacao";
import styles from "./RelatorioPDF.module.css";

const exportar = "Exportar para PDF";
const noRecordsFound = "Nenhum registro encontrado.";

const RelatorioPDF = () => {
  const clientesEntrada = useEntradaClientes();
  const clientesSaida = useSaidaClientes();
  const { formatDateTime } = useUtils();
  const pdfRefEntrada = useRef();
  const pdfRefSaida = useRef();

  const [entradas, setEntradas] = useState([]);
  const [saidas, setSaidas] = useState([]);
  const [entradaPaginaAtual, setEntradaPaginaAtual] = useState(1);
  const [saidaPaginaAtual, setSaidaPaginaAtual] = useState(1);

  const buscarEntradas = (novaPagina) => {
    clientesEntrada()
      .obterItensDaPagina(novaPagina)
      .then(
        (response) => {
          setEntradas(response?.data);
        },
        (error) => {
          console.error("Erro na requisição:", error);
        }
      );
  };

  const buscarSaidas = (novaPagina) => {
    clientesSaida()
      .obterItensDaPagina(novaPagina)
      .then(
        (response) => {
          setSaidas(response?.data);
        },
        (error) => {
          console.error("Erro na requisição:", error);
        }
      );
  };

  const handlePaginacaoEntradaChange = (event, novaPagina) => {
    setEntradaPaginaAtual(novaPagina);
    buscarEntradas(novaPagina);
  };

  const handlePaginacaoSaidaChange = (event, novaPagina) => {
    setSaidaPaginaAtual(novaPagina);
    buscarSaidas(novaPagina);
  };

  useEffect(() => {
    const fetchData = async () => {
      await buscarEntradas(1);
      await buscarSaidas(1);
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
        canvas.width * 0.45,
        canvas.height * 0.45
      );
      pdf.save("relatorio_entrada.pdf");
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
        canvas.width * 0.45,
        canvas.height * 0.45
      );
      pdf.save("relatorio_saida.pdf");
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
        {entradas.length === 0 && (
          <Box mb={1} className={styles.recordTextFound}>
            <Typography variant="subtitle1" color="primary">
              <b>{noRecordsFound}</b>
            </Typography>
          </Box>
        )}

        <Box mt={1} mb={1} display="flex" justifyContent="center">
          <Paginacao
            paginaAtual={entradaPaginaAtual}
            totalPaginas={10}
            onChange={handlePaginacaoEntradaChange}
          />
        </Box>
      </TableContainer>

      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
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
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12} mt={6} mb={2}>
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
        {saidas.length === 0 && (
          <Box mb={1} className={styles.recordTextFound}>
            <Typography variant="subtitle1" color="primary">
              <b>{noRecordsFound}</b>
            </Typography>
          </Box>
        )}

        <Box mt={1} mb={1} display="flex" justifyContent="center">
          <Paginacao
            paginaAtual={saidaPaginaAtual}
            totalPaginas={10}
            onChange={handlePaginacaoSaidaChange}
          />
        </Box>
      </TableContainer>

      <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
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
      </Box>
    </>
  );
};

export default RelatorioPDF;

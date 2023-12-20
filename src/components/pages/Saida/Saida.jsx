/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./Saida.module.css";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Input,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSaidaClientes from "../../../clients/SaidaClient/useSaidaClient";
import useClientMercadoria from "../../../clients/MercadoriaClient/useMercadoriaClient";
import AlertSucess from "../../Shared/Alerts/AlertSucess/AlertSucess";

const quantidade = "Quantidade";
const dataHora = "Data e Hora";
const local = "Local";
const cadastrar = "Cadastrar";
const mercadoria = "Mercadoria";

const DEFAULT_OBJECT = {
  quantidade: "",
  data: "",
  local: "",
  MercadoriaId: "",
};

function Saida() {
  const clienteSaida = useSaidaClientes();
  const clienteMercadoria = useClientMercadoria();
  const [mercadorias, setMercadorias] = useState([]);
  const [mensagemRetornada, setMensagemRetornada] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const buscarMercadorias = () => {
    clienteMercadoria()
      .retornarMercadorias()
      .then(
        (response) => {
          setMercadorias(response?.data);
        },
        (error) => {
          console.error("Erro na requisição:", error);
        }
      );
  };

  useEffect(() => {
    const fetchData = async () => {
      await buscarMercadorias();
    };

    fetchData().catch((error) => error.message);
  }, []);

  const enviarSaida = (formData) => {
    clienteSaida()
      .cadastrarSaida(formData)
      .then(
        () => {
          setSucesso(true);
          setMensagemRetornada("Cadastro realizado com sucesso!");
        },
        (error) => {
          console.error("Erro na requisição:", error);
        }
      );
  };

  const formik = useFormik({
    initialValues: { ...DEFAULT_OBJECT },
    validationSchema: Yup.object({
      quantidade: Yup.number().required("O campo quantidade é obrigatório"),
      data: Yup.date().required("O campo data e hora é obrigatório"),
      local: Yup.string().required("O campo local é obrigatório"),
      MercadoriaId: Yup.string().required("O campo mercadoria é obrigatório"),
    }),
    onSubmit: (data, { resetForm }) => {
      const values = {
        ...data,
      };

      enviarSaida(values);
      resetForm({ values: "" });
    },
  });

  return (
    <section>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} mt={5}>
          <h1>Cadastro de Saída</h1>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2">{quantidade}</Typography>

          <FormControl fullWidth>
            <Box sx={{ paddingTop: "1rem" }}>
              <TextField
                id="quantidade"
                title="Quantidade"
                type="number"
                minRows={1}
                fullWidth
                color="primary"
                inputProps={{ maxLength: 15, min: 1 }}
                {...formik.getFieldProps("quantidade")}
                error={formik.touched.quantidade && !!formik.errors.quantidade}
              />
              <FormHelperText
                hidden={!formik.touched.quantidade || !formik.errors.quantidade}
                error={formik.touched.quantidade && !!formik.errors.quantidade}
              >
                {formik.errors.quantidade}
              </FormHelperText>
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2">{dataHora}</Typography>

          <FormControl fullWidth>
            <Box sx={{ paddingTop: "1rem" }}>
              <Input
                type="datetime-local"
                name="birthdatetime"
                fullWidth
                className={styles.inputData}
                {...formik.getFieldProps("data")}
                error={formik.touched.data && !!formik.errors.data}
              />
              <FormHelperText
                hidden={!formik.touched.data || !formik.errors.data}
                error={formik.touched.data && !!formik.errors.data}
              >
                {formik.errors.data}
              </FormHelperText>
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" mb={2}>
            {local}
          </Typography>

          <FormControl fullWidth>
            <TextField
              id="local"
              title="Local"
              minRows={1}
              fullWidth
              color="primary"
              inputProps={{ maxLength: 60, min: 1 }}
              {...formik.getFieldProps("local")}
              error={formik.touched.local && !!formik.errors.local}
            />
            <FormHelperText
              hidden={!formik.touched.local || !formik.errors.local}
              error={formik.touched.local && !!formik.errors.local}
            >
              {formik.errors.local}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box mr={1}>
            <Typography variant="body2">{mercadoria}</Typography>
          </Box>
          <FormControl fullWidth>
            <Box sx={{ paddingTop: "1rem" }}>
              <select
                id="MercadoriaId"
                title="Mercadoria"
                className={styles.inputSelect}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.meuCampoSelecao}
              >
                <option value="">Selecione...</option>
                {mercadorias?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.nome}
                  </option>
                ))}
              </select>
            </Box>
            <FormHelperText
              hidden={
                !formik.touched.MercadoriaId || !formik.errors.MercadoriaId
              }
              error={
                formik.touched.MercadoriaId && !!formik.errors.MercadoriaId
              }
            >
              {formik.errors.MercadoriaId}
            </FormHelperText>
          </FormControl>
        </Grid>
      </Grid>

      <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
        <Box minWidth={170} m={1}>
          <Button
            variant="contained"
            color="primary"
            title="Adicionar"
            fullWidth
            onClick={() => formik.submitForm()}
          >
            {cadastrar}
          </Button>
        </Box>
      </Box>

      <Box mt={1}>
        {sucesso && <AlertSucess mensagem={mensagemRetornada} />}
      </Box>
    </section>
  );
}

export default Saida;

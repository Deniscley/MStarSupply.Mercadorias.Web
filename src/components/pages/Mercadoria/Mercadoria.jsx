import React, { useState } from "react";
import {
  Grid,
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import useMercadoriaClients from "../../../clients/MercadoriaClient/useMercadoriaClient";
import AlertSucess from "../../Shared/Alerts/AlertSucess/AlertSucess";

const nome = "Nome";
const numero = "Número de Registro";
const fabricante = "Fabricante";
const tipo = "Tipo";
const descricao = "Descrição";
const cadastrar = "Cadastrar";

const DEFAULT_OBJECT = {
  nome: "",
  numeroRegistro: "",
  fabricante: "",
  tipo: "",
  descricao: "",
};

function Mercadoria() {
  const clientsMercadoria = useMercadoriaClients();
  const [mensagemRetornada, setMensagemRetornada] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const enviarMercadoria = (data) => {
    clientsMercadoria()
      .cadastrarMercadoria(data)
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
      nome: Yup.string().required("O campo nome é obrigatório"),
      numeroRegistro: Yup.number().required(
        "O campo número de registro é obrigatório"
      ),
      fabricante: Yup.string().required("O campo fabricante é obrigatório"),
      tipo: Yup.string().required("O campo tipo é obrigatório"),
      descricao: Yup.string().required("O campo descrição é obrigatório"),
    }),
    onSubmit: (data, { resetForm }) => {
      const values = {
        ...data,
      };

      enviarMercadoria(values);
      resetForm({ values: "" });
    },
  });

  return (
    <section>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} mt={5}>
          <h1>Cadastro de Mercadoria</h1>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" mb={2}>
            {nome}
          </Typography>

          <FormControl fullWidth>
            <TextField
              id="nome"
              title="Nome"
              minRows={1}
              fullWidth
              color="primary"
              inputProps={{ maxLength: 60, min: 1 }}
              {...formik.getFieldProps("nome")}
              error={formik.touched.nome && !!formik.errors.nome}
            />
            <FormHelperText
              hidden={!formik.touched.nome || !formik.errors.nome}
              error={formik.touched.nome && !!formik.errors.nome}
            >
              {formik.errors.nome}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2">{numero}</Typography>

          <FormControl fullWidth>
            <Box sx={{ paddingTop: "1rem" }}>
              <TextField
                id="numeroRegistro"
                title="Numero Registro"
                type="number"
                minRows={1}
                fullWidth
                color="primary"
                inputProps={{ maxLength: 15, min: 1 }}
                {...formik.getFieldProps("numeroRegistro")}
                error={
                  formik.touched.numeroRegistro &&
                  !!formik.errors.numeroRegistro
                }
              />
              <FormHelperText
                hidden={
                  !formik.touched.numeroRegistro ||
                  !formik.errors.numeroRegistro
                }
                error={
                  formik.touched.numeroRegistro &&
                  !!formik.errors.numeroRegistro
                }
              >
                {formik.errors.numeroRegistro}
              </FormHelperText>
            </Box>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" mb={2}>
            {fabricante}
          </Typography>

          <FormControl fullWidth>
            <TextField
              id="fabricante"
              title="Fabricante"
              minRows={1}
              fullWidth
              color="primary"
              inputProps={{ maxLength: 60, min: 1 }}
              {...formik.getFieldProps("fabricante")}
              error={formik.touched.fabricante && !!formik.errors.fabricante}
            />
            <FormHelperText
              hidden={!formik.touched.fabricante || !formik.errors.fabricante}
              error={formik.touched.fabricante && !!formik.errors.fabricante}
            >
              {formik.errors.fabricante}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" mb={2}>
            {tipo}
          </Typography>

          <FormControl fullWidth>
            <TextField
              id="tipo"
              title="tipo"
              minRows={1}
              fullWidth
              color="primary"
              inputProps={{ maxLength: 60, min: 1 }}
              {...formik.getFieldProps("tipo")}
              error={formik.touched.tipo && !!formik.errors.tipo}
            />
            <FormHelperText
              hidden={!formik.touched.tipo || !formik.errors.tipo}
              error={formik.touched.tipo && !!formik.errors.tipo}
            >
              {formik.errors.tipo}
            </FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="body2" mb={2}>
            {descricao}
          </Typography>

          <FormControl fullWidth>
            <TextField
              id="descricao"
              title="descricao"
              minRows={1}
              fullWidth
              color="primary"
              multiline
              inputProps={{ maxLength: 255, min: 1 }}
              {...formik.getFieldProps("descricao")}
              error={formik.touched.tipo && !!formik.errors.descricao}
            />
            <FormHelperText
              hidden={!formik.touched.descricao || !formik.errors.descricao}
              error={formik.touched.descricao && !!formik.errors.descricao}
            >
              {formik.errors.descricao}
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

export default Mercadoria;

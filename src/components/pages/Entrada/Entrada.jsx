import React from "react";
import styles from "./Entrada.module.css";
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
import useMercadoriaClients from "../../../clients/MercadoriaClient/useMercadoriaClient";
import AlertError from "../../Shared/Alerts/AlertError/AlertError";
import AlertSucess from "../../Shared/Alerts/AlertSucess/AlertSucess";
// import DropdownSelectOne from "../../Shared/DropdownSelectOne/DropdownSelectOne";

const quantidade = "Quantidade";
const dataHora = "Data e Hora";
const local = "Local";
const cadastrar = "Cadastrar";
const mercadoria = "Mercadoria";

const DEFAULT_OBJECT = {
  quantidade: "",
  dataHora: "",
};

export const mercadorias = {
  data: [
    {
      nome: "Mercadoria 3",
      IdMercadoria: "4fd192da-5f74-494e-8e17-f2f73c21ba1b",
    },
    {
      nome: "Mercadoria 4",
      IdMercadoria: "481503b5-f581-4523-b388-1fc5a83cc57b",
    },
    {
      nome: "Mercadoria 5",
      IdMercadoria: "2c30cfc9-c3b4-4eca-8c0a-790042ed91d2",
    },
  ],
};

function Entrada() {
  const clientsEntrada = useMercadoriaClients();
  // const [valueType, setValueType] = useState("");

  const enviarEntrada = (data) => {
    clientsEntrada()
      .cadastrarMercadoria(data)
      .then(
        () => {
          AlertSucess();
        },
        () => {
          AlertError();
        }
      );
  };

  const formik = useFormik({
    initialValues: { ...DEFAULT_OBJECT },
    validationSchema: Yup.object({
      quantidade: Yup.number().required(),
      dataHora: Yup.date().required(),
      local: Yup.string().required(),
      IdMercadoria: Yup.string().required(),
    }),
    onSubmit: (data, { resetForm }) => {
      const values = {
        ...data,
      };

      enviarEntrada(values);
      resetForm({ values: "" });
    },
  });

  const submeterEntrada = () => {
    formik.submitForm();
  };

  return (
    <>
      <Box className={styles.container} ml={3} mr={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={12} mt={5}>
            <h1>Cadastro de Entrada</h1>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
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
                    {...formik.getFieldProps("numero")}
                    error={
                      formik.touched.quantidade && !!formik.errors.quantidade
                    }
                  />
                  <FormHelperText
                    hidden={
                      !formik.touched.quantidade || !formik.errors.quantidade
                    }
                    error={
                      formik.touched.quantidade && !!formik.errors.quantidade
                    }
                  >
                    {formik.errors.quantidade}
                  </FormHelperText>
                </Box>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
              <Typography variant="body2">{dataHora}</Typography>

              <FormControl fullWidth>
                <Box sx={{ paddingTop: "1rem" }}>
                  <Input
                    type="datetime-local"
                    name="birthdatetime"
                    fullWidth
                    className={styles.inputData}
                    {...formik.getFieldProps("dataHora")}
                    error={formik.touched.dataHora && !!formik.errors.dataHora}
                  />
                  <FormHelperText
                    hidden={!formik.touched.dataHora || !formik.errors.dataHora}
                    error={formik.touched.dataHora && !!formik.errors.dataHora}
                  >
                    {formik.errors.dataHora}
                  </FormHelperText>
                </Box>
              </FormControl>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box>
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
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ paddingLeft: "2rem" }}>
              <Box mr={1}>
                <Typography
                  variant="body2"
                  color="primary"
                  // className={classes.label}
                >
                  {mercadoria}
                </Typography>
              </Box>
              <FormControl fullWidth>
                {/* <DropdownSelectOne
                  id="idMercadoria"
                  title="Mercadoria"
                  options={mercadorias.data}
                  {...formik.getFieldProps("idMercadoria")}
                  // onClick={(e) => {
                  //   const { value } = e.target;
                  //   setValueType(value);
                  // }}
                  error={
                    formik.touched.idMercadoria && !!formik.errors.idMercadoria
                  }
                  helpertext={
                    formik.touched.idMercadoria && formik.errors.idMercadoria
                  }
                /> */}
                <select {...formik.getFieldProps("idMercadoria")}>
                  <option value="">Selecione...</option>
                  {mercadorias.data.map((option) => (
                    <option
                      key={option.IdMercadoria}
                      value={option.IdMercadoria}
                    >
                      {option.nome}
                    </option>
                  ))}
                </select>
              </FormControl>
            </Box>
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="center" alignItems="center" mt={10}>
          <Box minWidth={170} m={1}>
            <Button
              variant="contained"
              color="primary"
              title="Adicionar"
              fullWidth
              onClick={submeterEntrada}
            >
              {cadastrar}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Entrada;
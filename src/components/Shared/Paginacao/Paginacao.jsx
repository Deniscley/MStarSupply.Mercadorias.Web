import React from "react";
import { Pagination } from "@mui/material";

function Paginacao({ paginaAtual, totalPaginas, onChange }) {
  return (
    <Pagination count={totalPaginas} page={paginaAtual} onChange={onChange} />
  );
}

export default Paginacao;

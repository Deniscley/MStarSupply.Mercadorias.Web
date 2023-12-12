import { useCallback } from "react";

import moment from "moment";
/* Init Moment. */
import "moment/locale/pt-br";

moment.locale("pt-br");

const useUtils = () => {
  const formatDateTime = useCallback(
    (value) => value && moment(value).format("DD/MM/YYYY HH:mm:ss"),
    []
  );

  return {
    formatDateTime,
  };
};

export default useUtils;

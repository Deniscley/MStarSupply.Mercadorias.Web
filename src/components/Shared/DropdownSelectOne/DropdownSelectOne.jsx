import React from "react";
import PropTypes from "prop-types";
import { isObject } from "lodash";
import { Select, FormHelperText, MenuItem } from "@mui/material";

const DropdownSelectOne = (props) => {
  const { id, options, color, error, helpertext } = props;

  return (
    <>
      <Select {...props} htmlFor={id} color={color} error={error}>
        {options.map((option, index) => (
          <MenuItem
            key={index}
            value={!isObject(option) ? option : option?.value ?? option?.text}
          >
            {!isObject(option) ? option : option.text}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText hidden={!error} error={error}>
        {helpertext}
      </FormHelperText>
    </>
  );
};

DropdownSelectOne.propTypes = {
  color: PropTypes.oneOf(["primary", "secondary"]),
  error: PropTypes.bool,
  options: PropTypes.array,
  helpertext: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

DropdownSelectOne.defaultProps = {
  color: "secondary",
  error: false,
  options: [""],
  helpertext: "",
  label: "",
  name: undefined,
  onChange: () => {},
};

export default DropdownSelectOne;

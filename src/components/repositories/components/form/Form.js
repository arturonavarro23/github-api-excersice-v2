import React, { useState } from "react";
import {
  Form as BootstrapForm,
  FormGroup,
  FormControl,
  Button
} from "react-bootstrap";
import "./Form.scss";

const Form = props => {
  const { id, onSubmit, inputValue } = props;
  const [textValue, setText] = useState(inputValue);
  const onInputChange = e => setText(e.target.value);
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (textValue) {
      onSubmit(textValue);
    }
  }

  return (
    <BootstrapForm inline id={id} className="search-form" onSubmit={onSubmitForm}>
      <FormGroup>
        <FormControl
          name="search"
          type="text"
          onChange={onInputChange}
          placeholder="e.g. react"
          value={textValue}
          autoComplete="off"
        />
      </FormGroup>
      <Button type="submit">Search</Button>
    </BootstrapForm>
  );
};

export default Form;

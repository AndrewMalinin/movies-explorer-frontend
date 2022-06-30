import React from "react";

export function useFormWithValidation(initialValues) {
  const [values, setValues] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const resetForm = React.useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export function useMessagePopup() {

  const [isOpen, setOpenState] = React.useState(false);
  const [message, setMessage] = React.useState('Произошла неизвестная ошибка');
  const [type, setType] = React.useState('error');

  const closeMessagePopup = () => {
    setOpenState(false);
  }

  const popupControlObject = React.useMemo(()=>{return {isOpen, message, type, onClose:closeMessagePopup}}, [isOpen, message, type]);

  const openMessagePopup = (type, message) => {
    setOpenState(true);
    setType(type);
    setMessage(message);
  }

  return {popupControlObject, openMessagePopup, closeMessagePopup}
}

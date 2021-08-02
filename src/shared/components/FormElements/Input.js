import React, { useReducer, useEffect } from 'react';

import { validate } from '../../util/validators';

import './Input.css';

const inputReducer = (curState, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...curState,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };

    case 'TOUCH':
      return {
        ...curState,
        isTouched: true,
      };
    default:
      return curState;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialvalue || '',
    isValid: props.initialValidity || false,
    isTouched: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [onInput, id, value, isValid]);

  const changeHandler = e => {
    dispatch({
      type: 'CHANGE',
      val: e.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => dispatch({ type: 'TOUCH' });

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        props={props.row || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && 'form-control--invalid'
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;

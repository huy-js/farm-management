import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let InputElement = null;
  const InputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    InputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case "input":
      InputElement = (
        <div>
          <label> {props.elementConfig.placeholder}</label>
          <input
            className={InputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
          />
        </div>
      );
      break;
    case "textarea":
      InputElement = (
        <textarea
          className={InputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "select":
      InputElement = (
        <select
          className={InputClasses.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      InputElement = (
        <input
          className={InputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  console.log(InputClasses);

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {InputElement}
    </div>
  );
};

export default input;

import React from "react";
import classes from "./MyInput.module.css";
// Неуправляемый/неконтролируемый компонент

// const MyInput = React.forwardRef((props, ref) => {
//   return <input ref={ref} className={classes.myInput} {...props} />;
// });
const MyInput = (props) => {
  return <input className={classes.myInput} {...props} />;
};
export default MyInput;

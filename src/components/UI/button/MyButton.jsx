import React from "react";
import classes from "./MyButton.module.css";

const MyButton = ({ children, ...props }) => {
  return (
    <button {...props} className={classes.myBtn}>
      {children}
    </button>
  );
  //мы получаем стиль как свойство объекта???
  //React не зает в какое место элемента нужно добавлять вложеные компоненты
  //для этого предназначен специальный props - children
};

export default MyButton;

import React from "react";
import "./primaryBtn.css";
export default function PrimaryBtn({
  btnText,
  btnClassName,
  customizeBtnClass,
  onClick,
  id
}) {
  return (
    <>
      <div
        className={
          customizeBtnClass
            ? `${customizeBtnClass}+primary-btn-Container `
            : "primary-btn-Container"
        }
      >
        <button className="primaryBtn" onClick={onClick} id={id}>{btnText}  </button>
      </div>
    </>
  );
}

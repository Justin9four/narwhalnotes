const Spacer = ({width, height, backgroundColor}) => (
  <div
    style={{
      width: width ? width : "0px",
      height: height ? height : "0px",
      backgroundColor: backgroundColor ? backgroundColor : "none",
      display: "inline-block"
    }}
  ></div>
);

export default Spacer;

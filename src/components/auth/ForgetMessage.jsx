import React from "react";

const ForgetMessage = () => {
  const myStyle1 = {
    position: "fixed",
    top: "70px",
    left: "0",
    right: "0",
    overflow: "hidden",
    height: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };
  const myStyle2 = {
    position: "relative",
    width: "400px",
    height: "350px",
    // background: "black",
    display: "flex",
    color:"black",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    borderRadius:"10px",
    marginLeft:"20px",
    marginRight:"20px",
    // border:"2px solid red",
    boxShadow:
    "rgba(50, 50, 93, 0.25) 5px 23px 20px 10px " 
    
  };

  return (
    <div style={myStyle1}>
      <div style={myStyle2}>
        <p style={{ fontSize: "18px",padding:"0 20px",lineHeight:"33px" }}>
          your reset password link has been sent to your email,check your inbox
          to reset password.
          
        </p>
      </div>
    </div>
  );
};

export default ForgetMessage;

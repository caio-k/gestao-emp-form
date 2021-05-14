import React from "react";
import styled from "styled-components";

const FooterSession = styled("footer")`
  text-align: center;
  background-color: #000000;
  color: #FFFFFF;
  margin-top: 30px;
  height: 100px;
  line-height: 100px;
`;

function Footer() {
  const actualYear = new Date().getFullYear();

  return (
    <FooterSession>
      <p>Copyright &copy; {actualYear}, SMART</p>
    </FooterSession>
  )
}

export default Footer;

import React from "react";
import {useLocation} from "react-router-dom";
import styled from "styled-components";

import MenuItems from "./MenuItems";
import menuIcon from "../../assets/menuIcon.svg";
import closeIcon from "../../assets/closeIcon.svg";

const Container = styled("header")`	
  height: 100px;
  padding: 0 40px;
  background-color: ${(props) => props.theme.colors.black};
  box-shadow: 0 2px 4px rgba(0, 0, 0, .1);
  
  span {
    font-size: 1.8em;
    font-weight: bold;
    line-height: 100px;
  }
  
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.white};
  }
  
  button {
    color: ${(props) => props.theme.colors.black};
    line-height: 30px;
    padding: 0 10px;
    max-width: 250px;
    background-color: ${(props) => props.theme.colors.white};
    border: none;
    border-radius: 5px;
    transition: all 0.3s ease 0s;
    font-size: 1.05em;
    font-family: ${(props) => props.theme.fonts.family.montserrat};
    transform: translateY(-10px);
    
    span {
      font-size: 17px;
    }
    
    p {
      padding-bottom: 2px;
    }
    
    span, p {
      line-height: 20px;
    }
  }
  
  .show-menu-btn, .hide-menu-btn {
    transition: 0.4s;
    font-size: 30px;
    cursor: pointer;
    display: none;
  }
  
  .show-menu-btn {
    float: right;
    margin-top: 35px;
    margin-right: 10px;
    letter-spacing: 5px;
    font-size: 30px;
  }
  
  #chk {
    position: absolute;
    visibility: hidden;
    z-index: -1111;
  }
  
  .current-user-link {
    pointer-events: none;
    cursor: default;
  }
  
  @media (max-width: 600px) {
    button {
      background-color: ${(props) => props.theme.colors.white};
      color: ${(props) => props.theme.colors.black};
      font-size: 1.2em;
      padding: 10px 30px;
      
      p {
        font-size: 13px;
      }
    }
    
    .show-menu-btn, .hide-menu-btn {
      display: block;
    }
    
    .hide-menu-btn {
      position: absolute;
      top: 30px;
      right: 30px;
    }

    #chk:checked ~ ul {
      right: 0;
      top: 0;
    }
  }
  
  @media (max-width: 420px) {
    span {
      font-size: 1.4em;
    }
  }
`;

const Menu = styled("ul")`
  float: right;
  line-height: 100px;
  margin: 0;
  
  a {
    color: ${(props) => props.theme.colors.white};
    text-transform: uppercase;
    padding: 5px 10px;
    margin: 0 5px;
    font-weight: 600;
    border-radius: 5px;
    
    &:hover {
      color: ${(props) => props.theme.colors.black};
      background-color: ${(props) => props.theme.colors.white};
    }
  }
  
  .spotlight {
    background-color: gray;
  }
  
  @media (max-width: 600px) {
    position: fixed;
    width: 100%;
    height: fit-content;
    background-color: ${(props) => props.theme.colors.black};
    right: 0;
    top: -100%;
    text-align: center;
    padding: 60px 0 15px;
    line-height: normal;
    transition: 0.5s;
    z-index: 100;
    
    a {
      display: block;
      padding: 10px;
      color: ${(props) => props.theme.colors.white};
      margin: 10px 50px;
      font-size: 15px;
    }
  }
`;

function Header(props) {
  const {pathname} = useLocation();

  const menuItemSelected = pathname.split("/")[1];

  return (
    <Container>
      <a href="/"><span>SMART</span></a>

      <input type="checkbox" id="chk"/>

      <label htmlFor="chk" className="show-menu-btn">
        <img src={menuIcon} alt='...' width="30px" height="30px"/>
      </label>

      <Menu>
        {MenuItems.map(item => {
          const isUnderlined = item.title.toLowerCase() === menuItemSelected;
          return <a href={item.url} key={item.title} className={isUnderlined ? "spotlight" : ""}>{item.title}</a>
        })}

        <a href="/" className="current-user-link">
          <button>
            <i className="fas fa-user-circle"/>
            <span> Usuário Mock</span>
            <p>Gerente de Sistemas de TI</p>
          </button>
        </a>

        <label htmlFor="chk" className="hide-menu-btn">
          <img src={closeIcon} alt='X' width="25px" height="25px"/>
        </label>
      </Menu>
    </Container>
  );
}

export default Header;

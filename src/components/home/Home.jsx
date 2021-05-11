import React from "react";
import {useHistory} from "react-router-dom";
import styled from "styled-components";

import Header from "../header/Header";

const Container = styled("div")`
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: ${(props) => props.theme.colors.black};
	font-size: 1.6rem;
`;

const Phrase = styled("p")`
	width: fit-content;
	max-width: 70vw;
	text-align: center;
	margin-top: 250px;
	font-style: italic;
	font-weight: 650;
	font-size: 3rem;
	justify-self: center;
	
	@media (max-width: 1000px) {
		margin-top: 100px;
		font-size: 1.5em;
	}
`;

const Author = styled("p")`
	font-size: 2rem;
`;

const Button = styled("button")`
	margin: 40px;
	padding: 15px 30px;
	position: relative;
	cursor: pointer;
	font-family: "Montserrat", serif;
	font-size: 1.6rem;

	border-radius: 30px;
	border: none;
	color: ${(props) => props.theme.colors.white};
	background: ${(props) => props.theme.colors.black};

	transition: transform 0.3s ease;

	&::after,
	&::before {
		content: "";
		position: absolute;
		opacity: 0.3;
		background: ${(props) => props.theme.colors.black};
		border-radius: inherit;
		width: 100%;
		height: 100%;
		left: 0;
		bottom: 0;
		z-index: -1;
		transition: transform 0.3s ease;
	}

	&:hover {
		transform: translate(-12px, -12px);
	}

	&:hover::after {
		transform: translate(6px, 6px);
	}

	&:hover::before {
		transform: translate(12px, 12px);
	}
`;

function HomeContent(props) {
  const history = useHistory();

  function onClickHandler() {
    history.push("/feedback");
  }

  return (
    <>
      <Header/>
      <Container>
        <Phrase>
          “We all need people who will give us feedback. That's how we improve.”
        </Phrase>
        <Author>Bill Gates</Author>
        <Button onClick={() => onClickHandler()}>Dar meu feedback -&gt;</Button>
      </Container>
    </>
  );
}

export default HomeContent;

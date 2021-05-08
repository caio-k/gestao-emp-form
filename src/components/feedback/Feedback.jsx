import React from "react";
import styled from "styled-components";

import Header from "../header/Header";

const Container = styled("div")`
	padding: 50px;
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 1.8rem;
	color: ${(props) => props.theme.colors.black};
`;

function FeedbackContent(props) {
	return (
		<>
			<Header />
			<Container></Container>
		</>
	);
}

export default FeedbackContent;

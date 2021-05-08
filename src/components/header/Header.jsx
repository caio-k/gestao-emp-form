import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled("nav")`
	width: 100%;
	height: 70px;
	padding: 5px;
	background-color: ${(props) => props.theme.colors.black};
	display: flex;
	justify-content: center;
	align-items: center;
	position: sticky;
`;

const Logo = styled("h1")`
	cursor: pointer;
	justify-self: start;
	color: ${(props) => props.theme.colors.gray400};
	font-size: 30px;
`;

const Menu = styled("ul")`
	margin: 12px 15px;
	display: grid;
	grid-template-columns: repeat(2, auto);
	grid-gap: 40px;
	text-align: center;
	width: 70vw;
	justify-content: center;
	margin-right: 2rem;
	list-style-type: none;
`;

const MenuItem = styled("li")`
	color: ${(props) =>
		props.active ? props.theme.colors.white : props.theme.colors.gray400};
	font-weight: ${(props) => (props.active ? 700 : 400)};
	font-size: 20px;
	text-decoration: none;
	cursor: pointer;

	&:hover {
		color: ${(props) => props.theme.colors.white};
	}
`;

const UserArea = styled("div")`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	justify-self: end;
	align-items: center;
	cursor: pointer;
	color: ${(props) => props.theme.colors.white};

	i {
		font-size: 1.6rem;
		margin: 8px;
	}

	.user-info {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;

		.name {
			font-size: 15px;
		}

		.job {
			font-size: 12px;
		}
	}
`;

function Header(props) {
	const { pathname } = useLocation();

	const menuItemSelected = pathname.split("/")[1];

	return (
		<Container>
			<Logo>SMART</Logo>
			<Menu>
				<MenuItem active={menuItemSelected === "home" ? true : false}>
					Home
				</MenuItem>
				<MenuItem active={menuItemSelected === "feedback" ? true : false}>
					Feedback
				</MenuItem>
			</Menu>
			<UserArea>
				<i className="fas fa-user-circle"></i>
				<div className="user-info">
					<p className="name">Usuário Mock</p>
					<p className="job">Gerente de Sistemas de TI</p>
				</div>
			</UserArea>
		</Container>
	);
}

export default Header;

import React, { useState } from "react";
import {
	Box,
	Card,
	CardContent,
	FormLabel,
	Radio,
	RadioGroup,
} from "@material-ui/core";
import { Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import styled from "styled-components";

import Header from "../header/Header";
import FormStepper from "./FormStepper";
import FormStep from "./FormStep";
import RadioOptions from "./RadioOptions";

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

	.card {
		width: 90%;
	}

	.box-step2 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.label {
		margin: 12px;
	}

	.options {
		display: flex;
		flex-direction: row;
	}

	.error-msg {
		font-size: 0.8rem;
		color: red;
	}
`;

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

function FeedbackContent(props) {
	function todaysDate() {
		const today = new Date();
		const day = `${
			today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
		}`;
		const month = `${
			today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth()
		}`;
		const year = today.getFullYear();

		const dateString = `${year}-${month}-${day}`;

		return dateString;
	}

	return (
		<>
			<Header />
			<Container>
				<Card className="card">
					<CardContent>
						<FormStepper
							initialValues={{
								myName: "Usuário Mock",
								employeeName: "",
								date: todaysDate(),
								efficiency: "",
								eficacia: "",
								description: "",
							}}
							onSubmit={async (values) => {
								await sleep(3000);
								console.log("values", values);
							}}
						>
							<FormStep
								label="Informações Gerais"
								validationSchema={yup.object({
									myName: yup
										.string()
										.required("É necessário informar o nome do avaliador."),
									employeeName: yup
										.string()
										.required(
											"É necessário informar o nome de quem está sendo avaliado."
										),
									date: yup.date().required("É necessário informar uma data."),
								})}
							>
								<Box paddingBottom={2}>
									<Field
										fullWidth
										name="myName"
										component={TextField}
										label="Nome do avaliador"
										InputLabelProps={{
											required: true,
										}}
									/>
								</Box>
								<Box paddingBottom={2}>
									<Field
										fullWidth
										name="employeeName"
										component={TextField}
										label="Nome do avaliado"
										InputLabelProps={{
											required: true,
										}}
									/>
								</Box>
								<Box paddingBottom={2}>
									<Field
										name="date"
										type="date"
										component={TextField}
										label="Data"
										InputLabelProps={{
											shrink: true,
											required: true,
										}}
									/>
								</Box>
							</FormStep>
							<FormStep
								label="Pilar de Desempenho"
								validationSchema={yup.object().shape({
									efficiency: yup
										.string()
										.required("É necessário escolher uma das opções."),
									eficacia: yup
										.string()
										.required("É necessário escolher uma das opções."),
								})}
							>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="efficiency" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador realizou entregas com qualidade e cumprindo as
										metas estabelecidas?
									</FormLabel>
									<div className="options">
										<RadioGroup row name="efficiency">
											<RadioOptions
												name="efficiency"
												type="radio"
												value="Não Aderente"
												label="Não Aderente"
											/>
											<RadioOptions
												name="efficiency"
												type="radio"
												value="Parcialmente Aderente"
												label="Parcialmente Aderente"
											/>
											<RadioOptions
												name="efficiency"
												type="radio"
												value="Aderente"
												label="Aderente"
											/>
											<RadioOptions
												name="efficiency"
												type="radio"
												value="Modelo/Referência"
												label="Modelo/Referência"
											/>
										</RadioGroup>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="eficacia" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador realizou entregas dentro do prazo e orçamento?
									</FormLabel>
									<div className="options">
										<RadioGroup row name="eficacia">
											<RadioOptions
												name="eficacia"
												type="radio"
												value="Não Aderente"
												label="Não Aderente"
											/>
											<RadioOptions
												name="eficacia"
												type="radio"
												value="Parcialmente Aderente"
												label="Parcialmente Aderente"
											/>
											<RadioOptions
												name="eficacia"
												type="radio"
												value="Aderente"
												label="Aderente"
											/>
											<RadioOptions
												name="eficacia"
												type="radio"
												value="Modelo/Referência"
												label="Modelo/Referência"
											/>
										</RadioGroup>
									</div>
								</Box>
							</FormStep>
							{/* <FormStep
								label="Bank Accounts"
								validationSchema={object({
									money: mixed().when("millionaire", {
										is: true,
										then: number()
											.required()
											.min(
												1_000_000,
												"Because you said you are a millionaire you need to have 1 million"
											),
										otherwise: number().required(),
									}),
								})}
							>
								<Box paddingBottom={2}>
									<Field
										fullWidth
										name="money"
										type="number"
										component={TextField}
										label="All the money I have"
									/>
								</Box>
							</FormStep> */}
							<FormStep label="More Info">
								<Box paddingBottom={2}>
									<Field
										fullWidth
										name="description"
										component={TextField}
										label="Description"
									/>
								</Box>
							</FormStep>
						</FormStepper>
					</CardContent>
				</Card>
			</Container>
		</>
	);
}

export default FeedbackContent;

import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, FormLabel } from "@material-ui/core";
import { Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import styled from "styled-components";
import { jsPDF } from "jspdf";

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
		box-shadow: 0 0 60px 0 rgba(0, 0, 0, 0.1);
	}

	.box-step2 {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.label {
		margin: 12px;
		justify-self: center;
		max-width: 80em;
	}

	.options {
		display: flex;
		flex-direction: ${(props) => (props.vertical ? "column" : "row")};
	}

	.error-msg {
		font-size: 0.8rem;
		color: red;
	}
`;

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

function FeedbackContent(props) {
	const [vertical, setVertical] = useState(false);

	function todaysDate() {
		const today = new Date();
		const day = `${
			today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
		}`;
		const month = `${
			today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth()
		}`;
		const year = today.getFullYear();

		return `${year}-${month}-${day}`;
	}

	useEffect(() => {
		window.addEventListener("resize", onResize);
	}, []);

	const onResize = (e) => {
		if (document.body.clientWidth <= 600) {
			setVertical(true);
		} else {
			setVertical(false);
		}
	};

	return (
		<>
			<Header />
			<Container vertical={vertical}>
				<Card className="card">
					<CardContent>
						<FormStepper
							initialValues={{
								myName: "Usuário Mock",
								employeeName: "",
								date: todaysDate(),
								efficiency: "",
								eficacia: "",
								behavior: "",
								resilience: "",
								challenges: "",
								ethic: "",
								problemResolution: "",
								communication: "",
								proactivity: "",
								interpersonalRelationship: "",
								teamWork: "",
								teamRelationship: "",
								culturalFit: "",
							}}
							onSubmit={async (values) => {
								const doc = new jsPDF();

								await sleep(1500);

								const avaliador = values.myName;
								const avaliado = values.employeeName;
								const dateStringArray = values.date.split("-");
								const eficiencia = values.efficiency;
								const eficacia = values.eficacia;
								const comportamento = values.behavior;
								const resiliencia = values.resilience;
								const desafio = values.challenges;
								const etica = values.ethic;
								const resolucaoProblemas = values.problemResolution;
								const comunicacao = values.communication;
								const proatividade = values.proactivity;
								const relacionamentoInterpessoal =
									values.interpersonalRelationship;
								const trabalhoEquipe = values.teamWork;
								const relacionamentoEquipe = values.teamRelationship;
								const fitCultural = values.culturalFit;

								const data = `${dateStringArray[2]}/${dateStringArray[1]}/${dateStringArray[0]}`;

								const stringContent = `Data do feedback: ${data}
Nome do avaliador: ${avaliador}
Nome do avaliado: ${avaliado}

Pilar de Desempenho
1) Eficiência: ${eficiencia}
2) Eficácia: ${eficacia}

Pilar de Comportamento
3) Postura: ${comportamento}
4) Resiliência: ${resiliencia}
5) Desafios: ${desafio}
6) Ética: ${etica}

Pilar de Habilidades Sociais e Pessoais
7) Resolução de problemas: ${resolucaoProblemas}
8) Comunicação: ${comunicacao}
9) Pró-atividade: ${proatividade}
10) Relacionamento Interpessoal: ${relacionamentoInterpessoal}
11) Trabalho em Equipe: ${trabalhoEquipe}
12) Relacionamento com a Equipe: ${relacionamentoEquipe}
13) Fit cultural: ${fitCultural}`;

								doc.setFontSize(14);
								doc.text(stringContent, 20, 20);
								doc.save("feedback.pdf");

								await sleep(1000);
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
										<RadioOptions
											name="efficiency"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="efficiency"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="efficiency"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="efficiency"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
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
										<RadioOptions
											name="eficacia"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="eficacia"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="eficacia"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="eficacia"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
							</FormStep>
							<FormStep
								label="Pilar de Comportamento"
								validationSchema={yup.object().shape({
									behavior: yup
										.string()
										.required("É necessário escolher uma das opções."),
									resilience: yup
										.string()
										.required("É necessário escolher uma das opções."),
									challenges: yup
										.string()
										.required("É necessário escolher uma das opções."),
									ethic: yup
										.string()
										.required("É necessário escolher uma das opções."),
								})}
							>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="behavior" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador se comporta e se expressa de maneira adequada
										em momentos de estresse?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="behavior"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="behavior"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="behavior"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="behavior"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="resilience" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador demonstra ser resiliente em situações
										complexas?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="resilience"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="resilience"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="resilience"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="resilience"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="challenges" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador teve um comportamento anti-frágil, onde apesar
										das dificuldades da situação ele soube se portar bem e
										aprender com elas?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="challenges"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="challenges"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="challenges"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="challenges"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="ethic" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador teve um comportamento ético seja diante de
										situações nas quais estava equivocado, até mesmo em outras
										relações do cotidiano?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="ethic"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="ethic"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="ethic"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="ethic"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
							</FormStep>
							<FormStep
								label="Pilar de Soft Skills"
								validationSchema={yup.object().shape({
									problemResolution: yup
										.string()
										.required("É necessário escolher uma das opções."),
									communication: yup
										.string()
										.required("É necessário escolher uma das opções."),
									proactivity: yup
										.string()
										.required("É necessário escolher uma das opções."),
									interpersonalRelationship: yup
										.string()
										.required("É necessário escolher uma das opções."),
									teamWork: yup
										.string()
										.required("É necessário escolher uma das opções."),
									teamRelationship: yup
										.string()
										.required("É necessário escolher uma das opções."),
									culturalFit: yup
										.string()
										.required("É necessário escolher uma das opções."),
								})}
							>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="problemResolution" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador soube lidar e resolver os mais diversos
										problemas que surgiam no dia a dia da empresa?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="problemResolution"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="problemResolution"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="problemResolution"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="problemResolution"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="communication" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador sabe se comunicar bem com qualquer pessoa do
										ambiente de trabalho, até mesmo com colegas de outros
										departamentos?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="communication"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="communication"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="communication"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="communication"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="proactivity" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador demonstra ser pró-ativo nas mais diversar
										ocasiões do dia a dia?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="proactivity"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="proactivity"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="proactivity"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="proactivity"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="interpersonalRelationship" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador sabe se comunicar cordialmente com todos do
										seu ambiente de trabalho?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="interpersonalRelationship"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="interpersonalRelationship"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="interpersonalRelationship"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="interpersonalRelationship"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="teamWork" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador ajuda o seus colegas de equipe quando os
										mesmos estão com dificuldade em alguma tarefa? O colaborador
										sabe compartilhar seus conhecimentos?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="teamWork"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="teamWork"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="teamWork"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="teamWork"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="teamRelationship" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador tem um bom relacionamento com seus colegas de
										time, mesmo em situações de estresse?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="teamRelationship"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="teamRelationship"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="teamRelationship"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="teamRelationship"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
								</Box>
								<Box paddingBottom={2} marginTop={4} className="box-step2">
									<div className="error-msg">
										<ErrorMessage name="culturalFit" />
									</div>
									<FormLabel component="legend" className="label">
										O colaborador tem um fit-cultural com a empresa, seja
										seguindo os processos, até mesmo na forma de se trabalhar em
										equipe?
									</FormLabel>
									<div className="options">
										<RadioOptions
											name="culturalFit"
											type="radio"
											position={vertical}
											value="Não Aderente"
											label="Não Aderente"
										/>
										<RadioOptions
											name="culturalFit"
											type="radio"
											position={vertical}
											value="Parcialmente Aderente"
											label="Parcialmente Aderente"
										/>
										<RadioOptions
											name="culturalFit"
											type="radio"
											position={vertical}
											value="Aderente"
											label="Aderente"
										/>
										<RadioOptions
											name="culturalFit"
											type="radio"
											position={vertical}
											value="Modelo/Referência"
											label="Modelo/Referência"
										/>
									</div>
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

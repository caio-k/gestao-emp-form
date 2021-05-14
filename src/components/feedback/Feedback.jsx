import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, FormLabel } from "@material-ui/core";
import { Field, ErrorMessage } from "formik";
import { TextField } from "formik-material-ui";
import * as yup from "yup";
import styled from "styled-components";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

import Header from "../header/Header";
import FormStepper from "./FormStepper";
import FormStep from "./FormStep";
import RadioOptions from "./RadioOptions";

const Container = styled("div")`
	padding: ${(props) => (props.vertical ? 0 : "50px")};
	width: 100%;
	height: fit-content;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 1.8rem;
	color: ${(props) => props.theme.colors.black};

	.card {
		width: ${(props) => (props.vertical ? "100%" : "90%")};
		margin-top: ${(props) => (props.vertical ? "8vh" : 0)};
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
		text-align: justify;
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

	.step-vertical {
		text-align: center;
		padding: 24px;
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

	function generatePDFTable(values) {
		const doc = new jsPDF();

		const base64Img =
			"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAH0CAYAAADL1t+KAAAAAXNSR0IArs4c6QAAAAlwSFlzAAAOxAAADsQBlSsOGwAABGdpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nPgo8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6QXR0cmliPSdodHRwOi8vbnMuYXR0cmlidXRpb24uY29tL2Fkcy8xLjAvJz4KICA8QXR0cmliOkFkcz4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpIHJkZjpwYXJzZVR5cGU9J1Jlc291cmNlJz4KICAgICA8QXR0cmliOkNyZWF0ZWQ+MjAyMS0wNS0wODwvQXR0cmliOkNyZWF0ZWQ+CiAgICAgPEF0dHJpYjpFeHRJZD41NjY3MWM0Ni03OTQwLTQyNjYtOTQzOS1mYjJjYjg3OTk0NjM8L0F0dHJpYjpFeHRJZD4KICAgICA8QXR0cmliOkZiSWQ+NTI1MjY1OTE0MTc5NTgwPC9BdHRyaWI6RmJJZD4KICAgICA8QXR0cmliOlRvdWNoVHlwZT4yPC9BdHRyaWI6VG91Y2hUeXBlPgogICAgPC9yZGY6bGk+CiAgIDwvcmRmOlNlcT4KICA8L0F0dHJpYjpBZHM+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgPGRjOnRpdGxlPgogICA8cmRmOkFsdD4KICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+dGVrPC9yZGY6bGk+CiAgIDwvcmRmOkFsdD4KICA8L2RjOnRpdGxlPgogPC9yZGY6RGVzY3JpcHRpb24+CgogPHJkZjpEZXNjcmlwdGlvbiBy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AEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAQQdAAADCDoAAAYQdAAADCDoAAAYQNABADCAoAMAYABBBwDAAIIOAIABBB0AAAMIOgAABhB0AAAMIOgAABhA0AEAMICgAwBgAEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAQQdAAADCDoAAAYQdAAADCDoAAAYQNABADCAoAMAYABBBwDAAIIOAIABBB0AAAMIOgAABhB0AAAMIOgAABhA0AEAMICgAwBgAEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAQQdAAADCDoAAAYQdAAADCDoAAAYQNABADCAoAMAYABBBwDAAIIOAIABBB0AAAMIOgAABhB0AAAMIOgAABhA0AEAMICgAwBgAEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAQQdAAADCDoAAAYQdAAADCDoAAAYQNABADCAoAMAYABBBwDAAIIOAIABBB0AAAMIOgAABhB0AAAMIOgAABhA0AEAMICgAwBgAEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAQQdAAADCDoAAAYQdAAADCDoAAAYQNABADCAoAMAYABBBwDAAIIOAIABBB0AAAMIOgAABhB0AAAMIOgAABhA0AEAMICgAwBgAEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAQQdAAADCDoAAAYQdAAADCDoAAAYQNABADCAoAMAYABBBwDAAIIOAIABBB0AAAMIOgAABhB0AAAMIOgAABhA0AEAMICgAwBgAEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAQQdAAADCDoAAAYQdAAADCDoAAAYQNABADCAoAMAYABBBwDAAIIOAIABBB0AAAMIOgAABhB0AAAMIOgAABhA0AEAMICgAwBgAEEHAMAAgg4AgAEEHQAAAwg6AAAGEHQAAAwg6AAAGEDQAQAwgKADAGAAQQcAwACCDgCAAf8ff4KMkuKhCq8AAAAASUVORK5CYII=";

		const tableHead = [["Pilar", "Pergunta", "Avaliação", "Comentários"]];

		const dateStringArray = values.date.split("-");
		const date = `${dateStringArray[2]}/${dateStringArray[1]}/${dateStringArray[0]}`;

		doc.autoTable({
			head: tableHead,
			body: [["Desempenho", "Pergunta 1", "Aderente", "Muito top"]],
			didDrawPage: function (data) {
				// Header
				doc.setFontSize(20);
				doc.setTextColor(40);
				if (base64Img) {
					doc.addImage(
						base64Img,
						"JPEG",
						data.settings.margin.left,
						15,
						10,
						10
					);
				}
				doc.text("Feedback", data.settings.margin.left + 15, 22);

				doc.setFontSize(12);

				doc.text(
					`Relatório gerado em: ${date}\nAvaliador: ${values.myName}\nAvaliado: ${values.employeeName}`,
					data.settings.margin.left,
					32
				);
			},
			margin: { top: 50 },
		});

		doc.save("feedback.pdf");
	}

	return (
		<>
			<Header />
			<Container vertical={vertical}>
				<Card className="card">
					<CardContent>
						<FormStepper
							vertical={vertical}
							initialValues={{
								myName: "Usuário Mock",
								employeeName: "",
								date: todaysDate(),
								efficiency: "",
								eficacia: "",
								performanceCommentary: "",
								behavior: "",
								resilience: "",
								challenges: "",
								ethic: "",
								behaviorCommentary: "",
								problemResolution: "",
								communication: "",
								proactivity: "",
								interpersonalRelationship: "",
								teamWork: "",
								teamRelationship: "",
								culturalFit: "",
								softSkillsCOmmentary: "",
							}}
							onSubmit={async (values) => {
								// const doc = new jsPDF();

								await sleep(1500);

								// 								const avaliador = values.myName;
								// 								const avaliado = values.employeeName;
								// 								const dateStringArray = values.date.split("-");
								// 								const eficiencia = values.efficiency;
								// 								const eficacia = values.eficacia;
								// 								const comportamento = values.behavior;
								// 								const resiliencia = values.resilience;
								// 								const desafio = values.challenges;
								// 								const etica = values.ethic;
								// 								const resolucaoProblemas = values.problemResolution;
								// 								const comunicacao = values.communication;
								// 								const proatividade = values.proactivity;
								// 								const relacionamentoInterpessoal =
								// 									values.interpersonalRelationship;
								// 								const trabalhoEquipe = values.teamWork;
								// 								const relacionamentoEquipe = values.teamRelationship;
								// 								const fitCultural = values.culturalFit;

								// 								const performanceCommentary = values.performanceCommentary;
								// 								const behaviorCommentary = values.behaviorCommentary;
								// 								const softSkillsCommentary = values.softSkillsCommentary;

								// 								const data = `${dateStringArray[2]}/${dateStringArray[1]}/${dateStringArray[0]}`;

								// 								const stringContent = `Data do feedback: ${data}
								// Nome do avaliador: ${avaliador}
								// Nome do avaliado: ${avaliado}

								// Pilar de Desempenho
								// 1) Eficiência: ${eficiencia}
								// 2) Eficácia: ${eficacia}
								// Comentários: ${performanceCommentary}

								// Pilar de Comportamento
								// 3) Postura: ${comportamento}
								// 4) Resiliência: ${resiliencia}
								// 5) Desafios: ${desafio}
								// 6) Ética: ${etica}
								// Comentários: ${behaviorCommentary}

								// Pilar de Habilidades Sociais e Pessoais
								// 7) Resolução de problemas: ${resolucaoProblemas}
								// 8) Comunicação: ${comunicacao}
								// 9) Pró-atividade: ${proatividade}
								// 10) Relacionamento Interpessoal: ${relacionamentoInterpessoal}
								// 11) Trabalho em Equipe: ${trabalhoEquipe}
								// 12) Relacionamento com a Equipe: ${relacionamentoEquipe}
								// 13) Fit cultural: ${fitCultural}
								// Comentários: ${softSkillsCommentary}

								// Quantos caracteres será que a linha aguenta ou será que ela quebra sozinha eu acho que ela não quebra soziunha que merada`;

								// 								doc.setFontSize(14);
								// 								doc.text(stringContent, 20, 20);
								// 								doc.save("feedback.pdf");

								generatePDFTable(values);
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
								<Box paddingBottom={2} marginTop={4}>
									<Field
										fullWidth
										multiline
										variant="outlined"
										rows={5}
										name="performanceCommentary"
										component={TextField}
										label="Comentários"
									/>
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
								<Box paddingBottom={2} marginTop={4}>
									<Field
										fullWidth
										multiline
										variant="outlined"
										rows={5}
										name="behaviorCommentary"
										component={TextField}
										label="Comentários"
									/>
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
								<Box paddingBottom={2} marginTop={4}>
									<Field
										fullWidth
										multiline
										variant="outlined"
										rows={5}
										name="softSkillsCommentary"
										component={TextField}
										label="Comentários"
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

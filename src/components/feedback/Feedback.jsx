import React from "react";
import {Box, Card, CardContent, FormLabel} from "@material-ui/core";
import {ErrorMessage, Field} from "formik";
import {TextField} from "formik-material-ui";
import * as yup from "yup";
import styled from "styled-components";
import "jspdf-autotable";

import Header from "../header/Header";
import FormStepper from "./FormStepper";
import FormStep from "./FormStep";
import RadioOptions from "./RadioOptions";

import FeedbackItems from "./FeedbackItems";
import useFeedback from "./FeedbackLogic";

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

function FeedbackContent() {
  const [{vertical}, todaysDate, generatePDFTable] = useFeedback();

  return (
    <>
      <Header/>
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
                softSkillsCommentary: "",
              }}
              onSubmit={async (values) => {
                await sleep(1500);
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
                    .required("É necessário informar o nome de quem está sendo avaliado."),
                  date: yup
                    .date()
                    .required("É necessário informar uma data.")
                })}
              >
                <Box paddingBottom={2}>
                  <Field
                    fullWidth
                    name="myName"
                    component={TextField}
                    label="Nome do avaliador"
                    InputLabelProps={{required: true}}
                  />
                </Box>
                <Box paddingBottom={2}>
                  <Field
                    fullWidth
                    name="employeeName"
                    component={TextField}
                    label="Nome do avaliado"
                    InputLabelProps={{required: true}}
                  />
                </Box>
                <Box paddingBottom={2}>
                  <Field
                    name="date"
                    type="date"
                    component={TextField}
                    label="Data"
                    InputLabelProps={{shrink: true, required: true}}
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
                    .required("É necessário escolher uma das opções.")
                })}
              >
                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="efficiency"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["desempenho"][0]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="efficiency" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="efficiency" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="efficiency" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="efficiency" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="eficacia"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["desempenho"][1]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="eficacia" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="eficacia" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="eficacia" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="eficacia" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
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
                    .required("É necessário escolher uma das opções.")
                })}
              >
                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="behavior"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["comportamento"][0]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="behavior" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="behavior" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="behavior" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="behavior" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="resilience"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["comportamento"][1]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="resilience" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="resilience" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="resilience" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="resilience" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="challenges"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["comportamento"][2]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="challenges" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="challenges" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="challenges" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="challenges" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="ethic"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["comportamento"][3]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="ethic" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="ethic" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="ethic" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="ethic" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
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
                    .required("É necessário escolher uma das opções.")
                })}
              >
                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="problemResolution"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["softSkills"][0]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="problemResolution" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="problemResolution" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="problemResolution" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="problemResolution" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="communication"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["softSkills"][1]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="communication" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="communication" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="communication" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="communication" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="proactivity"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["softSkills"][2]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="proactivity" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="proactivity" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="proactivity" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="proactivity" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="interpersonalRelationship"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["softSkills"][3]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="interpersonalRelationship" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="interpersonalRelationship" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="interpersonalRelationship" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="interpersonalRelationship" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="teamWork"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["softSkills"][4]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="teamWork" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="teamWork" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="teamWork" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="teamWork" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="teamRelationship"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["softSkills"][5]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="teamRelationship" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="teamRelationship" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="teamRelationship" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="teamRelationship" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
                  </div>
                </Box>

                <Box paddingBottom={2} marginTop={4} className="box-step2">
                  <div className="error-msg">
                    <ErrorMessage name="culturalFit"/>
                  </div>
                  <FormLabel component="legend" className="label">
                    {`${FeedbackItems["softSkills"][6]}`}
                  </FormLabel>
                  <div className="options">
                    <RadioOptions name="culturalFit" position={vertical} value="Não Aderente"
                                  label="Não Aderente"/>

                    <RadioOptions name="culturalFit" position={vertical} value="Parcialmente Aderente"
                                  label="Parcialmente Aderente"/>

                    <RadioOptions name="culturalFit" position={vertical} value="Aderente"
                                  label="Aderente"/>

                    <RadioOptions name="culturalFit" position={vertical} value="Modelo/Referência"
                                  label="Modelo/Referência"/>
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

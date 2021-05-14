import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
	Button,
	CircularProgress,
	Grid,
	Step,
	StepLabel,
	StepContent,
	Stepper,
} from "@material-ui/core";
import { Form, Formik } from "formik";

function FormStepper({ children, vertical, ...props }) {
	const childrenArray = React.Children.toArray(children);
	const [step, setStep] = useState(0);
	const currentChild = childrenArray[step];
	const [completed, setCompleted] = useState(false);
	const history = useHistory();

	function isLastStep() {
		return step === childrenArray.length - 1;
	}

	return (
		<>
			{!vertical && (
				<Formik
					{...props}
					validationSchema={currentChild.props.validationSchema}
					onSubmit={async (values, helpers) => {
						if (isLastStep()) {
							await props.onSubmit(values, helpers);
							setCompleted(true);
							alert("Feedback finalizado com sucesso! :)");
							history.push("/home");
						} else {
							console.log(values);
							setStep((s) => s + 1);
							helpers.setTouched({});
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form autoComplete="off">
							<Stepper alternativeLabel activeStep={step}>
								{childrenArray.map((child, index) => (
									<Step
										key={child.props.label}
										completed={step > index || completed}
									>
										<StepLabel>{child.props.label}</StepLabel>
									</Step>
								))}
							</Stepper>

							{currentChild}

							<Grid container spacing={4} justify="flex-end">
								{step > 0 ? (
									<Grid item>
										<Button
											disabled={isSubmitting}
											variant="contained"
											color="primary"
											onClick={() => setStep((s) => s - 1)}
										>
											Voltar
										</Button>
									</Grid>
								) : null}
								<Grid item>
									<Button
										startIcon={
											isSubmitting ? <CircularProgress size="1rem" /> : null
										}
										disabled={isSubmitting}
										variant="contained"
										color="primary"
										type="submit"
									>
										{isSubmitting
											? "Finalizando"
											: isLastStep()
											? "Finalizar"
											: "Próximo"}
									</Button>
								</Grid>
							</Grid>
						</Form>
					)}
				</Formik>
			)}
			{vertical && (
				<Formik
					{...props}
					validationSchema={currentChild.props.validationSchema}
					onSubmit={async (values, helpers) => {
						if (isLastStep()) {
							await props.onSubmit(values, helpers);
							setCompleted(true);
							alert("Feedback finalizado com sucesso! :)");
							history.push("/home");
						} else {
							setStep((s) => s + 1);
							helpers.setTouched({});
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form autoComplete="off">
							<Stepper
								alternativeLabel
								activeStep={step}
								orientation="vertical"
							>
								{childrenArray.map((child, index) => (
									<Step
										key={child.props.label}
										completed={step > index || completed}
									>
										<StepLabel>{child.props.label}</StepLabel>
										<StepContent>{currentChild}</StepContent>
										{step === index ? (
											<Grid container spacing={4} justify="flex-end">
												{step > 0 ? (
													<Grid item>
														<Button
															disabled={isSubmitting}
															variant="contained"
															color="primary"
															onClick={() => setStep((s) => s - 1)}
														>
															Voltar
														</Button>
													</Grid>
												) : null}
												<Grid item>
													<Button
														startIcon={
															isSubmitting ? (
																<CircularProgress size="1rem" />
															) : null
														}
														disabled={isSubmitting}
														variant="contained"
														color="primary"
														type="submit"
													>
														{isSubmitting
															? "Finalizando"
															: isLastStep()
															? "Finalizar"
															: "Próximo"}
													</Button>
												</Grid>
											</Grid>
										) : null}
									</Step>
								))}
							</Stepper>
						</Form>
					)}
				</Formik>
			)}
		</>
	);
}

export default FormStepper;

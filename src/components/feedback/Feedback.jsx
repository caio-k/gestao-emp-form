import React, { useState } from "react";
import { Box, Card, CardContent } from "@material-ui/core";
import { Field } from "formik";
import { CheckboxWithLabel, TextField } from "formik-material-ui";
import { mixed, number, object } from "yup";
import styled from "styled-components";

import Header from "../header/Header";
import FormStepper from "./FormStepper";
import FormStep from "./FormStep";

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
`;

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

function FeedbackContent(props) {
	return (
		<>
			<Header />
			<Container>
				<Card className="card">
					<CardContent>
						<FormStepper
							initialValues={{
								firstName: "",
								lastName: "",
								millionaire: false,
								money: 0,
								description: "",
							}}
							onSubmit={async (values) => {
								await sleep(3000);
								console.log("values", values);
							}}
						>
							<FormStep label="Personal Data">
								<Box paddingBottom={2}>
									<Field
										fullWidth
										name="firstName"
										component={TextField}
										label="First Name"
									/>
								</Box>
								<Box paddingBottom={2}>
									<Field
										fullWidth
										name="lastName"
										component={TextField}
										label="Last Name"
									/>
								</Box>
								<Box paddingBottom={2}>
									<Field
										name="millionaire"
										type="checkbox"
										component={CheckboxWithLabel}
										Label={{ label: "I am a millionaire" }}
									/>
								</Box>
							</FormStep>
							<FormStep
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
							</FormStep>
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

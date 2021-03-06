import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, CircularProgress, Grid, Step, StepLabel, Stepper} from "@material-ui/core";
import {Form, Formik} from "formik";

function FormStepper({children, vertical, ...props}) {
  const [step, setStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  const childrenArray = React.Children.toArray(children);
  const currentChild = childrenArray[step];
  const history = useHistory();

  function isLastStep() {
    return step === childrenArray.length - 1;
  }

  return (
    <>
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
            window["scrollTo"]({top: 0, behavior: "smooth"});
            setStep((s) => s + 1);
            helpers.setTouched({});
          }
        }}
      >
        {({isSubmitting}) => (
          <Form autoComplete="off">
            {vertical ? (
              <h4 className="step-vertical">
                {step + 1}. {childrenArray[step].props.label}
              </h4>
            ) : (
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
            )}

            {currentChild}

            <Grid container spacing={4} justify="flex-end">
              {step > 0 ? (
                <Grid item>
                  <Button
                    disabled={isSubmitting}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      window["scrollTo"]({top: 0, behavior: "smooth"});
                      setStep((s) => s - 1);
                    }}
                  >
                    Voltar
                  </Button>
                </Grid>
              ) : null}

              <Grid item>
                <Button
                  startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null}
                  disabled={isSubmitting}
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  {isSubmitting ? "Finalizando" : isLastStep() ? "Finalizar" : "Pr??ximo"}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default FormStepper;

import React from "react";
import { useField } from "formik";
import { Radio, FormControlLabel } from "@material-ui/core";

function RadioOptions({ label, position, ...props }) {
	const [field] = useField(props);
	const placement = position ? "end" : "bottom";

	return (
		<FormControlLabel
			{...field}
			control={<Radio color="primary" />}
			label={label}
			labelPlacement={placement}
		/>
	);
}

export default RadioOptions;

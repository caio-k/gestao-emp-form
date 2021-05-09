import React from "react";
import { useField } from "formik";
import { Radio, FormControlLabel } from "@material-ui/core";

function RadioOptions({ label, ...props }) {
	const [field] = useField(props);

	return (
		<FormControlLabel
			{...field}
			control={<Radio color="primary" />}
			label={label}
			labelPlacement="bottom"
		/>
	);
}

export default RadioOptions;

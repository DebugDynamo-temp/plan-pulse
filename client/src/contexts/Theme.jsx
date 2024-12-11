import { createTheme } from "@mui/material/styles";
import { blue, pink } from "@mui/material/colors";

const theme = createTheme({
	palette: {
		primary: blue, 
		secondary: {
			main: pink[300]
		},
		white: {
			main: '#eee',
			pink: pink[50],
			blue: blue[50]
		}
	},
});

export { theme }
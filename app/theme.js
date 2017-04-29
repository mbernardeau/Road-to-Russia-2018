import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  red700, red500, red300,
  blue700, blue500, blue300,
  white, darkBlack,
 } from 'material-ui/styles/colors';


export default getMuiTheme({
  palette: {
    primary1Color: red700,
    primary2Color: red500,
    primary3Color: red300,

    accent1Color: blue700,
    accent2Color: blue500,
    accent3Color: blue300,
    textColor: darkBlack,
    alternateTextColor: white,
  },
});

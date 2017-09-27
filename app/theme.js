import createMuiTheme from 'material-ui/styles/createMuiTheme';
import red from 'material-ui/colors/red';
import blue from 'material-ui/colors/blue';
import common from 'material-ui/colors/common';

const red700 = red['700'];
const red500 = red['500'];
const red300 = red['300'];
const blue700 = blue['700'];
const blue500 = blue['500'];
const blue300 = blue['300'];
const white = common.white;
const darkBlack = common.darkBlack;


export default createMuiTheme({
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

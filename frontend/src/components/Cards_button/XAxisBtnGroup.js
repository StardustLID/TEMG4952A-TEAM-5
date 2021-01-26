import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import AxisData from "../../pages/AxisData";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const xaxisData = [
  { id: "first_fund", label: "First Funding Size ($)", disabled: 0 },
  { id: "first_fund_log", label: "First Funding Size (log$)", disabled: 0 },
  { id: "investor_count", label: "Number of Investors in First Funding", disabled: 0 },
  { id: "employee_count", label: "Employee Count", disabled: 0 },
  { id: "company_age", label: "Company Age", disabled: 0 },
  { id: "degree_level", label: "Executive Degree Level", disabled: 0 },
  { id: "num_invested", label: "Number Invested by Top 100", disabled: 0 },
];

function XAxisBtnGroup(props) {
  const handleChange = (event) => {
    props.selectXaxis(event.target.value);
  };

  xaxisData.map((item) => {
    if (props.yaxis == "first_fund_log" && item.id == "first_fund") {
      item.disabled = 1;
      return;
    }

    if (props.yaxis == "first_fund" && item.id == "first_fund_log") {
      item.disabled = 1;
      return;
    }

    if (item.id == props.yaxis) {
      item.disabled = 1;
    } else {
      item.disabled = 0;
    }
  });

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">X Axis</FormLabel>
      <RadioGroup value={props.selected} onChange={handleChange}>
        {xaxisData.map((item) => (
          <FormControlLabel
            value={item.id}
            disabled={item.disabled}
            control={<Radio color="primary" />}
            label={item.label}
            key={item.id}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default XAxisBtnGroup;

import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const xaxisData = [
  { id: "employee_count", label: "Employee Count" },
  { id: "company_age", label: "Company Age" },
  { id: "company_location", label: "Company Location" },
  { id: "company_category", label: "Company Category" },
  { id: "degree_level", label: "Executive Degree Level" },
  { id: "first_fund", label: "Fund Size in Seeds/Angels" },
  { id: "num_invested", label: "Number Invested by Top 100" },
];

function XAxisBtnGroup(props) {
  const handleChange = (event) => {
    props.selectXaxis(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">X Axis</FormLabel>
      <RadioGroup value={props.selected} onChange={handleChange}>
        {xaxisData.map((item) => (
          <FormControlLabel value={item.id} control={<Radio />} label={item.label} key={item.id} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default XAxisBtnGroup;

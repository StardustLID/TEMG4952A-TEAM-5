import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const yaxisData = [
  { id: "mean_momentum", label: "Mean Momentum", disabled: 0 },
  { id: "first_fund", label: "First Funding Size ($)", disabled: 0 },
  { id: "first_fund_log", label: "First Funding Size (log$)", disabled: 0 },
  { id: "investor_count", label: "Number of Investors in First Funding", disabled: 0 },
  { id: "employee_count", label: "Employee Count", disabled: 0 },
  { id: "company_age", label: "Company Age", disabled: 0 },
  { id: "degree_level", label: "Executive Degree Level", disabled: 0 },
  { id: "num_invested", label: "Number Invested by Top 100", disabled: 0 },
];

function YAxisBtnGroup(props) {
  const handleChange = (event) => {
    props.selectYaxis(event.target.value);
  };

  yaxisData.map((item) => {
    if (props.xaxis == "first_fund_log" && item.id == "first_fund") {
      item.disabled = 1;
      return;
    }

    if (props.xaxis == "first_fund" && item.id == "first_fund_log") {
      item.disabled = 1;
      return;
    }

    if (item.id == props.xaxis) {
      item.disabled = 1;
    } else {
      item.disabled = 0;
    }
  });

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Y Axis</FormLabel>
      <RadioGroup value={props.selected} onChange={handleChange}>
        {yaxisData.map((item) => (
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

export default YAxisBtnGroup;

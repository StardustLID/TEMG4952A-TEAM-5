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

const yaxisData = [
  { id: "company_age", label: "Company Age" },
  { id: "executive_degree_level", label: "Executive Degree Level" },
  { id: "fund_size", label: "Fund Size in Seeds/Angels" },
  { id: "num_invested", label: "Number Invested by Top 100" },
  { id: "mean_momentum", label: "Mean Momentum" },
];

function YAxisBtnGroup(props) {
  const handleChange = (event) => {
    props.selectYaxis(event.target.value);
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Y Axis</FormLabel>
      <RadioGroup value={props.selected} onChange={handleChange}>
        {yaxisData.map((item) => (
          <FormControlLabel value={item.id} control={<Radio />} label={item.label} key={item.id} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}

export default YAxisBtnGroup;

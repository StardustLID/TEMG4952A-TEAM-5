import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";
import { makeStyles } from "@material-ui/core/styles";
import { barColors } from "../d3_charts/CompanyAgeChart";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 100,
    marginLeft: 30,
  },
  checkboxGroupRoot: {
    marginLeft: 60,
  },
}));

export default function CompanyAgeBtnGroup(props) {
  const classes = useStyles(props);

  const {
    // Obtain values from `ageCategory` prop via destructuring
    ageCategory: { group, cat_pca_0, cat_pca_1, cat_pca_2, cat_pca_3, cat_pca_4 },
    radioBtnHandler,
    checkboxHandler,
  } = props;

  const checkboxData = [
    { name: "cat_pca_0", label: "PCA 0", checked: cat_pca_0 },
    { name: "cat_pca_1", label: "PCA 1", checked: cat_pca_1 },
    { name: "cat_pca_2", label: "PCA 2", checked: cat_pca_2 },
    { name: "cat_pca_3", label: "PCA 3", checked: cat_pca_3 },
    { name: "cat_pca_4", label: "PCA 4", checked: cat_pca_4 },
  ];

  // Checkbox group under the "Show Categories" radio option
  const checkboxGroup = (
    <FormControl component="fieldset" className={classes.checkboxGroupRoot}>
      <FormGroup>
        {checkboxData.map((item) => (
          <FormControlLabel
            control={
              <Checkbox
                checkedIcon={<Icon style={{ color: barColors[item.name] }}>check_box</Icon>}
                checked={item.checked}
              />
            }
            onChange={checkboxHandler}
            label={item.label}
            value={item.name}
            key={item.name}
          />
        ))}
      </FormGroup>
    </FormControl>
  );

  return (
    <>
      <FormControl component="fieldset" className={classes.root}>
        <FormLabel component="legend">Company Type</FormLabel>
        <RadioGroup name="company_age" value={group} onChange={radioBtnHandler}>
          <FormControlLabel value="all" control={<Radio color="primary" />} label="All Categories" />
          <FormControlLabel
            value="show_category"
            control={<Radio color="primary" />}
            label="Show Categories"
          />
        </RadioGroup>
      </FormControl>
      {group === "show_category" ? checkboxGroup : null}
    </>
  );
}

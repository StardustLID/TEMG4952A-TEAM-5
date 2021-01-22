import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

export default function CheckboxesGroup(props) {
  const classes = useStyles();

  const { all, personal, blockchain } = props.selected;

  const buttonData = [
    { id: "all", checked: all, text: "All" },
    { id: "personal", checked: personal, text: "Personal Finance" },
    { id: "blockchain", checked: blockchain, text: "Blockchain" },
  ];

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Key:</FormLabel>
        <FormGroup>
          {buttonData.map((item) => (
            <FormControlLabel
              key={item.id}
              control={
                <Checkbox
                  checkedIcon={<Icon style={{ color: props.barColors[item.id] }}>check_box</Icon>}
                  checked={item.checked}
                  onChange={() => props.categorizeBySelected(item.id, !item.checked)}
                />
              }
              label={item.text}
            />
          ))}
        </FormGroup>
      </FormControl>
    </div>
  );
}

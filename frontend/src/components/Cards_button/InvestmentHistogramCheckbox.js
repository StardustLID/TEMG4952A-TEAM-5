import { makeStyles } from "@material-ui/core/styles";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useState } from "react";

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

  return (
    <div className={classes.root}>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Key:</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={all}
                onChange={() => props.categorizeBySelected("all", !all)}
              />
            }
            label="All"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={personal}
                onChange={() => props.categorizeBySelected("personal", !personal)}
              />
            }
            label="Personal Finance"
          />
          <FormControlLabel
            control={
              <Checkbox
                color="default"
                checked={blockchain}
                onChange={() => props.categorizeBySelected("blockchain", !blockchain)}
              />
            }
            label="Blockchain"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
}

/*const buttonData = [
    { id: "all", text: "All" },
    { id: "personal", text: "Personal Finance" },
    { id: "blockchain", text: "Blockchain" },
  ];*/

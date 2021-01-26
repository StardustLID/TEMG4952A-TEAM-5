import Grid from "@material-ui/core/Grid";
import LineGraphWrapper from "../../wrappers/LineGraphWrapper";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

function LineGraphwithSearchBarCard() {
  // value of the searching, set "Dispatch" as default value
  const [value, setValue] = useState("Dispatch");

  return (
    <Grid container direction="column" spacing={2}>
      <Grid container item spacing={2} alignItems="center">
        <Grid item>
          <SearchBar setValue={setValue} value={value} />
        </Grid>
        <Grid item>
          <h2>{value === null ? "Please select a company" : `Current Company : ${value}`}</h2>
        </Grid>
      </Grid>
      <Grid item>{<LineGraphWrapper selected={value} />}</Grid>
    </Grid>
  );
}

export default LineGraphwithSearchBarCard;

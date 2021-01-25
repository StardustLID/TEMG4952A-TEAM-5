import Grid from "@material-ui/core/Grid";
import LineGraphWrapper from "../../wrappers/LineGraphWrapper";
import SearchBar from "../../components/SearchBar";
import { useState } from "react";

function LineGraphwithSearchBarCard() {
  // value of the searching, set "All of us" as default value
  const [value, setValue] = useState("All of Us");

  return (
    <Grid container direction="column" spacing={2}>
      <Grid container item spacing={2}>
        <Grid item>
          <SearchBar setValue={setValue} value={value} />
        </Grid>
        <Grid item>
          <h2>{`Current Company: ${value !== null ? `'${value}'` : "null"}`}</h2>
        </Grid>
      </Grid>
      <Grid item>{<LineGraphWrapper selected={value} />}</Grid>
    </Grid>
  );
}

export default LineGraphwithSearchBarCard;

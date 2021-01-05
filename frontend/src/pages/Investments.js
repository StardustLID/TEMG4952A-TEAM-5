import React from "react";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Investments() {
  return (
    <Grid container>
      <Grid item xs={0} sm={2} />
      <Grid item xs={12} sm={8}>
        <br />
        <Typography variant="h4">Investments </Typography>
      </Grid>
      <Grid item xs={0} sm={2} />
    </Grid>
  );
}

export default Investments;

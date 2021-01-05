import React from "react";
import { Grid } from "@material-ui/core";
import WICard from "./Cards/WorthInvestingCard";
import RICard from "./Cards/RecentInvestmentsCard";
import ACard from "./Cards/AllocationCard";
import Typography from "@material-ui/core/Typography";

const Home = (props) => {
  return (
    <Grid container>
      <Grid item xs={0} sm={2} />
      <Grid container item xs={12} sm={8} direction="column" spacing={2}>
        <Grid item>
          <br />
          <Typography variant="h4">Home </Typography>
        </Grid>
        <Grid container item spacing={4} alignItems="stretch">
          <Grid container item xs={12} sm={8} direction="column" spacing={4}>
            <Grid item>
              <WICard />
            </Grid>
            <Grid item>
              <RICard />
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4}>
            <ACard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={0} sm={2} />
    </Grid>
  );
};

export default Home;

/*
<Grid container direction="column">
      <Grid item>Home</Grid>
      <Grid item container direction="row">
        <Grid item xs={0} sm={2} />
        <Grid container item xs={12} sm={8} spacing={4}>
          <Grid container item xs={8} direction="column" spacing={4}>
            <Grid item>
              <WICard />
            </Grid>
            <Grid item>
              <RICard />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <ACard />
          </Grid>
        </Grid>
        <Grid item xs={0} sm={2} />
      </Grid>
    </Grid>

    */

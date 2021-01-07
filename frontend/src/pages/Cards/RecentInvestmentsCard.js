import React, { useEffect, useState, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import ScatterplotWrapper from "../../wrappers/ScatterplotWrapper";
import ClusterBtn from "../../components/Cards_button/ClusterBtn";

const useStyles = makeStyles({
  root: {
    minHeight: 300,
  },
  bullet: {
    display: "inline-black",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: 700,
  },
});

export default function RecentInvestmentsCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const [cluster, setClustor] = useState("children");

  const clusterBySelected = (cluster) => {
    setClustor({ cluster });
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Recent Investments" classes={{ title: classes.title }} />
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <ClusterBtn clusterby={clusterBySelected} />
          </Grid>
          <Grid item xs={9}>
            <ScatterplotWrapper cluster={cluster} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

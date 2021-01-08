import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";

import ScatterplotWrapper from "../../wrappers/ScatterplotWrapper";
import ClusterBtnGroup from "../../components/Cards_button/ClusterBtnGroup";

const useStyles = makeStyles({
  root: {
    padding: 5,
  },
});

export default function RecentInvestmentsCard(props) {
  const classes = useStyles(props);

  // This state has values of "phases", "sizes", "category"
  const [cluster, setCluster] = useState("phases");

  const clusterBySelected = (cluster) => setCluster(cluster);

  return (
    <Card className={classes.root}>
      <CardHeader title="Recent Investments" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <Grid container>
          <Grid item xs={3}>
            <ClusterBtnGroup selected={cluster} clusterBy={clusterBySelected} />
          </Grid>
          <Grid item xs={9}>
            <ScatterplotWrapper cluster={cluster} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

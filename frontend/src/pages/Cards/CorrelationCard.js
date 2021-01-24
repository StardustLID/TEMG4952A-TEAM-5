import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";

import ChangeableGraphWrapper from "../../wrappers/ChangeableGraphWrapper";
import XAxisBtnGroup from "../../components/Cards_button/XAxisBtnGroup";
import YAxisBtnGroup from "../../components/Cards_button/YAxisBtnGroup";

const useStyles = makeStyles({
  root: {
    padding: 5,
  },
});

export default function CorrelationCard(props) {
  const classes = useStyles(props);

  // This state has values of "phases", "sizes", "category"
  const [xaxis, setXaxis] = useState("degree_level");
  const [yaxis, setYaxis] = useState("mean_momentum");

  const selectXaxis = (xaxis) => setXaxis(xaxis);
  const selectYaxis = (yaxis) => setYaxis(yaxis);

  return (
    <Card className={classes.root}>
      <CardHeader title="Changeable Graph" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <ChangeableGraphWrapper xaxis={xaxis} yaxis={yaxis} />
          </Grid>
          <Grid container item xs={3}>
            <Grid item>
              <XAxisBtnGroup selected={xaxis} selectXaxis={selectXaxis} yaxis={yaxis} />
            </Grid>
            <Grid item>
              <YAxisBtnGroup selected={yaxis} selectYaxis={selectYaxis} xaxis={xaxis} />
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

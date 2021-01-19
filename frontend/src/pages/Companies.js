import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import SingleBarChartWrapper from "../wrappers/SingleBarChartWrapper";
import HistogramWrapper from "../wrappers/HistogramWrapper";
import PieChartWrapper from "../wrappers/PiechartWrapper";
import LineGraphWrapper from "../wrappers/LineGraphWrapper";
import WorldMapWrapper from "../wrappers/WorldMapWrapper";
import MultiBarChartWrapper from "../wrappers/MultiBarChartWrapper";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#EBEBEB",
    paddingBottom: 20,
    // If overflow is not hidden, then a horizontal scroll bar appears
    // Read more: https://material-ui.com/components/grid/#negative-margin
    overflowX: "hidden",
    overflowY: "hidden",
  },
  title: {
    marginTop: 20,
  },
});

function Companies() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={1} /> {/* Adds left margin */}
      <Grid container item sm={10} direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h1" className={classes.title}>
            Histogram and Bar Chart Example
          </Typography>
        </Grid>
        <Grid container item direction="column" spacing={2}>
          <Grid container item spacing={4}>
            {/* <Grid item>{<SingleBarChartWrapper />}</Grid>
            <Grid item>{<HistogramWrapper />}</Grid> */}
          </Grid>
          <Grid container item spacing={4}>
            <Grid item>{<PieChartWrapper />}</Grid>
            {/* <Grid item>{<LineGraphWrapper />}</Grid> */}
          </Grid>
          <Grid container item spacing={4}>
            <Grid item>{<WorldMapWrapper />}</Grid>
            <Grid item>{<MultiBarChartWrapper />}</Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={1} /> {/* Adds right margin */}
    </Grid>
  );
}

export default Companies;

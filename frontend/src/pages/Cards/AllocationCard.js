import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minHeight: 600,
  },
  col: {
    minHeight: 300,
  },
});

export default function AllocationCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="US$50M Portfolio Allocation" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h3">By TimeSeries</Typography>
          </Grid>
          <Grid item>
            <Typography variant="h3">By Size</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

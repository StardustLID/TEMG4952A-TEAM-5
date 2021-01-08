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

export default function AllocationCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardHeader title="US$50M Portfolio Allocation" classes={{ title: classes.title }} />
      <CardContent>
        <Grid container direction="column">
          <Grid item>
            <Typography variant="h5" component="h2">
              By TimeSeries
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2">
              By Size
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

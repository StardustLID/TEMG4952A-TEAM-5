import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AllocationTableHome from "../../components/tables/AllocationTableHome";
import PiechartWrapper from "../../wrappers/PiechartWrapper";

const useStyles = makeStyles({
  root: {
    minHeight: 600,
  },
  col: {
    minHeight: 300,
  },
  h3Title: {
    marginBottom: 20,
  },
});

export default function AllocationCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="US$50M Portfolio Allocation" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Typography variant="h3" className={classes.h3Title}>
              By Time Series
            </Typography>
            <AllocationTableHome />
          </Grid>
          <Grid item>
            <Typography variant="h3" className={classes.h3Title}>
              By Size
            </Typography>
            <PiechartWrapper />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

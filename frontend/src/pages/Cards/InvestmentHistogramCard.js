import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IHWrapper from "../../wrappers/InvestmentHistogramWrapper";

const useStyles = makeStyles({
  root: {
    padding: 5,
  },
});

export default function InvestmentsHistogramCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Investment Histogram" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <Grid container xs={12} direction="column" spacing={2}>
          <Grid item>
            <IHWrapper />
          </Grid>
        </Grid>
        <Grid container xs={12} direction="column" spacing={2}>
          <Grid item>{/* Insert button group component here */}</Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import FeaturesBtnListCard from "./Cards/FeaturesBtnListCard";
import FeaturesPlotCard from "./Cards/FeaturesPlotCard";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#EBEBEB",
    paddingBottom: 20,
  },
  title: {
    marginTop: 20,
  },
});

export default function Features() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={1} /> {/* Adds left margin */}
      <Grid container item sm={10} direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h1" className={classes.title}>
            Features Visualization
          </Typography>
        </Grid>
        <Grid container item direction="row" spacing={3}>
          <Grid item sm={3}>
            <FeaturesBtnListCard />
          </Grid>
          <Grid item sm={9}>
            <FeaturesPlotCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={1} /> {/* Adds right margin */}
    </Grid>
  );
}

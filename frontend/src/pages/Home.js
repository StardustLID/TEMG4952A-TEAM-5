import Grid from "@material-ui/core/Grid";
import WICard from "./Cards/WorthInvestingCard";
import RICard from "./Cards/RecentInvestmentsCard";
import ACard from "./Cards/AllocationCard";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

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

export default function Home() {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item sm={1} /> {/* Adds left margin */}
      <Grid container item sm={10} direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h1" className={classes.title}>
            Home
          </Typography>
        </Grid>
        {/* Grid that holds the 3 cards */}
        <Grid container item spacing={4}>
          <Grid container item sm={8} direction="column" spacing={4}>
            <Grid item>
              <WICard />
            </Grid>
            <Grid item>
              <RICard />
            </Grid>
          </Grid>
          <Grid item sm={4}>
            <ACard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={1} /> {/* Adds right margin */}
    </Grid>
  );
}

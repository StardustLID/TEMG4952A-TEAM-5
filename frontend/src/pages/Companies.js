import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import CompaniesListCard from "./Cards/CompaniesListCard";

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
      <Grid container item sm={10} direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h1" className={classes.title}>
            Companies
          </Typography>
        </Grid>
        <Grid container item direction="column" spacing={2}>
          <Grid item>
            <CompaniesListCard />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={1} /> {/* Adds right margin */}
    </Grid>
  );
}

export default Companies;

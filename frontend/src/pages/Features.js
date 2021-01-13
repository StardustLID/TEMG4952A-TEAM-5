import { useState } from "react";
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

  // Stores the id of the selected item in the left button list
  // See src/pages/featuresData.js for all possible values of id
  const [selectedId, setSelectedId] = useState("num-employees");

  // onClick handler for the left list of buttons
  const listBtnHandler = (itemId) => {
    setSelectedId(itemId);
  };

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
            <FeaturesBtnListCard selectedId={selectedId} listBtnHandler={listBtnHandler} />
          </Grid>
          <Grid item sm={9}>
            <FeaturesPlotCard selectedId={selectedId} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item sm={1} /> {/* Adds right margin */}
    </Grid>
  );
}

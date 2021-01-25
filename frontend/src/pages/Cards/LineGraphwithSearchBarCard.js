import Grid from "@material-ui/core/Grid";
import LineGraphWrapper from "../../wrappers/LineGraphWrapper";
import SearchBar from "../../components/SearchBar";

function LineGraphwithSearchBarCard() {
  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <SearchBar />
      </Grid>
      <Grid item>
        <h1>hi</h1>
        {/*<LineGraphWrapper />*/}
      </Grid>
    </Grid>
  );
}

export default LineGraphwithSearchBarCard;

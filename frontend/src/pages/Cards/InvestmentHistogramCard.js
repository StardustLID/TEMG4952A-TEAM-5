import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IHWrapper from "../../wrappers/InvestmentHistogramWrapper";
import IHCheckbox from "../../components/Cards_button/InvestmentHistogramCheckbox";
import BubblePlotWrapper from "../../wrappers/BubblePlotWrapper";

const useStyles = makeStyles({
  root: {
    padding: 5,
  },
});

// Colors of the histogram bars by category
const barColors = {
  all: "#e60100",
  personal: "#07871e",
  blockchain: "#08a89e",
};

export default function InvestmentsHistogramCard() {
  const classes = useStyles();
  const [category, setCategory] = useState({
    all: true,
    personal: true,
    blockchain: true,
  });

  const categorizeBySelected = (element, checked) => {
    setCategory({ ...category, [element]: checked });
  };

  return (
    <Card className={classes.root}>
      <CardHeader title="Investment Histogram" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <Grid container spacing={2}>
        <Grid item container spacing={2}>
          <Grid item>
            <IHWrapper category={category} barColors={barColors} />
          </Grid>
          <Grid item>
            <IHCheckbox
              selected={category}
              categorizeBySelected={categorizeBySelected}
              barColors={barColors}
            />
          </Grid>
        </Grid>
        <Grid item>
            <BubblePlotWrapper />
        </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

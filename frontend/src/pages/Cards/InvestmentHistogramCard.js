import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import IHWrapper from "../../wrappers/InvestmentHistogramWrapper";
import IHCheckbox from "../../components/Cards_button/InvestmentHistogramCheckbox";

const useStyles = makeStyles({
  root: {
    padding: 5,
  },
});

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
          <Grid item>
            <IHWrapper category={category} />
          </Grid>
          <Grid item>
            <IHCheckbox selected={category} categorizeBySelected={categorizeBySelected} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import featuresData from "../featuresData";
import SingleBarChartWrapper from "../../wrappers/SingleBarChartWrapper";

const useStyles = makeStyles({
  root: {
    padding: 5,
    height: "100%",
  },
  contentRoot: {
    padding: "25px 50px",
  },
});

export default function FeaturesPlotCard(props) {
  const classes = useStyles();

  const { selectedId } = props;

  // Selected object from "featuresData" array imported from featuresData.js
  const selectedDataObj = featuresData.find((element) => element.id === selectedId);

  // Evaluates which chart wrapper to use
  let chartWrapper = null;
  switch (selectedDataObj.chartType) {
    case "singleBar":
      chartWrapper = <SingleBarChartWrapper chartID={selectedDataObj.id} />;
      break;
    case "multiBar":
      break;
    case "line":
      break;
    case "map":
      break;
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={selectedDataObj.btnTitle} titleTypographyProps={{ variant: "h2" }} />
      <CardContent className={classes.contentRoot}>{chartWrapper}</CardContent>
    </Card>
  );
}

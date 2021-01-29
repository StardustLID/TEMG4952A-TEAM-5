import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import featuresData from "../featuresData";
import SingleBarChartWrapper from "../../wrappers/SingleBarChartWrapper";
import LineGraphwithSearchBarCard from "../Cards/LineGraphwithSearchBarCard";
import WorldMap from "../../components/WorldMap/WorldMap";
import MultiBarChartWrapper from "../../wrappers/MultiBarChartWrapper";
import HistogramWrapper from "../../wrappers/HistogramWrapper";

const useStyles = makeStyles({
  root: {
    padding: 5,
    minHeight: 600,
  },
  contentRoot: {
    padding: "15px 35px",
  },
});

export default function FeaturesPlotCard(props) {
  const classes = useStyles();

  const { selectedId } = props;

  // Selected object from "featuresData" array imported from featuresData.js
  const selectedDataObj = featuresData.find((element) => element.id === selectedId);
  const selectedChartID = selectedDataObj.id;

  // Evaluates which chart wrapper to use
  let chartWrapper = null;
  switch (selectedDataObj.chartType) {
    case "singleBar":
      chartWrapper = <SingleBarChartWrapper chartID={selectedChartID} />;
      break;
    case "multiBar":
      chartWrapper = <MultiBarChartWrapper chartID={selectedChartID} />;
      break;
    case "histogram":
      chartWrapper = <HistogramWrapper chartID={selectedChartID} />;
      break;
    case "line":
      chartWrapper = <LineGraphwithSearchBarCard />;
      break;
    case "map":
      chartWrapper = <WorldMap chartID={selectedChartID} />;
      break;
    default:
      break;
  }

  return (
    <Card className={classes.root}>
      <CardHeader title={selectedDataObj.btnTitle} titleTypographyProps={{ variant: "h2" }} />
      <CardContent className={classes.contentRoot}>{chartWrapper}</CardContent>
    </Card>
  );
}

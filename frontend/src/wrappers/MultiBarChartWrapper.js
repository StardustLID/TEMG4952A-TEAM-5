import { useRef, useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import MultiBarChart from "../components/d3_charts/MultiBarChart";
import CompanyAgeChart from "../components/d3_charts/CompanyAgeChart";
import LoadingSpinner from "../components/LoadingSpinner";
import featuresData from "../pages/featuresData";
import CompanyAgeBtnGroup from "../components/Cards_button/CompanyAgeBtnGroup";

export default function MultiBarChartWrapper(props) {
  const { chartID } = props;
  const selectedDataObj = featuresData.find((element) => element.id === chartID);

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of MultiBarChart

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // For "Company Age" buttons
  const [ageCategory, setAgeCategory] = useState({
    group: "all", // Either "all" or "show_category"
    commerce_shopping: true,
    fin_services: true,
    lending_invests: true,
    payments: true,
  });

  // Handler for radio buttons in "Company Age"
  const aegRadioBtnHandler = (event) => {
    setAgeCategory({ ...ageCategory, group: event.target.value });
  };

  // Handler for checkboxes in "Company Age"
  const ageCheckboxHandler = (event) => {
    setAgeCategory({ ...ageCategory, [event.target.value]: event.target.checked });
  };

  // Let D3 render the scatterplot after this component finished mounting
  useEffect(() => {
    // Remove existing single bar chart when a new single bar chart is selected
    if (plot) {
      plot.removeGraph(); // Method of SingleBarChart
      setLoading(true);
    }

    // Remove the error icon if a new graph is selected
    if (error) {
      setError(false);
    }

    axios
      .get(`/features/${selectedDataObj.id}`)
      .then((res) => {
        setLoading(false);

        if (chartID === "company-age") {
          setPlot(new CompanyAgeChart(plotArea.current, res.data, selectedDataObj.axisLabels));
        } else {
          setPlot(new MultiBarChart(plotArea.current, res.data, selectedDataObj.axisLabels));
        }
      })
      .catch(() => setError(true)); // failed to fetch data
  }, [chartID]);

  const renderComponent =
    chartID === "company-age" ? (
      <Grid container direction="row" spacing={2}>
        <Grid container item sm={8}>
          <Grid item>
            <div className="plot-area" ref={plotArea} />
          </Grid>
        </Grid>
        <Grid container sm={4} item>
          <Grid item>
            <CompanyAgeBtnGroup
              ageCategory={ageCategory}
              radioBtnHandler={aegRadioBtnHandler}
              checkboxHandler={ageCheckboxHandler}
            />
          </Grid>
        </Grid>
      </Grid>
    ) : (
      <div className="plot-area" ref={plotArea} />
    );

  // Calls `update()` method of CompanyAgeChart object when `ageCategory` updates
  // React will NOT re-render this component when props.ageCategory updates
  useEffect(() => {
    if (chartID === "company-age") {
      plot?.update(ageCategory);
    }
  }, [plot, ageCategory]);

  return loading || error ? <LoadingSpinner error={error} /> : renderComponent;
}

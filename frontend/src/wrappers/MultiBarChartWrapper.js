import { useRef, useState, useEffect } from "react";
import MultiBarChart from "../components/d3_charts/MultiBarChart";
import CompanyAgeChart from "../components/d3_charts/CompanyAgeChart";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "axios";
import featuresData from "../pages/featuresData";

export default function MultiBarChartWrapper(props) {
  const { chartID } = props;
  const selectedDataObj = featuresData.find((element) => element.id === chartID);

  const plotArea = useRef(null); // Reference to the div where the plot will be rendered inside
  const [plot, setPlot] = useState(null); // "plot" will later point to an instance of MultiBarChart

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // For "Company Age" buttons
  const [companyAgeCategory, setCompanyAgeCategory] = useState({
    all: true,
    financial_services: false,
    fintech: false,
    finance: false,
    payments: false,
  });

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

  // Calls the update(category) method of SingleBarChart class when props.category updates
  // React will NOT re-render this component when props.category updates
  /*useEffect(() => {
    plot?.update(props.category);
  }, [plot, props.category]);*/

  return loading || error ? <LoadingSpinner error={error} /> : <div className="plot-area" ref={plotArea} />;
}

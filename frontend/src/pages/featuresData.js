/** This array is used in the "Features Visualization" page.
 *
 * For each object element in the array:
 * @param {string} id - Acts as an ID for both the graph's name and the selected button for the left button list.
 * This is also used to generate the Flask API URL with the format of `/features/{id}`
 * @param {string} btnTitle - Title for the button at the left button list
 * @param {string} icon - ID for the Material UI icons (https://material.io/resources/icons)
 * @param {string} chartType - Type of chart. Possible values: `("singleBar"|"multiBar"|"histogram"|"line"|"map")`
 * @param {string[]} axisLabels - Axis labels of the graph in the format of `["x axis label", "y axis label"]`
 */

const featuresData = [
  {
    id: "num-employees",
    btnTitle: "No. of Employees",
    icon: "people",
    chartType: "singleBar",
    axisLabels: ["Number of Employees", "Number of Companies"],
  },
  {
    id: "company-age",
    btnTitle: "Company Age",
    icon: "access_time",
    chartType: "multiBar",
    axisLabels: ["Company Age", "Number of Companies"],
  },
  {
    id: "funding-rounds",
    btnTitle: "No. of Funding Rounds",
    icon: "payments",
    chartType: "singleBar",
    axisLabels: ["Number of Funding Rounds", "Number of Companies"],
  },
  {
    id: "funding-per-round",
    btnTitle: "Funding per Round",
    icon: "local_atm",
    chartType: "line",
    axisLabels: ["Year", "Funding"],
  },
  {
    id: "num-investments",
    btnTitle: "No. of Investments",
    icon: "attach_money",
    chartType: "histogram",
    axisLabels: ["Number of Investments", "Number of Companies"],
  },
  {
    id: "top-investments",
    btnTitle: "No. of Investments by Top 20 Investors",
    icon: "person",
    chartType: "singleBar",
    axisLabels: ["Top Investors' Names", "Number of Companies Invested"],
  },
  {
    id: "num-acquisitions",
    btnTitle: "No. of Acquisitions",
    icon: "bar_chart",
    chartType: "singleBar",
    axisLabels: ["Number of Acquisitions", "Number of Companies"],
  },
  {
    id: "acquisition-price",
    btnTitle: "Acquisition Price",
    icon: "monetization_on",
    chartType: "histogram",
    axisLabels: ["Acquisition Price (1M USD)", "Number of Companies"],
  },
  {
    id: "funds-raised",
    btnTitle: "Total Funds Raised",
    icon: "money",
    chartType: "histogram",
    axisLabels: ["Dollar Amount (1M USD)", "Number of Companies"],
  },
  {
    id: "num-companies-owned",
    btnTitle: "No. of Companies Owned by Top 20 Founders",
    icon: "business",
    chartType: "multiBar",
    axisLabels: ["Top Investors' Names", "Number of Companies"],
  },
  {
    id: "founder-exp",
    btnTitle: "Founder Experience",
    icon: "star",
    chartType: "singleBar",
    axisLabels: ["Top Investors' Names", "Number of Years Between Job Start Date and Graduation"],
  },
  {
    id: "funding-location",
    btnTitle: "Funding Location",
    icon: "place",
    chartType: "map",
    axisLabels: null,
  },
];

export default featuresData;

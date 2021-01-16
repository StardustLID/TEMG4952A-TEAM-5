/** This array is used in the "Features Visualization" page.
 *
 * For each object element in the array:
 * @param {string} id - Acts as an ID for both the graph's name and the selected button for the left button list
 * @param {string} btnTitle - Title for the button at the left button list
 * @param {string} icon - ID for the Material UI icons (https://material.io/resources/icons)
 * @param {string} chartType - Type of chart. Possible values: `("singleBar"|"multiBar"|"histogram"|"line"|"map")`
 */

const featuresData = [
  { id: "num-employees", btnTitle: "No. of Employees", icon: "people", chartType: "histogram" },
  { id: "company-age", btnTitle: "Company Age", icon: "access_time", chartType: "multiBar" },
  { id: "funding-rounds", btnTitle: "No. of Funding Rounds", icon: "timeline", chartType: "singleBar" },
  { id: "funding-per-round", btnTitle: "Funding per Round", icon: "local_atm", chartType: "line" },
  { id: "num-investments", btnTitle: "No. of Investments", icon: "attach_money", chartType: "singleBar" },
  {
    id: "top-investments",
    btnTitle: "No. of Investments by Top 20 Investors",
    icon: "person",
    chartType: "singleBar",
  },
  { id: "num-acquisitions", btnTitle: "No. of Acquisitions", icon: "bar_chart", chartType: "singleBar" },
  { id: "acquisition-price", btnTitle: "Acquisition Price", icon: "monetization_on", chartType: "histogram" },
  { id: "funds-raised", btnTitle: "Total Funds Raised", icon: "money", chartType: "histogram" },
  {
    id: "num-companies-owned",
    btnTitle: "No. of Companies Owned by Top 20 Founders",
    icon: "business",
    chartType: "multiBar",
  },
  { id: "founder-exp", btnTitle: "Founder Experience", icon: "star", chartType: "singleBar" },
  { id: "funding-location", btnTitle: "Funding Location", icon: "place", chartType: "map" },
];

export default featuresData;
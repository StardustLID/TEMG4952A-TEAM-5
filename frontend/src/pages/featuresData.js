/** This array is used in the "Features Visualization" page.
 * Explanation of object properties:
 *
 * "id": Acts as an ID for both the graph's name and the selected button for the left button list
 * "btnTitle": Title for the button at the left button list
 * "icon": ID for the Material UI icons (https://material.io/resources/icons)
 */

const featuresData = [
  { id: "num-employees", btnTitle: "No. of Employees", icon: "people" },
  { id: "company-age", btnTitle: "Company Age", icon: "access_time" },
  { id: "funding-rounds", btnTitle: "No. of Funding Rounds", icon: "timeline" },
  { id: "funding-per-round", btnTitle: "Funding per Round", icon: "local_atm" },
  { id: "num-investments", btnTitle: "No. of Investments", icon: "attach_money" },
  {
    id: "top-investments",
    btnTitle: "No. of Investments by Top 20 Investors",
    icon: "person",
  },
  { id: "num-acquisitions", btnTitle: "No. of Acquisitions", icon: "bar_chart" },
  { id: "acquisition-price", btnTitle: "Acquisition Price", icon: "monetization_on" },
  { id: "funds-raised", btnTitle: "Total Funds Raised", icon: "money" },
  {
    id: "num-companies-owned",
    btnTitle: "No. of Companies Owned by Top 20 Founders",
    icon: "business",
  },
  { id: "founder-exp", btnTitle: "Founder Experience", icon: "star" },
  { id: "funding-location", btnTitle: "Funding Location", icon: "place" },
];

export default featuresData;

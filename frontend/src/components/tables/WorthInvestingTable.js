import { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { makeStyles } from "@material-ui/core/styles";
import { csvParse as d3_csvParse } from "d3";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const useStyles = makeStyles(() => ({
  root: {
    height: 550,
    width: "100%",
  },
  rootHome: {
    height: 340,
    width: "100%",
  },
}));

const columns = [
  {
    field: "id",
    headerName: "Rank",
    width: 100,
    description: "Ranked in descending order of Average Momentum",
  },
  { field: "company_name", headerName: "Company", width: 180 },
  { field: "category", headerName: "Company Category", width: 180 },
  {
    field: "employee_count",
    headerName: "Employee Count",
    width: 170,
    valueFormatter: (param) => getEmployeeCount(param.value),
  },
  { field: "num_funding_rounds", headerName: "Funding Rounds", width: 160 },
  { field: "fd_rd_latest_investment", headerName: "Latest Investment", width: 170 },
  { field: "first_fund_investor_count", headerName: "# of First Fund Investors", width: 210 },
  {
    field: "num_exec",
    headerName: "# of Company Executives",
    width: 220,
    description: "This includes the company's founders & co-founders",
  },
  {
    field: "fd_rd_num_invested_by_top_100",
    headerName: "# of Investors being Top 100 Investors",
    width: 300,
    description: "How many investors of that company belongs to the Top 100 Investors list",
  },
  { field: "average_momentum", headerName: "Actual Avg. Momentum", width: 210 },
];

function getCategoryName(row) {
  if (row.cat_commerce_shopping == "1.0") {
    return "Commerce & Shopping";
  } else if (row.cat_fin_services == "1.0") {
    return "Financial Services";
  } else if (row.cat_lending_invests == "1.0") {
    return "Lending & Investments";
  } else {
    return "Payments";
  }
}

function getEmployeeCount(id) {
  switch (id) {
    case 1:
      return "1-10";
    case 2:
      return "11-50";
    case 3:
      return "51-100";
    case 4:
      return "101-250";
    case 5:
      return "251-500";
    case 6:
      return "501-600";
    case 7:
      return "10000+";
    default:
      return "Unknown";
  }
}

function getLatestInvestName(investType) {
  switch (investType) {
    case 0:
      return "No data";
    case 1:
      return "Seed/Angel";
    case 2:
      return "Round A";
    case 3:
      return "Round B";
    case 4:
      return "Round C";
    case 5:
      return "Round D";
    case 6:
      return "Round E";
    case 7:
      return "Round F";
    default:
      return "Others";
  }
}

function processRows(parsedCsvData) {
  const rows = parsedCsvData.map((row) => ({
    id: +row.index + 1,
    company_name: row.company_name,
    category: getCategoryName(row),
    employee_count: +row.employee_count,
    num_funding_rounds: +row.num_funding_rounds,
    fd_rd_latest_investment: getLatestInvestName(+row.fd_rd_latest_investment),
    first_fund_investor_count: +row.first_fund_investor_count,
    num_exec: +row.num_exec,
    fd_rd_num_invested_by_top_100: +row.fd_rd_num_invested_by_top_100,
    average_momentum: +row.average_momentum,
  }));

  return rows;
}

export default function WorthInvestingTableHome(props) {
  const { inHomePage } = props;

  const classes = useStyles();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [tableRows, setTableRows] = useState(null);

  useEffect(() => {
    axios
      .get("/top-companies")
      .then((res) => {
        let parsedCsvData = d3_csvParse(res.data);

        // Show the first 5 companies only for the table in home page
        if (inHomePage) {
          parsedCsvData = parsedCsvData.slice(0, 5);
        }

        const rows = processRows(parsedCsvData);
        setTableRows(rows);
        setLoading(false);
      })
      .catch(() => setError(true));
  }, []);

  return loading || error ? (
    <LoadingSpinner error={error} />
  ) : (
    <div className={inHomePage ? classes.rootHome : classes.root}>
      <DataGrid
        rows={tableRows}
        columns={columns}
        disableSelectionOnClick
        hideFooter={inHomePage}
        pageSize={50}
      />
    </div>
  );
}

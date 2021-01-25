import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
});

function createData(rank, name, category, size, region, funding, ROI) {
  return { rank, name, category, size, region, funding, ROI };
}

const rows = [
  createData(1, "Gnosis", "BlockChain", "11-50", "Gibraltar", 12525000, 737.78),
  createData(2, "KudiGo", "BlockChain", "1-10", "Greater Accra", 490000, 619.8),
  createData(3, "SafetyWing", "Financial Services", "1-10", "California", 4120000, 437.79),
  createData(4, "Nethone", "AI", "51-100", "Mazowieckie", 3903400, 363.27),
  createData(5, "Purchext", "App", "1-10", "Nova Scotia", 78876, 354.66),
];

export default function WorthInvestingTableHome() {
  const classes = useStyles();

  return (
    <p style={{ fontSize: 30 }}>To be completed</p>
    /*
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="right">Company&nbsp;name</TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Size</TableCell>
            <TableCell align="right">Region</TableCell>
            <TableCell align="right">Funding&nbsp;(USD)</TableCell>
            <TableCell align="right">ROI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell align="right">{row.rank}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.size}</TableCell>
              <TableCell align="right">{row.region}</TableCell>
              <TableCell align="right">{row.funding}</TableCell>
              <TableCell align="right">{row.ROI}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    */
  );
}

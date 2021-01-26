import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import WorthInvestingTable from "../../components/tables/WorthInvestingTable";

const useStyles = makeStyles({
  root: {
    minHeight: 450,
    padding: 5,
  },
});

export default function CompaniesListCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Top Companies Worth Investing" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <WorthInvestingTable />
      </CardContent>
    </Card>
  );
}

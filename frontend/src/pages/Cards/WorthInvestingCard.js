import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import WorthInvestingTable from "../../components/tables/WorthInvestingTable";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    padding: 5,
    minHeight: 300,
  },
  seeMoreBtn: {
    marginTop: 20,
  },
});

export default function WorthInvestingCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Companies Worth Investing" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <WorthInvestingTable inHomePage />
        <Button color="primary" href="/companies" className={classes.seeMoreBtn}>
          See Full List
        </Button>
      </CardContent>
    </Card>
  );
}

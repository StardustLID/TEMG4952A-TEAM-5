import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import WorthInvestingTableHome from "../../components/tables/WorthInvestingTableHome";

const useStyles = makeStyles({
  root: {
    minHeight: 300,
  },
});

export default function WorthInvestingCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Companies Worth Investing" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <WorthInvestingTableHome />
      </CardContent>
    </Card>
  );
}

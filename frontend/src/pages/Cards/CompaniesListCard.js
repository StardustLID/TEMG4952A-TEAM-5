import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const useStyles = makeStyles({
  root: {
    minHeight: 450,
  },
});

export default function CompaniesListCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader title="Companies List" titleTypographyProps={{ variant: "h2" }} />
      <CardContent></CardContent>
    </Card>
  );
}

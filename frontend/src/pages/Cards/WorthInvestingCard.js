import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minHeight: 300,
  },
  bullet: {
    display: "inline-black",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
});

export default function WorthInvestingCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardHeader title="Companies Worth Investing" titleTypographyProps={{ variant: "h2" }} />
      <CardContent>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
      </CardContent>
    </Card>
  );
}

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    padding: 5,
    minHeight: 550,
  },
});

export default function FeaturesPlotCard(props) {
  const classes = useStyles();

  const { selectedId } = props;

  return <Card className={classes.root}></Card>;
}

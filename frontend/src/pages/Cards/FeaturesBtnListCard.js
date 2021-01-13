import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
  root: {
    padding: 5,
    minHeight: 300,
  },
});

export default function FeaturesBtnListCard() {
  const classes = useStyles();

  return <Card className={classes.root}></Card>;
}

import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    margin: "120px 160px",
  },
});

/** A circular loading spinner from Material UI, but with larger size and custom margin. */
export default function LoadingSpinner() {
  const classes = useStyles();

  return <CircularProgress size={60} classes={{ root: classes.root }} />;
}

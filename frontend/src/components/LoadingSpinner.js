import CircularProgress from "@material-ui/core/CircularProgress";
import Icon from "@material-ui/core/Icon";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  progressRoot: {
    margin: "120px 160px",
  },
  errorRoot: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  errorIcon: {
    fontSize: 80,
    display: "block",
  },
  errorText: {
    marginTop: 15,
    fontWeight: 700,
  },
});

/** A circular loading spinner that would turn into an error icon if API fetching failed. */
export default function LoadingSpinner(props) {
  const classes = useStyles();

  const { error } = props; // If true, display an error icon

  return error ? (
    <div className={classes.errorRoot}>
      <Icon color="error" className={classes.errorIcon}>
        error
      </Icon>
      <Typography variant="body1" color="error" className={classes.errorText}>
        Failed to fetch data. Please try again!
      </Typography>
    </div>
  ) : (
    <CircularProgress size={60} classes={{ root: classes.progressRoot }} />
  );
}

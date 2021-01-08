import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const buttonData = [
  { id: "phases", text: "Phases" },
  { id: "sizes", text: "Sizes" },
  { id: "category", text: "Category" },
];

function ClusterBtnGroup(props) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <h4>Cluster by</h4>
      {buttonData.map((item) => (
        <Button
          variant={props.selected === item.id ? "contained" : "outlined"}
          color="primary"
          size="medium"
          disableElevation // No drop shadow if variant="contained"
          onClick={() => props.clusterBy(item.id)}
          key={item.id}
        >
          {item.text}
        </Button>
      ))}
    </div>
  );
}

export default ClusterBtnGroup;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function ClusterBtn(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h4>Cluster by</h4>
      <Button variant="outlined" color="primary">
        Children
      </Button>
      {/*<Button variant="outlined" color="primary" onClicked={props.Clusterby("sizes")}>*/}
      <Button variant="outlined" color="primary">
        Sizes
      </Button>
      <Button variant="outlined" color="primary">
        Catergory
      </Button>
    </div>
  );
}

export default ClusterBtn;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    minHeight: 630,
    backgroundColor: "white",
    color: "Black",
  },
  bullet: {
    display: "inline-black",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 100,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function AllocationCard() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardHeader title="US$50M Portfolio Allocation" />
      <CardContent>
        <Typography variant="h5" component="h2">
          be{bull}nev{bull}o{bull}lent
        </Typography>
      </CardContent>
    </Card>
  );
}

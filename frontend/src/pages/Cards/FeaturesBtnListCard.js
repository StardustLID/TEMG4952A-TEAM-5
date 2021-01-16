import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import featuresData from "../featuresData";

const useStyles = makeStyles((theme) => ({
  cardContent: {
    padding: 10,
    "&:last-child": {
      paddingBottom: 10,
    },
  },
  listItem: {
    borderRadius: 5,
    "&:hover": {
      backgroundColor: "rgba(202, 21, 21, 0.1)",
    },
    "&$selected": {
      color: theme.palette.primary.main,
      backgroundColor: "rgba(202, 21, 21, 0.2)",
      "&:hover": {
        backgroundColor: "rgba(202, 21, 21, 0.3)",
      },
    },
  },
  listItemIcon: {
    color: "black",
  },
  listItemIconSelected: {
    color: theme.palette.primary.main,
  },
  listItemText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  selected: {}, // Don't delete
}));

export default function FeaturesBtnListCard(props) {
  const classes = useStyles(props);

  // See src/pages/featuresData.js for all possible values of button IDs
  const { selectedId, listBtnHandler } = props;

  return (
    <Card>
      <CardContent className={classes.cardContent}>
        <List>
          {featuresData.map((item) => (
            <ListItem
              button
              classes={{ root: classes.listItem, selected: classes.selected }}
              onClick={() => listBtnHandler(item.id)}
              selected={selectedId === item.id}
              key={item.id}
            >
              <ListItemIcon
                className={selectedId === item.id ? classes.listItemIconSelected : classes.listItemIcon}
              >
                <Icon>{item.icon}</Icon>
              </ListItemIcon>
              <ListItemText primary={item.btnTitle} classes={{ primary: classes.listItemText }} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}

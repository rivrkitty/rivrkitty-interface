import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";

type Props = {
  name: string;
  type: string;
  btnclass: string;
  onclick: () => void;
};

const useStyles = makeStyles((theme) => ({
  general: {
    borderRadius: "16px",
    borderWidth: "2px",
    textTransform: "none",
    fontSize: "16px",
    fontWeight: 500,
    "&:hover": {
      borderWidth: "2px",
    },
  },
  green: {
    borderColor: "#60C0C2",
    "&:hover": {
      backgroundColor: "#284051",
    },
  },
  yellow: {
    color: "#EEAB47",
    borderColor: "#EEAB47",
    "&:hover": {
      borderColor: "#EEAB47",
      backgroundColor: "#4B3A32",
    },
  },
}));

export default function KittyVerseRoundedButton(props: Props) {
  const classes = useStyles();
  const { type, btnclass, name, onclick } = props;
  const handleOnClick = () => {
    onclick();
  };
  return (
    <Button
      variant="outlined"
      className={clsx(
        type === "yellow" && classes.yellow,
        type === "green" && classes.green,
        classes.general,
        btnclass
      )}
      onClick={handleOnClick}
    >
      {name}
    </Button>
  );
}

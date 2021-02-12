import * as React from "react";
import { createStyles, lighten, makeStyles, Paper, Theme } from "@material-ui/core";

import { ConfigPanelAction, IConfigPanelAction } from "../actions";
import { ConfigTheme } from "../helper";

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
        : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
    title: {
      display: "inline",
      fontSize: "180%",
      fontWeight: "bold",
      marginLeft: "16px",
    },
    subtitle: {
      color: "silver",
      display: "inline",
      marginLeft: "20px",
    },
    actions: {
      display: "inline",
      marginRight: "8px",
      float: "right",
    },
    actionOn: {
      borderRadius: "25px",
      border: "2px solid silver",
      boxShadow: "0 0 3px #FF0000, 0 0 5px #0000FF",
    },
  })
);

interface IConfigPanel {
  vscode: any;
  memento: any;
}

let listener = undefined;

interface ITitleProps {
  title: string;
  subtitle: string;
}

function Title(props: ITitleProps) {
  const style = useToolbarStyles();

  return (
    <>
      <div className={style.title}>{props.title}</div>
      <div className={style.subtitle}>{props.subtitle}</div>
    </>
  );
}

export default function ConfigPanel(props: IConfigPanel) {
  //const [selected, setSelected] = React.useState<IConnectionData[]>([]);
  const [reset, setReset] = React.useState(false);
  const [targetRow, setTargetRow] = React.useState(null);

  if (listener === undefined) {
    listener = (event: MessageEvent) => {
      const message = event.data; // The JSON data our extension sent

      switch (message.command) {
        case ConfigPanelAction.Save: {

          break;
        }
        default:
          console.log("***** ATTENTION: configPanel.tsx");
          console.log("\tCommand not recognized: " + message.command);
          break;
      }
    };

    window.addEventListener("message", listener);
  }

  const handleRefreshButtonClick = () => {
    event.preventDefault();

    let command: IConfigPanelAction = {
      action: ConfigPanelAction.Close,
      content: {},
    };

    props.vscode.postMessage(command);
  };

  const handleResetButtonClick = () => {
    event.preventDefault();
    setReset(true);
  };


  const handleDisconnectUserButtonClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any
  ) => {
    event.preventDefault();

    setTargetRow(row);
    //setOpenDialog({ ...openDialog, disconnectUser: true });
  };

  const actions = [];

  // actions.push({
  //   icon: () => <MessageIcon />,
  //   tooltip: i18n.localize(
  //     "SEND_MESSAGE_ALL_USERS",
  //     "Send message to all users"
  //   ),
  //   isFreeAction: true,
  //   onClick: (event: any) => handleSendMessageButtonClick(event, null),
  // });

  const style = useToolbarStyles();

  return (
    <ConfigTheme>
      <Paper variant="outlined">
      </Paper>

    </ConfigTheme>
  );
}

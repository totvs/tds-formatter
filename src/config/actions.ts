export interface IConfigPanelAction {
  action: ConfigPanelAction;
  content: any;
}

export enum ConfigPanelAction {
  Save,
  Close,
  SaveAndClose,
  RestoreDefault
}

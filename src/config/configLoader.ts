import * as vscode from "vscode";
import * as path from "path";
import * as nls from "vscode-nls";
import { ConfigPanelAction, IConfigPanelAction } from "./actions";

const localize = nls.loadMessageBundle();

let configLoader: ConfigLoader = undefined;

export function openConfigPanel(context: vscode.ExtensionContext) {

  if ((configLoader === undefined) || (configLoader === null)) {
    configLoader = new ConfigLoader(context);
  }
}

export class ConfigLoader {
  protected readonly _panel: vscode.WebviewPanel | undefined;
  private readonly _extensionPath: string;
  private _disposables: vscode.Disposable[] = [];
  private _isDisposed: boolean = false;
  private _context: any;

  constructor(context: vscode.ExtensionContext) {
    const ext = vscode.extensions.getExtension("TOTVS.tds-formatter");
    this._extensionPath = ext.extensionPath;
    this._context = context;

    this._disposables.push(
    );

    this._panel = vscode.window.createWebviewPanel(
      "configLoader",
      localize("CONFIG", "Configuration"),
      vscode.ViewColumn.One,
      {
        enableScripts: true,
        localResourceRoots: [
          vscode.Uri.file(path.join(this._extensionPath, "out", "webpack")),
        ],
      }
    );

    this._panel.webview.html = this.getWebviewContent();
    this._panel.onDidChangeViewState(
      (listener: vscode.WebviewPanelOnDidChangeViewStateEvent) => {
      },
      undefined,
      this._disposables
    );

    this._panel.webview.onDidReceiveMessage(
      (command: IConfigPanelAction) => {
        this.handleMessage(command);
      },
      undefined,
      this._disposables
    );

    this._panel.onDidDispose((event) => {
      this._isDisposed = true;

      configLoader = undefined;
    });
  }

  private async handleMessage(command: IConfigPanelAction) {
    switch (command.action) {
      case ConfigPanelAction.Save: {
        break;
      }
      case ConfigPanelAction.Close: {

        break;
      }
      case ConfigPanelAction.SaveAndClose: {
        break;
      }
      case ConfigPanelAction.RestoreDefault: {
        break;
      }
      default:
        console.log("***** ATTENTION: configLoader.tsx");
        console.log("\tUnrecognized command: " + command.action);
        console.log("\t" + command.content);
        break;
    }
  }

  private getWebviewContent(): string {
    // Local path to main script run in the webview
    const reactAppPathOnDisk = vscode.Uri.file(
      path.join(this._extensionPath, "out", "webpack", "configPanel.js")
    );

    const reactAppUri = this._panel?.webview.asWebviewUri(reactAppPathOnDisk);
    const configJson: any = {
      translations: getTranslations(),
    };

    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Monitor View</title>

        <meta http-equiv="Content-Security-Policy"
                    content="default-src 'none';
                             img-src https:;
                             script-src 'unsafe-eval' 'unsafe-inline' vscode-resource:;
                             style-src vscode-resource: 'unsafe-inline';">

        <script>
          window.acquireVsCodeApi = acquireVsCodeApi;
          window.initialData = ${JSON.stringify(configJson)};
        </script>
    </head>
    <body>
        <div id="root"></div>
        <script crossorigin src="${reactAppUri}"></script>
    </body>
    </html>`;
  }
}

function getTranslations() {
  return {
    CONFIG: localize("CONFIG", "Configuration"),
  };
}

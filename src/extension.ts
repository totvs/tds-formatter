/*---------------------------------------------------------
 * Copyright (C) TOTVS S.A. All rights reserved.
 *--------------------------------------------------------*/
import * as vscode from "vscode";
import * as nls from "vscode-nls";
import * as prettier from "prettier";

import { register4glFormatting, registerAdvplFormatting } from "./formatter";

const localize = nls.config({
  locale: vscode.env.language,
  bundleFormat: nls.BundleFormat.standalone,
})();

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "tds-formatter" is now active!');

  context.subscriptions.push(
    vscode.commands.registerCommand("tds.batch.formatter", (args: any[]) => {
      doBatchFormatter(args);
    })
  );

  register4glFormatting();
  registerAdvplFormatting();

  showBanner();
}

function showBanner() {
  const config = vscode.workspace.getConfiguration("totvsLanguageServer");
  const showBanner = config.get("showBanner", true);

  if (showBanner) {
    let ext = vscode.extensions.getExtension("TOTVS.tds-formatter");
   // let oc: vscode.OutputChannel = createOutputChannel("");

    /* prettier-ignore-start */
    // languageClient.outputChannel.appendLine(
    //   "---------------------------v---------------------------------------------------"
    // );
    // languageClient.outputChannel.appendLine(
    //   "   //////  ////    //////  |  TDS Formatter"
    // );
    // languageClient.outputChannel.appendLine(
    //   "    //    //  //  //       |  Version " + ext.packageJSON["version"]
    // );
    // languageClient.outputChannel.appendLine(
    //   "   //    //  //  //////    |  TOTVS Technology"
    // );
    // languageClient.outputChannel.appendLine("  //    //  //      //     |");
    // languageClient.outputChannel.appendLine(
    //   " //    ////    //////      |  https://github.com/totvs/tds-formatter"
    // );
    // languageClient.outputChannel.appendLine(
    //   " --------------------------^---------------------------------------------------"
    // );
    /* prettier-ignore-end */
  }
}

function doBatchFormatter(args: any[]) {
  vscode.window.showInformationMessage(
    "Desculpe! Comando em processo de implementação."
  );
  // if (args === undefined) {
  //   let aeditor = vscode.window.activeTextEditor;
  //   if (aeditor !== undefined) {
  //     args = [aeditor.document.uri];
  //   }
  // }
  // if (instanceOfUri(args)) {
  //   documentFormatting([args.fsPath]);
  // } else if (instanceOfUriArray(args)) {
  //   const map: string[] = args.map<string>((uri: Uri) => {
  //     return uri.fsPath;
  //   });
  //   documentFormatting(map);
  // }
}

// function instanceOfUri(object: any): object is Uri {
//   return object !== undefined && "scheme" in object;
// }

// function instanceOfUriArray(object: any): object is Uri[] {
//   return object !== undefined && Array.isArray(object);
// }

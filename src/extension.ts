/*---------------------------------------------------------
 * Copyright (C) TOTVS S.A. All rights reserved.
 *--------------------------------------------------------*/
"use strict";
import * as vscode from "vscode";
import * as nls from "vscode-nls";

const localize = nls.config({
  locale: vscode.env.language,
  bundleFormat: nls.BundleFormat.standalone,
})();

export function activate(context: vscode.ExtensionContext) {

  console.log(
    'Congratulations, your extension "tds-formatter" is now active!'
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("tds.formatter.4gl", () => {
      vscode.window.showInformationMessage("4GL");
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("tds.formatter.advpl", () => {
      vscode.window.showInformationMessage("AdvPL");
    })
  );

  showBanner();

}

  let firstTime = true;

  function showBanner(force: boolean = false) {
    if (firstTime) {
      firstTime = false;
      //const config = workspace.getConfiguration("totvsLanguageServer");
      const showBanner = true; //config.get("showBanner", true);

      if (showBanner || force) {
        let ext = vscode.extensions.getExtension("TOTVS.tds-vscode");
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
  }

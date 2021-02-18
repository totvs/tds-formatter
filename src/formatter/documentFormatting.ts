import * as vscode from "vscode";
import * as prettier from "prettier";

import {
  DocumentFormattingEditProvider,
  TextDocument,
  FormattingOptions,
  CancellationToken,
  ProviderResult,
  TextEdit,
} from "vscode";
import { getFormattingOptions } from "./formattingOptions";

export class DocumentFormatting implements DocumentFormattingEditProvider {
  private _selector: vscode.DocumentSelector;

  constructor(selector: vscode.DocumentSelector) {
    this._selector = selector;
  }

  get selector(): vscode.DocumentSelector {
    return this._selector;
  }

  provideDocumentRangeFormattingEdits(
    document: vscode.TextDocument,
    range: vscode.Range,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.TextEdit[]> {
    const result: vscode.TextEdit[] = [];

    options = {
      ...options,
      rangeStart: document.offsetAt(range.start),
      rangeEnd: document.offsetAt(range.end),
    };

    const formatted = this.doFormat(document, options);

    if (formatted.length > 0) {
      result.push(
        vscode.TextEdit.replace(
          range,
          formatted.substring(0, formatted.length - 1)
        )
      );
    }

    return result;
  }

  public provideOnTypeFormattingEdits(
    document: vscode.TextDocument,
    position: vscode.Position,
    ch: string,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): Promise<vscode.TextEdit[]> {
    const result: vscode.TextEdit[] = [];
    const line: vscode.TextLine = document.lineAt(position.line);

    if (line.text.trim() !== "") {
      options = {
        ...options,
        rangeStart: document.offsetAt(line.range.start),
        rangeEnd: document.offsetAt(line.range.end),
        //        scope: ch === "\n" ? "line" : "word",
      };

      const formatted = this.doFormat(document, options);

      if (formatted.length > 0 && formatted !== line.text) {
        result.push(
          vscode.TextEdit.replace(
            line.range,
            formatted.substring(0, formatted.length - 1)
          )
        );
      }
    }

    return Promise.resolve(result);
  }

  provideDocumentFormattingEdits(
    document: vscode.TextDocument,
    options: vscode.FormattingOptions,
    token: vscode.CancellationToken
  ): vscode.ProviderResult<vscode.TextEdit[]> {
    const result = [];
    const formatted = this.doFormat(document, options);

    if (formatted.length > 0) {
      const start = document.validatePosition(new vscode.Position(0, 0));
      const end = document.validatePosition(
        new vscode.Position(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY)
      );

      result.push(
        vscode.TextEdit.replace(new vscode.Range(start, end), formatted)
      );
    }

    return result;
  }

  private process(content: string, options: any): any {
    try {
      let result: any = prettier.format(content, options);
      result = result.formatted || result;

      return result ? result.substring(0, result.length - 1) : "";
    } catch (error) {
      console.log(error);
      return content;
    }
  }

  protected doFormat(
    document: vscode.TextDocument,
    options: prettier.Options
  ): string {
    let result: string = document.getText();
    options = {
      ...getFormattingOptions(document.languageId),
      ...options,
      filepath: document.uri.toString()
    };

    if (options.rangeStart) {
      result = result.substring(options.rangeStart, options.rangeEnd);
      options = {
        requirePragma: false,
        insertPragma: false,
        rangeEnd: options.rangeEnd + 1,
      };
    }

    result = this.process(result, options);

    return result as string;
  }
}

// export async function resourceFormatting(
//   resources: string[],
//   documentFormatting: DocumentFormatting
// ) {
//   const targetResources: string[] = resources;

//   if (targetResources.length === 0) {
//     vscode.window.showInformationMessage("Nenhum recurso localizado.");
//   } else {
//     vscode.window.showInformationMessage("Formatação em lote iniciada.");

//     let lc = await vscode.window.withProgress(
//       {
//         location: vscode.ProgressLocation.Notification,
//         title: "Formatting",
//         cancellable: true,
//       },
//       (progress, token) => {
//         let lineCount = 0;

//         token.onCancellationRequested(() => {
//           vscode.window.showWarningMessage("Resource formatting canceled.");
//         });
//         const total = targetResources.length;
//         const increment: number = 100 / total;

//         targetResources.forEach((resource: string, index) => {
//           const uri: vscode.Uri = vscode.Uri.file(resource);

//           vscode.workspace
//             .openTextDocument(uri)
//             .then(async (document: TextDocument) => {
//               if (document.languageId !== "") {
//                 lineCount += document.lineCount;

//                 const providerResult: ProviderResult<
//                   TextEdit[]
//                 > = documentFormatting.provideDocumentFormattingEdits(
//                   document,
//                   {},
//                   token
//                 );
//                 if (Array.isArray(providerResult)) {
//                   progress.report({
//                     increment: increment * index,
//                     message: `${uri.toString(false)} (${index + 1}/${total})`,
//                   });

//                   const wsEdit: vscode.WorkspaceEdit = new vscode.WorkspaceEdit();
//                   wsEdit.set(uri, providerResult);
//                   await vscode.workspace.applyEdit(wsEdit).then(
//                     (value: boolean) => {},
//                     (reason) => {
//                       vscode.window.showErrorMessage(
//                         `Formatting error: ${reason}`
//                       );
//                       console.log(reason);
//                     }
//                   );
//                 }
//               }
//             });
//         });

//         const p = new Promise((resolve) => {
//           setTimeout(() => {
//             resolve(lineCount);
//           }, 5000);
//         });

//         return p;
//       }
//     );
//     vscode.window.showInformationMessage(
//       `Formatting finished. ${lc} lines have been processed in ${targetResources.length} files.`
//     );
//  }
// }

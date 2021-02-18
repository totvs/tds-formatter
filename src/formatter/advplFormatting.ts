import * as vscode from "vscode";
import * as prettier from "prettier";
import { DocumentFormatting } from "./documentFormatting";

class AdvplFormatting extends DocumentFormatting {
  protected doFormat(
    document: vscode.TextDocument,
    options: prettier.Options
  ): string {
    return super.doFormat(document, {
      ...options
    });
  }
}

export function register(): vscode.Disposable {
  const selector: vscode.DocumentSelector = { language: "advpl" };
  const provider = new AdvplFormatting(selector);

  return vscode.Disposable.from(
    vscode.languages.registerOnTypeFormattingEditProvider(
      provider.selector,
      provider,
      " ",
      "\t"
    ),
    vscode.languages.registerDocumentRangeFormattingEditProvider(
      provider.selector,
      provider
    ),
    vscode.languages.registerDocumentFormattingEditProvider(
      provider.selector,
      provider
    )
  );
}

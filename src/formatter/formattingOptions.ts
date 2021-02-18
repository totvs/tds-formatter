import * as vscode from "vscode";
import * as prettier from "prettier";

export function getFormattingOptions(langId: string): any {
  const getValue = (langId: string, key: string, valueDefault: any): any => {
    let cfg = vscode.workspace.getConfiguration(`${langId}.formatter`);
    let value = cfg.get(key);

    if (!value) {
      cfg = vscode.workspace.getConfiguration();
      value = cfg.get(key);
    }

    return value ? value : valueDefault;
  };

  const info: prettier.SupportInfo = prettier.getSupportInfo();
  const languages: any = info.languages.filter((language) => {
    return language.vscodeLanguageIds.includes(langId);
  });

  if (languages && languages.length > 0) {
    const options: any = info.options
      .filter((element) => {
        return element.category.toLowerCase() === langId;
      })
      .map((element) => {
        return { [element.name]: element.default };
      });

    return {
      ...options,
      language: langId,
      parser: languages[0].parsers[0],
      insertSpaces: getValue(langId, "insertSpaces", false),
      tabSize: getValue(langId, "editor.tabSize", 4),
      keywordsCase: getValue(langId, "keywordsCase", "upper"),
      stringStyle: getValue(langId, "stringStyle", "ignore"),
      formatNumber: getValue(langId, "formatNumber", false),
      operatorSpacing: getValue(langId, "operatorSpacing", false),
      //alignFields: false, //EXPERIMENTAL. não habilitar.
    };
  }

  return {};
}

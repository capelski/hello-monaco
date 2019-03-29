import * as monaco from 'monaco-editor';

export const cucumberLanguageId = 'cucumber';
export const cucumberThemeId = 'cucumber-theme';

export const registerCucumberLanguage = () => {
    monaco.languages.register({ id: cucumberLanguageId });

    monaco.languages.setMonarchTokensProvider(cucumberLanguageId, {
        tokenizer: {
            root: [
                [/^Feature:/, 'cucumber-feature'],
                [/^\s{4}Scenario( Outline)?:/, 'cucumber-scenario'],
                [/^\s{4}Examples:/, 'cucumber-examples'],
                [/^\s{8}(Given|When|Then)/, 'cucumber-premise'],
                [/\"\<.*\>\"/, 'cucumber-variable']
            ]
        }
    });

    monaco.editor.defineTheme(cucumberThemeId, {
        base: 'vs',
        colors: {},
        inherit: false,
        rules: [
            { token: 'cucumber-feature', foreground: 'ff0000', fontStyle: 'bold' },
            { token: 'cucumber-scenario', foreground: 'FFA500' },
            { token: 'cucumber-examples', foreground: '008800' },
            { token: 'cucumber-premise', foreground: '008800' },
            { token: 'cucumber-variable', foreground: '008800' },
        ],
    });

    monaco.languages.registerCompletionItemProvider(cucumberLanguageId, {
        provideCompletionItems: () => {
            const suggestions = [
                {
                    label: 'Feature',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'Feature: <Feature description>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                },
                {
                    label: 'Scenario',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'Scenario: <Scenario description>',
                    insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                },
                {
                    label: 'Scenario Outline',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText:
    `    Scenario Outline: <Scenario description>

        Examples:
            | <variable1> | <variable2> |
            | <value1> | <value2> |`,
                },
                {
                    label: 'Given',
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: 'Given'
                },
                {
                    label: 'When',
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: 'When'
                },
                {
                    label: 'Then',
                    kind: monaco.languages.CompletionItemKind.Text,
                    insertText: 'Then'
                }
                // TODO Import sentences from cucumber step files
            ];
            return { suggestions };
        }
    });
}
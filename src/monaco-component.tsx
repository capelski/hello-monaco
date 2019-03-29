import * as React from 'react';
import * as monaco from 'monaco-editor';
import { registerCucumberLanguage, cucumberThemeId, cucumberLanguageId } from './monaco-cucumber-language';

registerCucumberLanguage();

const cucumberExample = 
`Feature: Is it Friday yet?
    Everybody wants to know when it's Friday
    
    Scenario: Wether Sunday is Friday
        Given today is "Sunday"
        When I ask whether today is Friday or not
        Then I should be told "Nope"
    
    Scenario Outline: Whether today is Friday or not
        Given today is "<day>"
        When I ask whether today is Friday or not
        Then I should be told "<answer>"
    
    Examples:
        | day | answer |
        | Monday | Nope |
        | Tuesday | Nope |
        | Wednesday | Nope |
        | Thursday | Nope |
        | Friday | TGIF |
        | Saturday | Nope |
        | Sunday | Nope |
        | random value | Nope |`;

export class MonacoComponent extends React.Component {
    private editorContainer: React.RefObject<HTMLDivElement>;

    constructor(props: {}) {
        super(props);
        this.editorContainer = React.createRef();
    }

    componentDidMount() {
        monaco.editor.create(this.editorContainer.current, {
        	theme: cucumberThemeId,
            value: cucumberExample,
            language: cucumberLanguageId,
            autoIndent: true,
            contextmenu: false,
            automaticLayout: true,
            minimap: { enabled: false },
            renderLineHighlight: 'none',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
        });
    }

    render() {
        return (
            <div ref={this.editorContainer} style={{
                width: '800px',
                height: '600px',
                border: '1px solid #ccc'
            }}>
            </div>);
    }
}
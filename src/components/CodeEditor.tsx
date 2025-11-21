import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { EditorView } from "@codemirror/view";
import { oneDark } from "@codemirror/theme-one-dark";
import { basicLight } from "@uiw/codemirror-theme-basic";
import { CodeXmlIcon, HashIcon, BracesIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language: "javascript" | "html" | "css";
  className?: string;
  placeholder?: string;
  theme: "light" | "dark" | "system";
}

export default function CodeEditor(props: CodeEditorProps) {
  const { value, onChange, language, className, placeholder, theme } = props;

  const defaultPlaceholder = getPlaceholder(language);
  const languageExtension = getLanguageExtension(language);

  return (
    <Accordion
      type="single"
      className="w-full border-2 border-border px-2 py-0 rounded-lg"
      defaultValue={language}
      collapsible
    >
      <AccordionItem value={language} className="border-none">
        <AccordionTrigger className="hover:no-underline">
          <div className="flex items-center gap-2 cursor-pointer">
            {language === "html" ? (
              <CodeXmlIcon className="size-4 text-orange-500" />
            ) : language === "css" ? (
              <HashIcon className="size-4 text-blue-500" />
            ) : (
              <BracesIcon className="size-4 text-yellow-500" />
            )}
            <span className="text-sm font-medium text-muted-foreground">
              {language.toUpperCase()}
            </span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <CodeMirror
            value={value}
            height="100%"
            minHeight="200px"
            onChange={onChange}
            className={cn("w-full cursor-pointer", className)}
            placeholder={placeholder || defaultPlaceholder}
            extensions={[languageExtension, EditorView.lineWrapping]}
            theme={
              theme === "dark"
                ? oneDark
                : theme === "light"
                  ? basicLight
                  : oneDark
            }
            basicSetup={{
              lineNumbers: true,
              foldGutter: true,
              highlightActiveLine: true,
              highlightSpecialChars: true,
              drawSelection: true,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: true,
              syntaxHighlighting: true,
              autocompletion: true,
              bracketMatching: true,
              closeBrackets: true,
              highlightSelectionMatches: false,
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

const getPlaceholder = (language: "javascript" | "html" | "css"): string => {
  switch (language) {
    case "javascript":
      return "// Write your JavaScript code here";
    case "html":
      return "<!-- Write your HTML code here -->";
    case "css":
      return "/* Write your CSS code here */";
  }
};

const getLanguageExtension = (language: "javascript" | "html" | "css") => {
  switch (language) {
    case "javascript":
      return javascript();
    case "html":
      return html();
    case "css":
      return css();
  }
};

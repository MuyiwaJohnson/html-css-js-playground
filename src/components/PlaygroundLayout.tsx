import Footer from "./Footer";
import Toolbar from "./Toolbar";
import CodeEditor from "./CodeEditor";
import { useTheme } from "@/contexts/ThemeContext";
import PreviewPane from "./PreviewPane";
import ConsolePane from "./ConsolePane";
import type { ConsoleLog } from "@/App";

interface PlaygroundLayoutProps {
  html: string;
  css: string;
  js: string;
  onHtmlChange: (value: string) => void;
  onCssChange: (value: string) => void;
  onJsChange: (value: string) => void;
  consoleLogs: ConsoleLog[];
  onConsoleClear: () => void;
  onFormat: () => void;
  onRun: () => void;
  onClear: () => void;
  onReset: () => void;
}

export default function PlaygroundLayout({
  html,
  css,
  js,
  onHtmlChange,
  onCssChange,
  onJsChange,
  consoleLogs,
  onConsoleClear,
  onFormat,
  onRun,
  onClear,
  onReset,
}: PlaygroundLayoutProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col h-screen w-full p-4 gap-4">
      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 gap-4 overflow-hidden">
        {/* Editor Panel */}
        <section className="w-full md:w-[45%] flex flex-col gap-4 min-h-0">
          <Toolbar
            onFormat={onFormat}
            onRun={onRun}
            onClear={onClear}
            onReset={onReset}
          />

          <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
            <CodeEditor
              value={html}
              onChange={onHtmlChange}
              language="html"
              theme={theme}
            />
            <CodeEditor
              value={css}
              onChange={onCssChange}
              language="css"
              theme={theme}
            />
            <CodeEditor
              value={js}
              onChange={onJsChange}
              language="javascript"
              theme={theme}
            />
          </div>
        </section>

        {/* Output Panel */}
        <section className="w-full md:w-[55%] flex flex-col gap-4 min-h-0 border rounded-lg">
          <div className="h-[70%] min-h-0">
            <PreviewPane
              html={html}
              css={css}
              js={js}
              onConsoleMessage={(log) => console.log(log)}
            />
          </div>

          <div className="h-[30%] min-h-0">
            <ConsolePane logs={consoleLogs} onClear={onConsoleClear} />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

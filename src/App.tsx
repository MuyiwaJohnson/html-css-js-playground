import Header from "@/components/Header";
import PlaygroundLayout from "@/components/PlaygroundLayout";
import { useEffect, useState } from "react";
import { formatCode } from "@/lib/formatter";
import { useDebounce } from "@/hooks/useDebounce";
import { defaultHTML, defaultCSS, defaultJS } from "@/lib/utils";

export interface ConsoleLog {
  type: "log" | "error" | "warn" | "info";
  args: string[];
  id: number;
}

function App() {
  const [html, setHtml] = useState(defaultHTML);
  const [css, setCss] = useState(defaultCSS);
  const [js, setJs] = useState(defaultJS);
  const [consoleLogs, setConsoleLogs] = useState<ConsoleLog[]>([]);
  const [logIdCounter, setLogIdCounter] = useState(0);

  const debouncedHtml = useDebounce(html, 300);
  const debouncedCss = useDebounce(css, 300);
  const debouncedJs = useDebounce(js, 300);

  // listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "console" && event.data.log) {
        setConsoleLogs((prev) => [
          ...prev,
          { ...event.data.log, id: logIdCounter },
        ]);
        setLogIdCounter((prev) => prev + 1);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [logIdCounter]);

  const handleFormat = async () => {
    try {
      const [formattedHtml, formattedCss, formattedJs] = await Promise.all([
        formatCode(html, "html"),
        formatCode(css, "css"),
        formatCode(js, "javascript"),
      ]);
      setHtml(formattedHtml);
      setCss(formattedCss);
      setJs(formattedJs);
    } catch (error) {
      console.error("Formatting error:", error);
    }
  };

  const handleClear = () => {
    setHtml("");
    setCss("");
    setJs("");
    setConsoleLogs([]);
  };

  const handleReset = () => {
    setHtml(defaultHTML);
    setCss(defaultCSS);
    setJs(defaultJS);
    setConsoleLogs([]);
  };

  const handleConsoleClear = () => {
    setConsoleLogs([]);
  };

  return (
    <div>
      <div className="text-center p-4 bg-gray-100 dark:bg-slate-800 dark:text-white">
        <p className="text-sm">
          Write HTML, CSS, and JavaScript code to build your own web page.
        </p>
      </div>
      <Header />
      <PlaygroundLayout
        html={debouncedHtml}
        css={debouncedCss}
        js={debouncedJs}
        onHtmlChange={setHtml}
        onCssChange={setCss}
        onJsChange={setJs}
        consoleLogs={consoleLogs}
        onConsoleClear={handleConsoleClear}
        onFormat={handleFormat}
        onRun={() => {}}
        onClear={handleClear}
        onReset={handleReset}
      />
    </div>
  );
}

export default App;

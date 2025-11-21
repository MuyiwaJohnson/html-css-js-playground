import { useRef, useEffect, useCallback } from "react";

interface PreviewPaneProps {
  html: string;
  css: string;
  js: string;
  onConsoleMessage: (log: ConsoleLog) => void;
}

interface ConsoleLog {
  type: "log" | "error" | "warn" | "info";
  args: string[];
}

const getConsoleInterceptorScript = (): string => {
  return `
(function() {
  // Store original console methods
  const original = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info
  };

  // Send console message to parent window (expose globally)
  window.sendConsoleMessage = function(type, args) {
    window.parent.postMessage({
      type: 'console',
      log: {
        type: type,
        args: args.map(arg => {
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch {
              return String(arg);
            }
          }
          return String(arg);
        })
      }
    }, '*');
  };

  // Override console methods
  ['log', 'error', 'warn', 'info'].forEach(method => {
    console[method] = function(...args) {
      original[method](...args);
      window.sendConsoleMessage(method, args);
    };
  });

  // Catch runtime errors
  window.addEventListener('error', (e) => {
    window.sendConsoleMessage('error', [
      \`Error: \${e.message}\`,
      \`File: \${e.filename}\`,
      \`Line: \${e.lineno}\`
    ]);
  });

  // Catch unhandled promise rejections
  window.addEventListener('unhandledrejection', (e) => {
    window.sendConsoleMessage('error', [\`Unhandled Promise Rejection: \${e.reason}\`]);
  });
})();
  `.trim();
};

export default function PreviewPane({
  html,
  css,
  js,
  onConsoleMessage,
}: PreviewPaneProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const generatePreviewHTML = useCallback((): string => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { 
      margin: 0; 
      padding: 0; 
      box-sizing: border-box; 
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }
    ${css}
  </style>
</head>
<body>
  ${html}
  <script>
    ${getConsoleInterceptorScript()}
    
    try {
      ${js}
    } catch (error) {
      if (window.sendConsoleMessage) {
        window.sendConsoleMessage('error', [error.message]);
      }
    }
  </script>
</body>
</html>`.trim();
  }, [html, css, js]);

  // Update iframe content when code changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    iframe.srcdoc = generatePreviewHTML();
  }, [generatePreviewHTML]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "console" && event.data.log) {
        onConsoleMessage(event.data.log);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onConsoleMessage]);

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex-1 overflow-auto">
        <iframe
          ref={iframeRef}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin"
          title="Code Preview"
        />
      </div>
    </div>
  );
}

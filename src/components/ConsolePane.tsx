import { Button } from "./ui/button";

interface ConsoleLog {
  type: "log" | "error" | "warn" | "info";
  args: string[];
  id: number;
}

interface ConsolePanelProps {
  logs: ConsoleLog[];
  onClear: () => void;
}

export default function ConsolePane({ logs, onClear }: ConsolePanelProps) {

  const getLogColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-400 dark:text-red-500";
      case "warn":
        return "text-yellow-400 dark:text-yellow-500";
      case "info":
        return "text-blue-400 dark:text-blue-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getLogPrefix = (type: string) => {
    switch (type) {
      case "error":
        return "❌";
      case "warn":
        return "⚠️";
      case "info":
        return "ℹ️";
      default:
        return "📝";
    }
  };

  return (
    <div className="flex flex-col h-full bg-primary/10 border-t border-editor-border">
      <div className="flex items-center justify-between px-4 py-2 border-b border-editor-border">
        <span className="text-sm font-medium text-muted-foreground">
          Console {logs.length > 0 && `(${logs.length})`}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClear}
          disabled={logs.length === 0}
        >
          Clear
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
        {logs.length === 0 ? (
          <div className="text-muted-foreground italic">No console output</div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={`mb-2 wrap-break-word ${getLogColor(log.type)}`}
            >
              <span className="mr-2 select-none">{getLogPrefix(log.type)}</span>
              {log.args.map((arg, index) => (
                <span
                  key={index}
                  className="whitespace-pre-wrap wrap-break-word"
                >
                  {arg}
                  {index < log.args.length - 1 ? " " : ""}
                </span>
              ))}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

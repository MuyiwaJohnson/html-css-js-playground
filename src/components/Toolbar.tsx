import { Button } from "./ui/button";

interface ToolbarItem {
  onFormat: () => void;
  onRun: () => void;
  onClear: () => void;
  onReset: () => void;
}

interface ToolbarButton {
  label: string;
  onClick: () => void;
}

export default function Toolbar(props: ToolbarItem) {
  const { onFormat, onRun, onClear, onReset } = props;

  const toolbarButtons: ToolbarButton[] = [
    {
      label: "Format",
      onClick: onFormat,
    },
    {
      label: "Run",
      onClick: onRun,
    },
    {
      label: "Clear",
      onClick: onClear,
    },
    {
      label: "Reset",
      onClick: onReset,
    },
  ];

  return (
    <div>
      <div className="flex flex-row justify-between items-center border-2 border-gray-200 dark:border-gray-800 rounded-md p-2">
        <h2 className="text-lg font-bold">Playground</h2>
        <div className="flex flex-row gap-4 items-center">
          {toolbarButtons.map((button) => (
            <Button
              variant="ghost"
              className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              size="sm"
              key={button.label}
              onClick={button.onClick}
            >
              {button.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

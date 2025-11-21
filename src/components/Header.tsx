import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <div className="header flex flex-row justify-between gap-x-8 items-center md:px-6 lg:px-12 w-full py-2 dark:bg-primary-900 dark:text-gray-100 border-2 border-r-0  border-l-0 border-gray-200 dark:border-gray-700">
      <div className="flex w-full flex-row justify-between gap-x-8 items-center px-6">
        <h1 className="text-md">Web Playground</h1>
        <ThemeToggle />
      </div>
    </div>
  );
}

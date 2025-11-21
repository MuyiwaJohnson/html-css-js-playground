export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-3 px-4">
      <div className="flex items-center justify-center text-sm text-muted-foreground">
        <p>© {currentYear} Web Playground</p>
      </div>
    </footer>
  );
}

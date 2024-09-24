export function Footer() {
  return (
    <footer className="footer bg-gray-100 text-neutral-content items-center p-4 w-full">
      <aside className="grid-flow-col items-center">
        <p>Copyright © {new Date().getFullYear()} - feito por Rafael N</p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end"></nav>
    </footer>
  );
}

import Link from "next/link";

const links = [
  ["Home", "/"],
  ["Search", "/search"],
  ["About", "/about"],
  ["GitHub", "https://github.com"],
];

export function Footer() {
  return (
    <footer className="px-5 py-10 text-sm text-secondary sm:px-8 lg:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 border-t border-border pt-8 sm:flex-row">
        <p>Voyager. City-powered GitHub rankings.</p>
        <div className="flex flex-wrap gap-4">
          {links.map(([label, href]) =>
            href.startsWith("http") ? (
              <a key={label} href={href} target="_blank" rel="noreferrer" className="hover:text-primary">
                {label}
              </a>
            ) : (
              <Link key={label} href={href} className="hover:text-primary">
                {label}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}

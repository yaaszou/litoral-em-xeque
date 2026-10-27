import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Waves } from "lucide-react";
import { Button } from "@/components/ui/button";

const nav = [
  { to: "/quem-somos", label: "Quem somos" },
  { to: "/entenda-o-problema", label: "Entenda o problema" },
  { to: "/greenwashing", label: "Desmascare o greenwashing" },
  { to: "/acoes", label: "Ações e projetos" },
] as const;

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 font-display text-lg font-extrabold">
      <span className="grid size-9 place-items-center rounded-full bg-mar text-primary-foreground">
        <Waves className="size-5" />
      </span>
      <span>
        Litoral em <span className="text-mata">Xeque</span>
      </span>
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-semibold text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary" }}
            >
              {n.label}
            </Link>
          ))}
          <Button asChild variant="mar">
            <Link to="/participe">Participe</Link>
          </Button>
        </nav>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Abrir menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-1 border-t border-border px-4 py-3 lg:hidden">
          {[...nav, { to: "/participe", label: "Participe" } as const].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 font-semibold hover:bg-muted"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-tinta text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-extrabold">Litoral em Xeque</p>
          <p className="mt-2 text-sm opacity-75">Informação, consciência e ação pelo nosso litoral.</p>
        </div>
        <div className="flex flex-col gap-2 text-sm">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} className="opacity-80 hover:opacity-100">
              {n.label}
            </Link>
          ))}
          <Link to="/participe" className="opacity-80 hover:opacity-100">Participe</Link>
        </div>
        <p className="text-sm opacity-75">
          Projeto educativo para a gincana da ETEC. Todas as afirmações factuais trazem fontes — se
          encontrar um erro, fale com a gente.
        </p>
      </div>
    </footer>
  );
}

export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="bg-mar text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <p className="eyebrow text-areia">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-extrabold md:text-6xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg opacity-90">{text}</p>
      </div>
    </section>
  );
}

export function Sources({ items }: { items: { label: string; url: string }[] }) {
  return (
    <div className="rounded-2xl border border-border bg-muted p-5 text-sm">
      <p className="eyebrow text-mata">Fontes confiáveis</p>
      <ul className="mt-2 space-y-1">
        {items.map((s) => (
          <li key={s.url}>
            <a href={s.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2">
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

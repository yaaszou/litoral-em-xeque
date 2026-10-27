import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Trash2, Leaf, ThermometerSun, Users, SearchCheck, ShieldCheck, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero from "@/assets/hero.jpg";
import mutirao from "@/assets/mutirao.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Litoral em Xeque — Nem tudo que é verde é sustentável" },
      { name: "description", content: "ONG que conscientiza sobre poluição marinha, greenwashing e desinformação climática no litoral paulista." },
      { property: "og:title", content: "Litoral em Xeque — Nem tudo que é verde é sustentável" },
      { property: "og:description", content: "Informação, consciência e ação pelo litoral paulista." },
    ],
  }),
  component: Index,
});

const temas = [
  { icon: Trash2, title: "Poluição marinha", text: "Os impactos do lixo e dos resíduos nos ecossistemas.", to: "/entenda-o-problema", color: "bg-ocean" },
  { icon: Leaf, title: "Greenwashing", text: "Como identificar promessas ambientais enganosas.", to: "/greenwashing", color: "bg-mata" },
  { icon: ThermometerSun, title: "Crise climática", text: "Entenda os riscos e as evidências científicas.", to: "/entenda-o-problema", color: "bg-alerta" },
  { icon: Users, title: "Ação coletiva", text: "Descubra como fazer parte da mudança.", to: "/participe", color: "bg-lagoa" },
] as const;

function Index() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Praia do litoral paulista com Mata Atlântica" width={1600} height={1008} className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-hero-overlay" />
        <div className="mx-auto flex min-h-[85vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-32 text-primary-foreground">
          <p className="eyebrow text-areia">Nosso litoral. Nossa responsabilidade.</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-extrabold leading-[0.95] md:text-8xl">
            Nem tudo que é <span className="text-lagoa">verde</span> é sustentável.
          </h1>
          <p className="mt-6 max-w-xl text-lg opacity-90 md:text-xl">
            Informação é a nossa ferramenta para questionar, conscientizar e proteger o litoral paulista.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="hero" size="xl">
              <Link to="/quem-somos">Conheça a nossa causa <ArrowRight /></Link>
            </Button>
            <Button asChild variant="mar" size="xl">
              <Link to="/greenwashing">Teste seus conhecimentos</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="eyebrow text-mata">Consciência ambiental em ação</p>
        <h2 className="mt-2 text-4xl font-extrabold md:text-5xl">O que está em jogo?</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {temas.map((t) => (
            <Link key={t.title} to={t.to} className="group rounded-3xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:shadow-card">
              <span className={`grid size-12 place-items-center rounded-2xl ${t.color} text-primary-foreground`}>
                <t.icon />
              </span>
              <h3 className="mt-5 text-xl font-bold">{t.title}</h3>
              <p className="mt-2 text-muted-foreground">{t.text}</p>
              <ArrowRight className="mt-4 text-primary transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-areia">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 md:grid-cols-2">
          <div>
            <p className="eyebrow text-ocean">Como agimos</p>
            <h2 className="mt-2 text-4xl font-extrabold">Não basta apontar o erro. Ensinamos a checar.</h2>
            <ul className="mt-8 space-y-5">
              {[
                { i: SearchCheck, t: "Reconhecer", d: "Identificar desinformação e propaganda verde enganosa." },
                { i: ShieldCheck, t: "Verificar", d: "Buscar dados, certificações e fontes científicas." },
                { i: Megaphone, t: "Agir", d: "Mutirões, palestras e campanhas com a comunidade." },
              ].map((x) => (
                <li key={x.t} className="flex gap-4">
                  <x.i className="mt-1 size-6 shrink-0 text-mata" />
                  <div>
                    <p className="font-bold">{x.t}</p>
                    <p className="text-muted-foreground">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Button asChild variant="mata" size="xl" className="mt-8">
              <Link to="/participe">Participe</Link>
            </Button>
          </div>
          <img src={mutirao} alt="Voluntários em mutirão de limpeza de praia" loading="lazy" width={1200} height={912} className="rounded-3xl shadow-card" />
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Heart } from "lucide-react";
import { PageHero } from "@/components/site-layout";
import mangue from "@/assets/mangue.jpg";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem somos — Litoral em Xeque" },
      { name: "description", content: "Origem, missão, visão, valores e equipe da ONG Litoral em Xeque." },
      { property: "og:title", content: "Quem somos — Litoral em Xeque" },
      { property: "og:description", content: "Conheça a história e os princípios da ONG Litoral em Xeque." },
    ],
  }),
  component: QuemSomos,
});

const equipe = ["Coordenação geral", "Pesquisa e checagem", "Comunicação", "Educação ambiental"];

function QuemSomos() {
  return (
    <>
      <PageHero eyebrow="Quem somos" title="Jovens que colocam o litoral em xeque." text="Nascemos da inquietação de estudantes que viam o litoral mudar — e as propagandas dizendo que estava tudo bem." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold">Nossa história</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            O Litoral em Xeque surgiu como projeto estudantil na ETEC, a partir de conversas sobre lixo nas praias,
            avanço do mar e campanhas "eco" que não se sustentavam. A ideia: transformar curiosidade em checagem,
            e checagem em ação comunitária no litoral paulista — com possibilidade de expansão.
          </p>
        </div>
        <img src={mangue} alt="Manguezal do litoral paulista" loading="lazy" width={1200} height={912} className="rounded-3xl shadow-card" />
      </section>
      <section className="mx-auto grid max-w-6xl gap-5 px-4 pb-16 md:grid-cols-3">
        {[
          { i: Target, t: "Missão", d: "Conscientizar a população sobre problemas ambientais, identificar greenwashing e combater a desinformação climática." },
          { i: Eye, t: "Visão", d: "Um litoral onde cada pessoa sabe questionar, verificar e agir pelo meio ambiente." },
          { i: Heart, t: "Valores", d: "Ciência, transparência, respeito às comunidades locais e acusações apenas com evidências." },
        ].map((x) => (
          <div key={x.t} className="rounded-3xl bg-card p-7 shadow-card">
            <x.i className="size-8 text-ocean" />
            <h3 className="mt-4 text-2xl font-bold">{x.t}</h3>
            <p className="mt-2 text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </section>
      <section className="bg-areia">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-3xl font-extrabold">Equipe responsável</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {equipe.map((e) => (
              <div key={e} className="rounded-2xl bg-card p-6">
                <div className="size-14 rounded-full bg-mar" />
                <p className="mt-4 font-bold">{e}</p>
                <p className="text-sm text-muted-foreground">Estudantes da ETEC</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

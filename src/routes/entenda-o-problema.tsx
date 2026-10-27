import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X } from "lucide-react";
import { PageHero, Sources } from "@/components/site-layout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/entenda-o-problema")({
  head: () => ({
    meta: [
      { title: "Entenda o problema — Litoral em Xeque" },
      { name: "description", content: "Mudanças climáticas, poluição marinha, degradação ambiental e greenwashing explicados com dados e fontes." },
      { property: "og:title", content: "Entenda o problema — Litoral em Xeque" },
      { property: "og:description", content: "Dados, mitos e verdades sobre o litoral e o clima." },
    ],
  }),
  component: Entenda,
});

const artigos = [
  { t: "Poluição marinha", d: "Plásticos se fragmentam em microplásticos que entram na cadeia alimentar de peixes, aves e pessoas. Grande parte do lixo do mar vem de terra firme, via rios e esgoto." },
  { t: "Mudanças climáticas", d: "O aquecimento global eleva o nível do mar e intensifica ressacas — o que acelera a erosão costeira em praias do litoral paulista." },
  { t: "Degradação ambiental", d: "Ocupação desordenada, aterros em manguezais e esgoto sem tratamento ameaçam berçários da vida marinha." },
  { t: "Greenwashing", d: "Quando empresas ou governos usam discurso 'verde' sem provas, confundem o consumidor e atrasam mudanças reais." },
];

const dados = [
  { n: "1,1 °C", l: "aquecimento global médio já registrado em relação ao período pré-industrial (IPCC, 2023)" },
  { n: "~80%", l: "do lixo no mar tem origem em terra firme (estimativa citada pelo PNUMA)" },
  { n: "Mata Atlântica", l: "bioma do litoral paulista, um dos mais ameaçados do país (SOS Mata Atlântica)" },
];

const mitos = [
  { a: "Plástico biodegradável some rápido no mar.", fato: false, e: "Muitos só se degradam em compostagem industrial; no mar podem durar anos." },
  { a: "O nível do mar está subindo.", fato: true, e: "Medições por satélite e marégrafos mostram elevação contínua, segundo o IPCC e a NASA." },
  { a: "Uma única pessoa não faz diferença.", fato: false, e: "Ações individuais somadas e cobranças coletivas influenciam políticas públicas e empresas." },
  { a: "Manguezais ajudam a proteger a costa.", fato: true, e: "Eles amortecem ondas, retêm sedimentos e armazenam muito carbono." },
];

function MitoCard({ m }: { m: (typeof mitos)[number] }) {
  const [resp, setResp] = useState<boolean | null>(null);
  const acertou = resp === m.fato;
  return (
    <div className="rounded-3xl border border-border bg-card p-6">
      <p className="text-lg font-bold">"{m.a}"</p>
      {resp === null ? (
        <div className="mt-4 flex gap-2">
          <Button variant="mata" onClick={() => setResp(false)}>Mito</Button>
          <Button variant="mar" onClick={() => setResp(true)}>Fato</Button>
        </div>
      ) : (
        <div className="mt-4">
          <p className={`flex items-center gap-2 font-bold ${acertou ? "text-mata" : "text-destructive"}`}>
            {acertou ? <Check /> : <X />} {acertou ? "Acertou!" : "Não foi dessa vez."} É {m.fato ? "FATO" : "MITO"}.
          </p>
          <p className="mt-1 text-muted-foreground">{m.e}</p>
        </div>
      )}
    </div>
  );
}

function Entenda() {
  return (
    <>
      <PageHero eyebrow="Entenda o problema" title="Os dados por trás das ondas." text="Conteúdo educativo com fontes, para você formar a própria opinião." />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-5 md:grid-cols-3">
          {dados.map((d) => (
            <div key={d.n} className="rounded-3xl bg-mar p-7 text-primary-foreground">
              <p className="font-display text-4xl font-extrabold">{d.n}</p>
              <p className="mt-2 opacity-90">{d.l}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {artigos.map((a) => (
            <article key={a.t} className="rounded-3xl border border-border bg-card p-7">
              <h2 className="text-2xl font-bold">{a.t}</h2>
              <p className="mt-2 text-muted-foreground">{a.d}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-areia">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="eyebrow text-ocean">Interativo</p>
          <h2 className="mt-2 text-4xl font-extrabold">Mito ou fato?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {mitos.map((m) => <MitoCard key={m.a} m={m} />)}
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Sources items={[
          { label: "IPCC — Sexto Relatório de Avaliação (AR6)", url: "https://www.ipcc.ch/report/ar6/syr/" },
          { label: "PNUMA — Poluição por plásticos", url: "https://www.unep.org/plastic-pollution" },
          { label: "NASA — Nível do mar", url: "https://sealevel.nasa.gov/" },
          { label: "SOS Mata Atlântica", url: "https://www.sosma.org.br/" },
        ]} />
      </section>
    </>
  );
}

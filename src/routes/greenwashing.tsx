import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Radar, RotateCcw } from "lucide-react";
import { PageHero, Sources } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/greenwashing")({
  head: () => ({
    meta: [
      { title: "Desmascare o greenwashing — Litoral em Xeque" },
      { name: "description", content: "Aprenda a reconhecer propaganda ambiental enganosa com exemplos, o Radar do greenwashing e um quiz." },
      { property: "og:title", content: "Desmascare o greenwashing — Litoral em Xeque" },
      { property: "og:description", content: "Checklist e quiz para avaliar alegações de sustentabilidade." },
    ],
  }),
  component: Greenwashing,
});

const exemplos = [
  { t: "Termos vagos", d: "“Eco”, “natural”, “amigo do planeta” sem explicar o quê, como e quanto." },
  { t: "Selos inventados", d: "Folhinhas e selos criados pela própria marca, sem certificadora independente." },
  { t: "Troca oculta", d: "Destacar um atributo verde pequeno para esconder impactos maiores." },
  { t: "Imagens que enganam", d: "Embalagens com florestas e mar que nada têm a ver com o produto." },
];

const radar = [
  "Apresenta dados específicos (números, porcentagens, período)?",
  "Tem certificação de entidade independente e verificável?",
  "Explica todo o ciclo do produto, não só uma parte?",
  "Evita termos vagos como “eco” ou “sustentável” sem explicação?",
  "Disponibiliza relatório ou fonte pública para conferir?",
  "A imagem da propaganda condiz com o produto real?",
];

const quiz = [
  { q: "Uma garrafa diz “100% eco” sem mais explicações. Isso é:", o: ["Prova de sustentabilidade", "Um sinal de alerta de greenwashing", "Uma certificação oficial"], c: 1, e: "Termos vagos sem dados são um dos sinais mais comuns de greenwashing." },
  { q: "Qual é a melhor forma de checar um selo ambiental?", o: ["Confiar na embalagem", "Procurar a certificadora independente e o registro do produto", "Ver se o selo é verde"], c: 1, e: "Selos confiáveis têm critérios públicos e podem ser consultados." },
  { q: "Uma empresa planta 100 árvores e polui um rio. Destacar só as árvores é:", o: ["Troca oculta", "Compensação justa", "Transparência"], c: 0, e: "Destacar um benefício pequeno para esconder um impacto maior é greenwashing." },
  { q: "O que mais ajuda contra a desinformação climática?", o: ["Compartilhar rápido", "Checar fontes científicas antes de compartilhar", "Acreditar em quem fala mais alto"], c: 1, e: "Checar a fonte é o primeiro passo para não espalhar desinformação." },
];

function Quiz() {
  const [i, setI] = useState(0);
  const [pts, setPts] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const done = i >= quiz.length;
  if (done)
    return (
      <div className="rounded-3xl bg-card p-8 text-center shadow-card">
        <p className="eyebrow text-mata">Resultado</p>
        <p className="mt-2 font-display text-6xl font-extrabold text-ocean">{pts}/{quiz.length}</p>
        <p className="mt-2 text-muted-foreground">{pts === quiz.length ? "Detetive ambiental nível máximo!" : "Bom começo — revise o Radar e tente de novo."}</p>
        <Button className="mt-6" variant="mar" onClick={() => { setI(0); setPts(0); setSel(null); }}><RotateCcw /> Refazer</Button>
      </div>
    );
  const q = quiz[i]!;
  return (
    <div className="rounded-3xl bg-card p-8 shadow-card">
      <p className="text-sm font-semibold text-muted-foreground">Pergunta {i + 1} de {quiz.length} · {pts} pontos</p>
      <p className="mt-3 text-xl font-bold">{q.q}</p>
      <div className="mt-5 grid gap-2">
        {q.o.map((o, idx) => {
          const state = sel === null ? "border-border hover:border-primary" : idx === q.c ? "border-mata bg-mata/10" : idx === sel ? "border-destructive bg-destructive/10" : "border-border opacity-60";
          return (
            <button key={o} disabled={sel !== null} onClick={() => { setSel(idx); if (idx === q.c) setPts(pts + 1); }} className={`rounded-xl border-2 p-4 text-left font-medium transition ${state}`}>
              {o}
            </button>
          );
        })}
      </div>
      {sel !== null && (
        <div className="mt-5">
          <p className="text-muted-foreground">{q.e}</p>
          <Button className="mt-4" variant="mar" onClick={() => { setI(i + 1); setSel(null); }}>Próxima</Button>
        </div>
      )}
    </div>
  );
}

function RadarCheck() {
  const [checked, setChecked] = useState<boolean[]>(radar.map(() => false));
  const score = checked.filter(Boolean).length;
  const verdict = score >= 5 ? { t: "Alegação bem sustentada", c: "text-mata" } : score >= 3 ? { t: "Fique atento: faltam evidências", c: "text-alerta" } : { t: "Alto risco de greenwashing", c: "text-destructive" };
  return (
    <div className="rounded-3xl bg-card p-8 shadow-card">
      <div className="flex items-center gap-3"><Radar className="size-8 text-ocean" /><h3 className="text-2xl font-bold">Radar do greenwashing</h3></div>
      <p className="mt-2 text-muted-foreground">Escolha uma propaganda e marque o que ela cumpre.</p>
      <ul className="mt-5 space-y-3">
        {radar.map((r, idx) => (
          <li key={r}>
            <label className="flex cursor-pointer items-start gap-3">
              <Checkbox checked={!!checked[idx]} onCheckedChange={(v) => setChecked(checked.map((c, j) => (j === idx ? !!v : c)))} className="mt-0.5" />
              <span>{r}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-6 h-3 overflow-hidden rounded-full bg-muted"><div className="h-full bg-mar transition-all" style={{ width: `${(score / radar.length) * 100}%` }} /></div>
      <p className={`mt-3 font-bold ${verdict.c}`}>{score}/{radar.length} — {verdict.t}</p>
    </div>
  );
}

function Greenwashing() {
  return (
    <>
      <PageHero eyebrow="Desmascare o greenwashing" title="Verde na embalagem. E na prática?" text="Aprenda a avaliar alegações de sustentabilidade antes de acreditar — ou de compartilhar." />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-extrabold">Sinais de alerta</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {exemplos.map((e) => (
            <div key={e.t} className="rounded-3xl border-2 border-mata/30 bg-card p-6">
              <h3 className="text-xl font-bold text-mata">{e.t}</h3>
              <p className="mt-2 text-muted-foreground">{e.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="bg-areia">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2">
          <RadarCheck />
          <div>
            <p className="eyebrow text-ocean">Quiz ambiental</p>
            <h2 className="mb-6 mt-2 text-3xl font-extrabold">Teste seus conhecimentos</h2>
            <Quiz />
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Sources items={[
          { label: "CONAR — Código de Autorregulamentação (Anexo U: apelos de sustentabilidade)", url: "http://www.conar.org.br/" },
          { label: "Idec — Greenwashing", url: "https://idec.org.br/" },
          { label: "ONU — Greenwashing: o que é", url: "https://www.un.org/en/climatechange/science/climate-issues/greenwashing" },
        ]} />
      </section>
    </>
  );
}

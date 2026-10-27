import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, MapPin, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import mutirao from "@/assets/mutirao.jpg";
import mangue from "@/assets/mangue.jpg";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/acoes")({
  head: () => ({
    meta: [
      { title: "Ações e projetos — Litoral em Xeque" },
      { name: "description", content: "Calendário de mutirões, palestras e campanhas, mapa de problemas ambientais e mural de atitudes sustentáveis." },
      { property: "og:title", content: "Ações e projetos — Litoral em Xeque" },
      { property: "og:description", content: "Participe de mutirões, palestras e campanhas no litoral paulista." },
    ],
  }),
  component: Acoes,
});

const agenda = [
  { d: "08 NOV", t: "Mutirão de limpeza", l: "Praia do Gonzaga, Santos" },
  { d: "14 NOV", t: "Palestra: greenwashing na prática", l: "ETEC — auditório" },
  { d: "22 NOV", t: "Oficina de checagem de fatos", l: "Online" },
  { d: "05 DEZ", t: "Plantio no manguezal", l: "Cubatão" },
];

const pontos = [
  { x: 22, y: 30, local: "Ubatuba — foz de rio", tipo: "Descarte irregular", ok: true },
  { x: 40, y: 45, local: "Caraguatatuba — orla", tipo: "Acúmulo de plástico", ok: true },
  { x: 58, y: 58, local: "Guarujá — costão", tipo: "Esgoto a céu aberto", ok: false },
  { x: 70, y: 66, local: "Santos — canal 4", tipo: "Lixo flutuante", ok: true },
  { x: 86, y: 80, local: "Peruíbe — praia", tipo: "Erosão costeira", ok: false },
];

function Acoes() {
  const [ativo, setAtivo] = useState(0);
  const [mural, setMural] = useState([
    { n: "Ana, Santos", t: "Levo minha garrafinha e recuso canudo nos quiosques." },
    { n: "Escola de Bertioga", t: "Fizemos uma composteira com restos da merenda!" },
    { n: "Pedro, Ubatuba", t: "Toda volta da praia trago um saquinho de lixo comigo." },
  ]);
  const [nome, setNome] = useState("");
  const [texto, setTexto] = useState("");
  const p = pontos[ativo]!;
  return (
    <>
      <PageHero eyebrow="Ações e projetos" title="Da informação para a areia." text="Campanhas, palestras, atividades escolares, mutirões e iniciativas comunitárias." />
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="flex items-center gap-2 text-3xl font-extrabold"><CalendarDays className="text-ocean" /> Calendário</h2>
          <ul className="mt-6 space-y-3">
            {agenda.map((a) => (
              <li key={a.t} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4">
                <span className="grid w-16 shrink-0 place-items-center rounded-xl bg-mar py-2 text-center font-display text-sm font-extrabold text-primary-foreground">{a.d}</span>
                <div><p className="font-bold">{a.t}</p><p className="text-sm text-muted-foreground">{a.l}</p></div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">Para participar: inscreva-se na página Participe, leve luvas, protetor solar e água. Menores precisam de autorização.</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <img src={mutirao} alt="Mutirão na praia" loading="lazy" className="col-span-2 aspect-video w-full rounded-3xl object-cover" />
          <img src={mangue} alt="Manguezal" loading="lazy" className="aspect-square w-full rounded-3xl object-cover" />
          <img src={hero} alt="Litoral paulista" loading="lazy" className="aspect-square w-full rounded-3xl object-cover" />
        </div>
      </section>

      <section className="bg-areia">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="flex items-center gap-2 text-3xl font-extrabold"><MapPin className="text-mata" /> Mapa de problemas ambientais</h2>
          <p className="mt-2 text-muted-foreground">Localização aproximada. Só divulgamos como “verificado” o que a equipe confirmou em campo.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-mar">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
                <path d="M0,0 L100,0 L100,70 C85,72 80,88 70,72 C60,62 50,66 40,52 C30,40 20,42 10,28 L0,22 Z" className="fill-mata" />
              </svg>
              {pontos.map((pt, i) => (
                <button key={pt.local} onClick={() => setAtivo(i)} style={{ left: `${pt.x}%`, top: `${pt.y}%` }} aria-label={pt.local}
                  className={`absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-areia ${pt.ok ? "bg-alerta" : "bg-lagoa"} ${i === ativo ? "scale-150" : ""} transition`} />
              ))}
              <span className="absolute bottom-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold">Litoral paulista (esquemático)</span>
            </div>
            <div className="rounded-3xl bg-card p-6">
              <p className="eyebrow text-ocean">{p.ok ? "Verificado" : "Em verificação"}</p>
              <p className="mt-2 text-2xl font-bold">{p.tipo}</p>
              <p className="text-muted-foreground">{p.local}</p>
              <p className="mt-4 text-sm text-muted-foreground">Viu um problema? Envie pela página Participe com foto e local — checamos antes de publicar.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="flex items-center gap-2 text-3xl font-extrabold"><Sparkles className="text-alerta" /> Mural de atitudes sustentáveis</h2>
        <form className="mt-6 grid gap-3 rounded-3xl border border-border bg-card p-6 md:grid-cols-[1fr_2fr_auto]"
          onSubmit={(e) => { e.preventDefault(); if (!texto.trim()) return; setMural([{ n: nome.trim() || "Anônimo", t: texto.trim() }, ...mural]); setTexto(""); setNome(""); toast.success("Atitude publicada no mural!"); }}>
          <Input placeholder="Seu nome e cidade" value={nome} onChange={(e) => setNome(e.target.value)} maxLength={60} />
          <Textarea placeholder="Compartilhe uma atitude positiva" value={texto} onChange={(e) => setTexto(e.target.value)} maxLength={280} className="min-h-10" />
          <Button variant="mata" type="submit">Publicar</Button>
        </form>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mural.map((m, i) => (
            <div key={i} className={`rounded-3xl p-6 ${i % 3 === 0 ? "bg-areia" : i % 3 === 1 ? "bg-lagoa/20" : "bg-mata/15"}`}>
              <p className="text-lg">“{m.t}”</p>
              <p className="mt-3 text-sm font-bold">— {m.n}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

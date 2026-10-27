import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { HandHeart, Share2, Lightbulb } from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/site-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/participe")({
  head: () => ({
    meta: [
      { title: "Participe — Litoral em Xeque" },
      { name: "description", content: "Seja voluntário, divulgue campanhas, envie sugestões ou denuncie problemas no litoral paulista." },
      { property: "og:title", content: "Participe — Litoral em Xeque" },
      { property: "og:description", content: "Faça parte da mudança no litoral paulista." },
    ],
  }),
  component: Participe,
});

function Participe() {
  const [form, setForm] = useState({ nome: "", email: "", interesse: "Voluntariado", msg: "" });
  return (
    <>
      <PageHero eyebrow="Participe" title="O litoral precisa de você." text="Escolha como contribuir — todo gesto conta." />
      <section className="mx-auto grid max-w-6xl gap-5 px-4 py-16 md:grid-cols-3">
        {[
          { i: HandHeart, t: "Voluntariado", d: "Ajude em mutirões, palestras e oficinas nas escolas." },
          { i: Share2, t: "Divulgação", d: "Compartilhe nossas campanhas — sempre com a fonte junto." },
          { i: Lightbulb, t: "Sugestões", d: "Mande ideias de ações ou denuncie problemas no litoral." },
        ].map((x) => (
          <div key={x.t} className="rounded-3xl bg-card p-7 shadow-card">
            <x.i className="size-8 text-mata" />
            <h2 className="mt-4 text-2xl font-bold">{x.t}</h2>
            <p className="mt-2 text-muted-foreground">{x.d}</p>
          </div>
        ))}
      </section>
      <section className="bg-areia">
        <form className="mx-auto grid max-w-2xl gap-4 px-4 py-16"
          onSubmit={(e) => {
            e.preventDefault();
            if (!form.nome.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) { toast.error("Preencha nome e um e-mail válido."); return; }
            toast.success("Mensagem enviada! Entraremos em contato.");
            setForm({ nome: "", email: "", interesse: "Voluntariado", msg: "" });
          }}>
          <h2 className="text-3xl font-extrabold">Fale com a gente</h2>
          <div className="grid gap-2"><Label htmlFor="nome">Nome</Label><Input id="nome" maxLength={80} value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} /></div>
          <div className="grid gap-2"><Label htmlFor="email">E-mail</Label><Input id="email" type="email" maxLength={120} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
          <div className="grid gap-2">
            <Label>Quero</Label>
            <div className="flex flex-wrap gap-2">
              {["Voluntariado", "Divulgar campanhas", "Enviar sugestão", "Relatar problema"].map((o) => (
                <button type="button" key={o} onClick={() => setForm({ ...form, interesse: o })}
                  className={`rounded-full border-2 px-4 py-2 text-sm font-semibold ${form.interesse === o ? "border-ocean bg-ocean text-primary-foreground" : "border-border bg-card"}`}>{o}</button>
              ))}
            </div>
          </div>
          <div className="grid gap-2"><Label htmlFor="msg">Mensagem</Label><Textarea id="msg" rows={5} maxLength={1000} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} /></div>
          <Button type="submit" variant="mar" size="xl">Enviar</Button>
        </form>
      </section>
    </>
  );
}

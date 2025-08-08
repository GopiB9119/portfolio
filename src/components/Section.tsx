import { ReactNode } from "react";

export default function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </section>
  );
}


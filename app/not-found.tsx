import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[50dvh] flex-col justify-center gap-4 px-(--section-px) py-(--section-py)">
      <h1 className="font-display text-3xl tracking-display">
        Página não encontrada
      </h1>
      <p className="text-base">A página solicitada não existe.</p>
      <Link
        href="/"
        className="w-fit text-gold underline-offset-4 hover:underline"
      >
        Voltar ao início
      </Link>
    </div>
  );
}

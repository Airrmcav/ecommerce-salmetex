import SearchClient from "./SearchClient";

export default async function Page({ searchParams }: { searchParams?: Promise<{ q?: string | string[] }> }) {
  const sp = await searchParams;
  const raw = sp?.q;
  const q = Array.isArray(raw) ? (raw[0] ?? "") : (raw ?? "");
  return <SearchClient q={q || ""} />;
}

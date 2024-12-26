import Filter from "@/components/module/Filter";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <h1 className="text-4xl capitalize">products</h1>
      <Filter />
    </header>
  );
}

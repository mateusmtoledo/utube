function CategoryTag({ children }: { children: string }) {
  return (
    <li>
      <button className="h-full px-4 overflow-ellipsis whitespace-nowrap bg-slate-900 rounded-lg text-sm leading-tight hover:bg-slate-800">
        {children}
      </button>
    </li>
  );
}

// TODO handle overflow
export default function CategoryList({ categories }: { categories: string[] }) {
  return (
    <ul className="flex gap-3 overflow-hidden h-8">
      {categories.map((category, i) => (
        <CategoryTag key={i}>{category}</CategoryTag>
      ))}
    </ul>
  );
}

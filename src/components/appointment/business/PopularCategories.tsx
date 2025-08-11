export const PopularCategories = ({ className }: { className?: string }) => {
  const categories = [
    { name: "Kuaför", icon: "✂️", count: 245 },
    { name: "Spa & Masaj", icon: "💆", count: 189 },
    // Diğer kategoriler...
  ];

  return (
    <section className={className}>
      <h2 className="text-2xl font-bold mb-6">Popüler Kategoriler</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-amber-400 transition-colors cursor-pointer"
          >
            <div className="text-2xl mb-2">{cat.icon}</div>
            <h3 className="font-medium">{cat.name}</h3>
            <p className="text-sm text-gray-500">{cat.count} işletme</p>
          </div>
        ))}
      </div>
    </section>
  );
};

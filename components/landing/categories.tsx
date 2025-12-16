export function Categories() {
  const categories = [
    {
      title: "Logic",
      description: "Business, Strategy, and Rationality.",
    },
    {
      title: "Tech",
      description: "Front-end Development, Code, and The Future.",
    },
    {
      title: "Life",
      description: "Reality, Struggle, and Observations.",
    },
    {
      title: "Raw",
      description: "Unpolished feelings and drafts.",
    },
  ];

  return (
    <section className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <h2 className="text-3xl font-bold tracking-tighter md:text-5xl mb-16">
          The Four Corners
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between p-8 border border-border bg-card hover:bg-foreground hover:text-background transition-all duration-300 min-h-[300px] cursor-pointer"
            >
              <h3 className="text-3xl font-bold group-hover:text-background">{cat.title}</h3>
              <p className="text-muted-foreground text-lg group-hover:text-background/80 pt-4 border-t border-border/20 mt-auto">{cat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

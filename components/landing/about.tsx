export function About() {
  return (
    <section id="philosophy" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl space-y-8">
        <h2 className="text-4xl font-bold tracking-tighter md:text-5xl text-left border-l-[6px] border-foreground pl-6">
          Why Square?
        </h2>
        <div className="prose prose-xl dark:prose-invert text-muted-foreground leading-relaxed">
          <p className="mb-6">
            Life isn&apos;t linear, but thinking should be. Squareblog is a
            personal platform designed to compartmentalize complex ideas into
            understandable formats. This isn&apos;t a lifestyle blog. It is a
            repository for logic, raw emotion, and the tech that drives our
            world.
          </p>
          <p>
            I don&apos;t write for algorithms. I write to clarify my own
            thinking. If you find value in that, stay. If not, click away.
          </p>
        </div>
      </div>
    </section>
  );
}

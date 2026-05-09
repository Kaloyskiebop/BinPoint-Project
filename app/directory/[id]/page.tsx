export default function CategoryItemsPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen bg-background pt-32 px-6 flex flex-col items-center">
      <h1 className="font-heading text-4xl font-bold text-foreground">
        Dynamic Route Working!
      </h1>
      <p className="mt-4 text-xl text-foreground/70">
        You are currently viewing the page for: <span className="font-bold text-primary">{params.id}</span>
      </p>
      
      <div className="mt-12 p-8 border-2 border-dashed border-foreground/20 rounded-xl">
        <p>This is where the specific items for {params.id} will go later.</p>
      </div>
    </main>
  );
}
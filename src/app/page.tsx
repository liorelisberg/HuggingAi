import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">AI Chat Assistant</h1>
        <Chat />
      </main>
    </div>
  );
}

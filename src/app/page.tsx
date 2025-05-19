import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gray-900">
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("/chat-background.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.6
        }}
      />
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900/50"
      />

      {/* Content Layer */}
      <div className="relative z-10 max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-300 mb-2 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
            ViralAi
          </h1>
          <p className="text-gray-300 text-lg">
            Your expert companion for social media growth and strategy
          </p>
        </header>
        <Chat />
      </div>
    </div>
  );
}

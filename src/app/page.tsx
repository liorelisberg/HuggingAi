import Chat from "./components/Chat";
import { Logo } from "./components/Logo";

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
      <div className="relative z-10 w-[95%] max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Logo />
          </div>
          <p className="text-gray-300 text-lg">
            Your expert companion for social media growth and strategy
          </p>
        </header>
        <div className="px-0">
          <Chat />
        </div>
      </div>
    </div>
  );
}

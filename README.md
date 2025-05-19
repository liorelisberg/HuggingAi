# ViralAi - Social Media Strategy Assistant

ViralAi is a sophisticated chatbot application built with Next.js that helps users develop and optimize their social media strategies. Using AI to provide personalized recommendations, content ideas, and growth tactics.

![ViralAi Screenshot](public/screenshot.png)

## Features

- 💬 **AI-Powered Chat Interface**: Get instant responses to social media strategy questions
- 🎯 **Personalized Recommendations**: Tailored advice for different platforms and goals
- 📱 **Responsive Design**: Works seamlessly on mobile, tablet, and desktop devices
- 🌙 **Dark Mode**: Modern, eye-friendly dark interface
- ⚡ **Fast Performance**: Built with Next.js App Router for optimal speed

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [HuggingFace](https://huggingface.co/) - AI model provider
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Virtuoso](https://virtuoso.dev/) - Virtual scrolling for chat messages

## Getting Started

### Prerequisites

- Node.js 18.17.0 or later
- HuggingFace API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd viral-ai
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and add your HuggingFace API key:
   ```
   HUGGINGFACE_API_KEY=your_api_key_here
   ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

For detailed logs:

```bash
DEBUG=* NODE_OPTIONS='--trace-warnings' NEXT_DEBUG=true npm run dev
```

## Deployment

### Deploy on Vercel

The easiest way to deploy ViralAi is on [Vercel](https://vercel.com):

1. Push your code to a Git repository (GitHub, GitLab, BitBucket)
2. Import the project in Vercel
3. Add your environment variables
4. Deploy!

### Other Platforms

Build the production version:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

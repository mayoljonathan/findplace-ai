<img src="https://raw.githubusercontent.com/mayoljonathan/findplace-ai/refs/heads/develop/docs/screenshots/findplace-ai-web.png" title="FindPlace.ai" alt="FindPlace.ai">

# FindPlace.ai

A LLM-driven modern web application that helps users discover and find restaurants, gyms, establishments, and places. Built with a monorepo structure using pnpm workspaces, featuring a NestJS as backend with integration to OpenAI and Foursquare, and Next.js as frontend.

## 🎥 Demo

### Check out the live demo of [FindPlace.ai](http://findplace-ai.vercel.app/)

<p align="center" style="text-align: center">
   <img src="https://raw.githubusercontent.com/mayoljonathan/findplace-ai/refs/heads/develop/docs/screenshots/findplace-ai-demo.gif" alt="FindPlace.ai demo">
</p>

## ✨ Features

- 🤖 <b>AI-Powered Search:</b> Find places using natural language queries
- 🏪 <b>Place Discovery:</b> Search for restaurants, gyms, and other establishments
- 🔍 <b>Results Sorting:</b> Sort results by relevance, rating and prices
- 📱 <b>Responsive Design:</b> Works seamlessly on desktop and mobile devices
- 🎨 <b>Modern UI:</b> Clean, minimalistic design with smooth loading states
- 🖼️ <b>Photo Gallery:</b> View high-quality images of the restaurant, and places
- 🔐 <b>Security:</b> Foursquare image domains are strictly configured in Next.js config
- ⚠️ <b>Error Handling:</b> Comprehensive server-side error handling for frontend error messages
- 🔒 <b>API Key Integration:</b> Secure API endpoints with simple API key authentication
- 🔄 <b>API Proxy:</b> API request forwarding to the NestJS backend server

## 🚀 Tech Stack

### Backend (NestJS)

- NestJS 9.x
- TypeScript
- Axios for HTTP requests
- OpenAI integration
- Foursquare integration
- Class Validator & Transformer
- Jest for testing

### Frontend (Next.js)

- Next.js 15.x (App router)
- React 19
- TypeScript
- TailwindCSS
- Axios for HTTP requests
- TanStack Query
- React Hook Form
- Zod for validation
- Radix UI components
- Lucide React icons

## 🏗️ Project Structure

```
findplace-ai/
├── apps/
│   ├── backend-api/     # NestJS backend application
│   │   ├── src/
│   │   │   ├── common/         # Common utilities and shared code
│   │   │   ├── features/       # Feature modules containing business logic
│   │   │   ├── services/       # API or other third-party services
│   │   │   ├── app.controller.ts
│   │   │   ├── app.module.ts   # Root module
│   │   │   └── main.ts         # Application entry point
│   │   └── package.json
│   │
│   └── frontend-web/    # Next.js frontend application
│       ├── public/            # Public assets
│       ├── src/
│       │   ├── app/           # Next.js app directory
│       │   ├── components/    # React components
│       │   ├── config/        # Configuration files and hardcoded values
│       │   ├── hooks/         # Custom React hooks
│       │   ├── lib/           # Utility functions
│       │   ├── service/       # API service layer and other services
│       │   └── types/         # TypeScript types
│       └── package.json
│
└── package.json         # Root package.json containing scripts to develop, test, build, and run locally
```

## 🛠️ Prerequisites

- Node.js (Latest LTS version recommended, ensure that node version is 18.18 or above)
- pnpm (Package manager)

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/mayoljonathan/findplace-ai.git
   cd findplace-ai
   ```

2. Install dependencies in root folder:

   If using via pnpm, install both apps dependency under one command:

   ```bash
   pnpm install
   ```

   If using via npm, cd to each of the apps and run `npm install`:

   ```bash
   cd apps/backend-api
   npm install

   cd apps/frontend-web
   npm install
   ```

   If using via yarn, cd to each of the apps and run `yarn install`:

   ```bash
   cd apps/backend-api
   yarn install

   cd apps/frontend-web
   yarn install
   ```

3. Set up environment variables:

   - Create `.env` files in both `apps/backend-api` and `apps/frontend-web` directories
   - Add necessary environment variable values (Please check the .env.example for each directory)

   backend-api's .env

   ```bash
   # Application
   PORT=4000
   NODE_ENV="production" # "production" or "development"
   API_KEYS="" # list of allowed api keys separated by comma

   # OpenAi
   OPENAI_API_KEY=""
   OPENAI_MODEL=""

   # Foursquare
   FOURSQUARE_API_URL=""
   FOURSQUARE_API_KEY=""
   ```

   frontend-web's .env

   ```bash
   NEXT_PUBLIC_API_URL="http://localhost:4000"
   NEXT_PUBLIC_API_KEY=""
   ```

4. Start the development servers under root folder:

   To run development server in a single command for both backend and frontend (only usable using pnpm):

   ```bash
   pnpm dev
   ```

   To develop in backend only:

   ```bash
   cd apps/backend-api
   pnpm dev # npm run dev or yarn dev
   ```

   To develop in frontend only:

   ```bash
   cd apps/frontend-web
   pnpm dev # npm run dev or yarn dev
   ```

5. Open http://localhost:3000 in your browser of your choice.

## 🧪 Testing

### Backend

The test files are located in each of the controllers and services with a suffix of `spec.ts`

Under your root folder, run the following command:

```bash
pnpm test
```

or when using other package managers:

```bash
cd apps/backend-api
npm test # yarn test or pnpm test
```

## 📦 Building for Production

To build the apps in a single command for both backend and frontend (only usable using pnpm):

Under your root folder, run the following command:

```bash
pnpm build
```

To build for backend only:

```bash
cd apps/backend-api
pnpm build # npm run build or yarn build
```

To build for frontend only:

```bash
cd apps/frontend-web
pnpm build # npm run build or yarn build
```

### After building the apps in production, you can now start them:

To run the production build apps in a single command (only usable using pnpm):

Under your root folder, run the following command:

```bash
pnpm start
```

To run for backend only:

```bash
cd apps/backend-api
pnpm start # npm run start or yarn start
```

To run for frontend only:

```bash
cd apps/frontend-web
pnpm start # npm run start or yarn start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open-source and licensed under MIT license.

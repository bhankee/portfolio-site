This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

This repo contains:

- **Frontend**: Next.js app in `my-portfolio/`
- **Backend**: Python FastAPI RAG chatbot in `rag-backend/`

### Frontend (Next.js)

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Backend (Python RAG Chatbot)

The frontend calls `POST /api/chat`, which proxies to the Python backend URL from `NEXT_PUBLIC_RAG_API_URL`.

1. Create `rag-backend/.env` with your key:

```bash
OPENAI_API_KEY=sk-...
```

2. Install backend deps and run the server:

```bash
cd ../rag-backend
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements.txt
python3 -m uvicorn main:app --reload --port 8000
```

3. Point the Next.js app at the backend.

Create or edit `my-portfolio/.env.local`:

```bash
NEXT_PUBLIC_RAG_API_URL=http://localhost:8000/chat
```

Then restart `npm run dev`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Contact Email Form

Utilizes Resend to handle email
[Docs](https://resend.com/docs/send-with-vercel-functions)

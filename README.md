# 🐉 The Dragon News — Client (Frontend)

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge)](https://eact-dragon-news-auth-main.vercel.app/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/)

> **Bangladesh's trusted Bengali news portal — powered by AI Fake News Detection**

---

## 📌 Project Description

The Dragon News is a full-stack Bengali news portal built for Bangladeshi readers. It allows users to read, post, and verify news articles. The platform features an AI-powered fake news detection system trained specifically on Bengali text using **SVM + BanglaBERT + Llama 70B** — making it one of the first Bengali-language AI fact-checking tools.

---

## 🧩 Problem Solved

- Misinformation spreads rapidly in Bengali social media
- No dedicated AI-powered fake news detector existed for Bengali content
- Readers lacked a platform to both consume and contribute Bengali news
- Journalists needed tools to verify news authenticity before publishing

---

## ✨ Features

- 🔐 **JWT Authentication** — Secure login & registration with profile photo upload
- 📰 **News Feed** — Browse news by category with infinite scroll
- ✍️ **Post News** — Any registered user can post news articles
- 🤖 **AI Fake News Detector** — Detects authentic, fake, or AI-generated Bengali news
- 👍 **Like & Comment** — Engage with news articles
- 👤 **User Profile** — Manage profile, view & delete own posts
- 🛡️ **Admin Panel** — Manage users, news, and categories
- 📱 **Fully Responsive** — Mobile-first design with bottom navigation
- 🌙 **Dark Mode Ready** — Full dark mode support

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 + Vite | Frontend framework |
| Tailwind CSS + DaisyUI | Styling |
| React Router DOM v6 | Client-side routing |
| Axios | HTTP requests |
| React Icons | Icon library |
| ImgBB API | Image hosting |
| JWT | Authentication |
| Moment.js | Date formatting |
| React Fast Marquee | Latest news ticker |

---

## 🚀 Live Demo

🌐 **Live Site:** [https://eact-dragon-news-auth-main.vercel.app/](https://eact-dragon-news-auth-main.vercel.app/)

🎥 **Demo Video:** [Google Drive](https://drive.google.com/file/d/1aq5GgEH5VU0hD6Gp1x_ISq7AwDoN5DvW/view)

### Test Credentials

| Role | Email | Password |
|---|---|---|
| Regular User | riyad@gmail.com | riyad#1gmail.com |
| Admin | fahmida@gmail.com | fahmida@1gmail.com |

---

## 📁 Folder Structure

```
src/
├── assets/
├── Auth/
│   ├── AuthLayout.jsx
│   ├── Login.jsx
│   └── Register.jsx
├── components/
│   ├── layout-component/
│   │   ├── LeftNavbar.jsx
│   │   ├── RightNav.jsx
│   │   └── MobileNav.jsx
│   ├── Header.jsx
│   ├── LatestNews.jsx
│   ├── FindUs.jsx
│   └── NewsCard.jsx
├── contexts/
│   └── AuthContext.jsx
├── hooks/
│   └── useAuth.js
├── layouts/
│   ├── HomeLayout.jsx
│   └── AdminLayout.jsx
├── pages/
│   ├── Admin/
│   │   ├── Dashboard.jsx
│   │   ├── ManageUsers.jsx
│   │   ├── ManageNews.jsx
│   │   └── ManageCategories.jsx
│   ├── CategoryNews.jsx
│   ├── NewsDetail.jsx
│   ├── Profile.jsx
│   ├── About.jsx
│   ├── Career.jsx
│   ├── Ai.jsx
│   └── Error.jsx
├── routes/
│   ├── router.jsx
│   └── AdminRoute.jsx
└── utils/
    ├── axiosInstance.js
    └── uploadImage.js
```

---

## ⚙️ Installation

### Prerequisites
- Node.js >= 18
- npm or yarn
- Backend server running (see backend README)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/rahman2220510189/eact-dragon-news-auth-main.git

# 2. Navigate to project directory
cd eact-dragon-news-auth-main

# 3. Install dependencies
npm install

# 4. Create environment file
cp .env.example .env

# 5. Start development server
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

For production (`.env.production`):

```env
VITE_API_URL=https://your-backend.onrender.com/api
VITE_IMGBB_API_KEY=your_imgbb_api_key
```

---

## 📖 Usage Guide

1. **Browse News** — Visit home page to see all news, click categories on the left sidebar
2. **Register/Login** — Create an account to post news and comment
3. **Post News** — Go to Profile page, fill in the form and submit
4. **Fake News Detector** — Click "Fake News Detector" in navigation, paste Bengali text and click Analyze
5. **Admin Panel** — Admin users can access `/admin` to manage users, news and categories

---

## 🤖 AI Fake News Detection

The fake news detector is powered by a custom-trained model:

- **SVM** — Traditional ML baseline
- **BanglaBERT** — BERT model fine-tuned on Bengali text
- **Llama 70B** — Large language model for context understanding
- **API:** Hosted on Hugging Face Spaces

🔗 **Model Repository:** [Fake News Detection](https://github.com/rahman2220510189/Fake_News_Detection)

---

## 🚢 Deployment

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

Add these environment variables in Vercel dashboard:
- `VITE_API_URL`
- `VITE_IMGBB_API_KEY`

The `vercel.json` handles SPA routing:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**MD. Naymur Rahman**

- GitHub: [@rahman2220510189](https://github.com/rahman2220510189)
- Project built as academic defense project + resume portfolio

---

> *"Journalism Without Fear or Favour"* 🐉
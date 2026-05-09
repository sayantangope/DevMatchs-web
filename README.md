# 💻 DevMatch — Frontend (Web)

> The React frontend for **DevMatch** — a Tinder-style platform for developers to discover, connect, and chat with each other. Built with React 19, Redux Toolkit, Tailwind CSS, DaisyUI, and Socket.IO.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 |
| Build Tool | Vite |
| State Management | Redux Toolkit |
| Routing | React Router v7 |
| Styling | Tailwind CSS v3 + DaisyUI v4 |
| HTTP Client | Axios |
| Real-time | Socket.IO Client v4 |
| Linting | ESLint |

---

## 📁 Project Structure

```
devTinder-web/
├── public/                         # Static assets
│
├── src/
│   ├── main.jsx                    # React app entry point (wraps with Redux Provider)
│   ├── App.jsx                     # Root component with Router & layout
│   ├── index.css                   # Global base styles
│   │
│   ├── components/
│   │   ├── Body.jsx                # Main layout shell with NavBar + Outlet
│   │   ├── NavBar.jsx              # Top navigation bar with user dropdown
│   │   ├── LandingPage.jsx         # Public landing / marketing page
│   │   ├── Login.jsx               # Login & sign-up form
│   │   ├── Home.jsx                # Home page wrapper
│   │   ├── Feed.jsx                # Browse developer profiles (swipe feed)
│   │   ├── UserCard.jsx            # Individual developer card (send/ignore)
│   │   ├── ProfileCard.jsx         # Profile preview card
│   │   ├── Profile.jsx             # Own profile page
│   │   ├── EditProfile.jsx         # Edit profile form
│   │   ├── Connection.jsx          # Accepted connections list
│   │   ├── ConnectionCard.jsx      # Single connection card
│   │   ├── Request.jsx             # Pending connection requests list
│   │   ├── RequestCard.jsx         # Single request card (accept/reject)
│   │   ├── Chat.jsx                # Real-time chat window with a connection
│   │   └── Premium.jsx             # Membership/pricing page (Razorpay checkout)
│   │
│   ├── utils/
│   │   ├── store.js                # Redux store configuration
│   │   ├── socket.js               # Socket.IO client instance (singleton)
│   │   └── slices/
│   │       ├── userSlice.js        # Auth user state (login / logout)
│   │       ├── feedSlice.js        # Developer feed state
│   │       ├── connectionSlice.js  # Connections list state
│   │       └── requestSlice.js     # Pending requests state
│   │
│   └── constants/
│       └── constants.js            # BASE_URL and other shared constants
│
├── index.html                      # Vite HTML entry
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── postcss.config.js               # PostCSS configuration
├── eslint.config.js                # ESLint flat config
├── .gitignore
├── package.json
└── package-lock.json
```

---

## ⚙️ Environment / Configuration

Update `src/constants/constants.js` with your backend URL:

```js
// src/constants/constants.js
export const BASE_URL = "http://localhost:3000"; // or your deployed API URL
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js >= 18
- The [DevMatch Backend Server](https://github.com/sayantangope/DevMatchs-server) running locally or deployed

### Installation

```bash
# Clone the repository
git clone https://github.com/sayantangope/DevMatch-web.git
cd devTinder-web

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🗺️ Page Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Public marketing page |
| `/login` | `Login` | Login & signup |
| `/home` | `Home` + `Feed` | Browse developer feed |
| `/profile` | `Profile` | View own profile |
| `/edit` | `EditProfile` | Edit profile details |
| `/connections` | `Connection` | Accepted connections |
| `/requests` | `Request` | Pending connection requests |
| `/chat/:userId` | `Chat` | Real-time chat with a connection |
| `/premium` | `Premium` | Upgrade to Silver/Gold membership |

---

## 🧠 State Management (Redux)

The Redux store manages four slices:

| Slice | Purpose |
|-------|---------|
| `userSlice` | Logged-in user profile & auth state |
| `feedSlice` | Array of developer profiles in the swipe feed |
| `connectionSlice` | List of accepted connections |
| `requestSlice` | List of incoming pending connection requests |

---

## 🔌 Real-time Chat (Socket.IO)

`src/utils/socket.js` exports a **singleton** Socket.IO client connected to `BASE_URL`.  
The `Chat.jsx` component:
1. Joins a private room via `joinChat` event on mount.
2. Sends messages with `sendMessage` event.
3. Listens for `messageReceived` to update the chat UI live.

---

## 💳 Premium Membership

The `Premium.jsx` component integrates **Razorpay** for checkout:
- **Silver** tier — Basic premium features
- **Gold** tier — Full premium access

On successful payment, the backend webhook upgrades `isPremium` and `membershipType` on the user document.

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📄 License

This project is private and unlicensed.

---

## 👤 Author

**Sayantan Gope**  
GitHub: [@sayantangope](https://github.com/sayantangope)

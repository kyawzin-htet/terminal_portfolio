# 👨‍💻 Terminal Portfolio

A developer portfolio with a retro, interactive command-line interface. Built for developers who love the terminal experience, this portfolio lets visitors "hack" their way through projects, experience, and contact forms.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat&logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript)

## ✨ Features

- **Interactive Command Line**: Type commands to navigate through the portfolio, just like a real terminal.
- **Tab Autocomplete**: Press `Tab` to auto-complete commands.
- **Dynamic Themes**: Change the terminal's theme on the fly using the `theme <name>` command.
- **Interactive Contact Form**: Send messages directly from the terminal prompt.
- **Window Management**: Draggable, resizable (maximize/minimize/restore) terminal window.
- **Session Restoration**: Remembers your command history across page reloads.
- **Easter Eggs**: Try out secret commands like `sudo`.
- **Fully Responsive**: Optimizes automatically for both desktop and mobile views.

## 🛠 Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Email Delivery**: [Nodemailer](https://nodemailer.com/)
- **Language**: TypeScript

## 🚀 Getting Started

First, clone the repository and install dependencies:

```bash
git clone https://github.com/kyawzin-htet/terminal_portfolio.git
cd terminal_portfolio
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💻 Available Commands

Once inside the terminal portfolio, you can use the following commands:

- `help` - Show available commands
- `about` - Who am I?
- `projects` - View my work
- `go <num>` - Go directly to a project by number
- `exp` (or `experience`) - View work experience
- `contact` - Start the interactive contact form to get in touch
- `theme` - List all available terminal themes
- `theme <name>` - Switch to a specific theme
- `clear` - Clear terminal history
- `maximize` - Maximize terminal window
- `minimize` - Minimize terminal window
- `gui` - Open the graphical version of the portfolio
- `sudo` - Try it out yourself

## 🗂 Folder Structure

```text
src/
├── app/                  # Next.js App Router pages and global CSS
├── components/           # Reusable UI components
│   └── Terminal/         # Core terminal logic, output handling, and commands
├── config/               # Themes definitions and ASCII art configurations
├── context/              # React Context (e.g., Theme Context)
├── data/                 # Static data for projects and experience details
└── hooks/                # Custom React Hooks
```

## 📝 License

This project is licensed under the MIT License.

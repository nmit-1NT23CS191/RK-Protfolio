# Ravikiran M S - Software Development Engineer (SDE) Portfolio

An interactive, high-end, 3D developer portfolio showcasing Software Development Engineering (SDE), Cloud Infrastructure, and Applied AI/ML integrations. Fully optimized for responsiveness, modern performance standards, and visually stunning interactive micro-animations.

🔗 **Live Link:** [https://github.com/nmit-1NT23CS191/RK-Protfolio](https://github.com/nmit-1NT23CS191/RK-Protfolio)

---

## 🚀 Key Features

*   **Double-Sided 3D Profile Card**: Uses React Three Fiber (R3F) and Three.js to render a floating, double-sided rotating photo card in the Hero section.
*   **Staggered Technical Skills Grid**: Categorized tech stack displaying custom vector inline SVG logos (Programming, Cloud & DevOps, AI & Data, Databases). Features category-specific motion entry paths and springy staggered cascades.
*   **Anti-Gravity 3D Background**: Interactive WebGL space backdrop rendering floating stars, spheres, and physics particles that react dynamically to cursor movements.
*   **Infinite Scrolling Carousel**: Continuous horizontal scroll track displaying verified certifications, hackathons, and credentials.
*   **Interactive Projects Showcase**: Premium glassmorphic cards with subtle highlights, expandable details, custom tag clouds, and link integrations.
*   **Dynamic Coding Activity Tracker**: Seeded pseudorandom color contribution map visualizing commits and active streak indicators.
*   **Interactive Contact Desk**: Contact form featuring real-time client validation, animation state handlers, and canvas-confetti success triggers.

---

## 🛠️ Technology Stack

*   **Core Logic & Framework**: React.js (Hooks, State Management, Custom Typewriter hooks)
*   **Interactive 3D Graphics**: Three.js, React Three Fiber (R3F), `@react-three/drei`
*   **Styling & Theme**: Tailwind CSS v3, Glassmorphism, CSS Custom Keyframes
*   **Motion & Animations**: Framer Motion, Canvas-Confetti
*   **Icons & Assets**: Lucide React, Custom Inline SVG Vector Logos

---

## 📂 Project Architecture

```bash
my-portfolio/
├── public/                 # Static assets & SVG maps
├── src/
│   ├── assets/             # Watermark-cropped photo assets
│   ├── components/         # Core layout modules
│   │   ├── About.jsx          # Professional summary & education logs
│   │   ├── Background3D.jsx   # WebGL anti-gravity background canvas
│   │   ├── Certifications.jsx # Infinite scroll achievements carousel
│   │   ├── Contact.jsx        # Validation form with success confetti
│   │   ├── Footer.jsx         # Bottom layout & scroll-to-top handler
│   │   ├── GithubStats.jsx    # Contribution grid & CountUp counters
│   │   ├── Hero.jsx           # Floating 3D card layout & typewriter subtitle
│   │   ├── Icons.jsx          # Custom SVG inline brand icons
│   │   ├── Navbar.jsx         # Frosted glass responsive navigation bar
│   │   ├── Profile3D.jsx      # Double-sided mesh texture card
│   │   ├── Projects.jsx       # Featured project showcase cards
│   │   ├── Skills.jsx         # Staggered entry skill grid
│   │   └── TechLogos.jsx      # Inline vector skill logos
│   ├── hooks/
│   │   └── useTypewriter.js   # Custom typing text loop
│   ├── App.jsx             # Combined layout entry point
│   ├── index.css           # Global typography, colors, and shadows
│   └── main.jsx            # React mounting file
├── package.json            # Scripts & dependencies
└── vite.config.js          # Vite configuration
```

---

## 💻 Local Development Setup

To run this project on your local machine:

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/nmit-1NT23CS191/RK-Protfolio.git
    cd my-portfolio
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The site will start locally on `http://localhost:5173/` (or another port outputted to the terminal console).

4.  **Production Compilation**:
    ```bash
    npm run build
    ```
    Creates optimized, minified production assets in the `dist/` directory.

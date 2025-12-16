# SquareBlog

A professional, high-performance blogging platform built with **Next.js 15**, **Sanity CMS**, and **Tailwind CSS**. Designed for creators and developers to publish, manage, and showcase their content with elegance and ease.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

SquareBlog is a modern, content-first blogging platform that combines the power of **Next.js** for fast, server-side rendering with **Sanity CMS** for flexible, real-time content management. Whether you're publishing technical tutorials, industry insights, or personal stories, SquareBlog provides everything you need to create a professional online presence.

### Key Highlights

- **Sanity-Powered CMS** - Headless content management for maximum flexibility
- **Server-Side Rendering** - Lightning-fast page loads and optimal SEO
- **Real-Time Updates** - Content changes reflect instantly across your site
- **Professional Design** - Modern, responsive interface built with Tailwind CSS
- **Developer-Friendly** - TypeScript support and well-organized codebase

---

## ✨ Features

- **📝 Sanity CMS Integration** - Rich content management with real-time preview
- **🎨 Modern Design System** - Responsive UI with Tailwind CSS and custom components
- **🌙 Dark Mode Support** - Seamless theme toggle with `next-themes`
- **🏷️ Advanced Filtering** - Filter posts by tags and categories
- **👤 Author Management** - Built-in author profiles and attribution
- **📱 Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- **🖼️ Rich Media Support** - Image optimization with Sanity image URL builder
- **⚡ Performance Optimized** - Server components, image optimization, and code splitting
- **🔍 SEO Ready** - Dynamic metadata, Open Graph images, and structured data
- **📊 Analytics Ready** - Easy integration with tracking tools

---

## 🛠️ Tech Stack

| Technology        | Purpose                                               |
| ----------------- | ----------------------------------------------------- |
| **Next.js 15**    | React framework with App Router and server components |
| **Sanity CMS**    | Headless content management system                    |
| **TypeScript**    | Type-safe JavaScript development                      |
| **Tailwind CSS**  | Utility-first CSS framework                           |
| **React**         | UI library for interactive components                 |
| **Portable Text** | Rich text field format by Sanity                      |
| **next-sanity**   | Next.js integration for Sanity                        |
| **next-themes**   | Dark mode implementation                              |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.0 or higher
- **pnpm** 8.0 or higher (or npm/yarn)
- A **Sanity** account and project (free tier available at [sanity.io](https://www.sanity.io))

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/developerarif10/squareblog.git
cd squareblog
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

Replace `your_project_id` with your actual Sanity project ID, available from your [Sanity dashboard](https://manage.sanity.io).

### 4. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## ⚙️ Configuration

### Sanity Studio

The Sanity Studio is accessible at `/studio` (e.g., `http://localhost:3000/studio`). Configure your schema in `sanity/schemaTypes/post.ts`.

### Site Configuration

Edit `lib/site.ts` to customize:

- Site title and description
- Author information
- Social media links
- Navigation structure

### Theme Configuration

Theme settings are managed in `components/theme-provider.tsx` and `components/theme-toggle.tsx` for dark mode support.

---

## 📖 Usage

### Creating a Blog Post

Blog posts are managed entirely through the Sanity Studio interface at `/studio`.

1. Navigate to the **Posts** section
2. Click **Create** and select **Post**
3. Fill in the following fields:
   - **Title** - Post headline
   - **Slug** - URL-friendly identifier
   - **Description** - Short summary for previews
   - **Content** - Rich text content with blocks and media
   - **Author** - Author reference
   - **Date** - Publication date
   - **Tags** - Categorization
   - **Featured** - Pin to homepage (optional)
4. Click **Publish** to make it live

### Viewing Posts

- **Homepage** - Latest posts displayed at `/`
- **Single Post** - Accessible at `/blog/[slug]`
- **Tag Filtering** - Filter posts at `/blog?tag=tagname`

---

## 📁 Project Structure

```
squareblog/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   ├── blog/
│   │   └── [slug]/
│   │       ├── page.tsx         # Blog post page
│   │       └── metadata.ts      # Dynamic metadata
│   └── studio/
│       └── [[...tool]]/
│           └── page.tsx         # Sanity Studio
├── components/                   # React components
│   ├── blog-card.tsx            # Post preview
│   ├── author-card.tsx          # Author info
│   ├── tag-filter.tsx           # Tag filtering
│   ├── theme-toggle.tsx         # Dark mode toggle
│   └── ui/                      # Reusable UI components
├── lib/                         # Utility functions
│   ├── sanity.ts               # Sanity client config
│   ├── urlFor.ts               # Image URL builder
│   └── authors.ts              # Author data
├── sanity/                      # Sanity configuration
│   ├── schemaTypes/
│   │   └── post.ts            # Post schema definition
│   ├── structure.ts            # Studio structure
│   └── lib/
│       ├── client.ts          # Sanity client
│       ├── image.ts           # Image configuration
│       └── live.ts            # Live preview
├── public/                      # Static assets
├── styles/                      # Global styles
└── package.json                 # Dependencies
```

---

## 💻 Development

### Running Tests

```bash
pnpm lint
```

### Building for Production

```bash
pnpm build
pnpm start
```

### Code Quality

The project uses ESLint for code quality. Configuration is in `eslint.config.mjs`.

---

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy automatically on every push

### Deploy to Other Platforms

Ensure your hosting platform supports:

- Node.js 18+
- Environment variable configuration
- Static asset serving

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support

For questions or issues, please [open an issue](https://github.com/developerarif10/squareblog/issues) on GitHub.

---

**Built with ❤️ using Next.js and Sanity CMS**

You can use all standard Markdown features plus MDX components.

```tsx
// Code syntax highlighting works great!
export default function Component() {
  return <div>Hello World!</div>;
}
```

````

## 🎨 Customization

### Adding New Tags/Categories

Simply add them to your blog post frontmatter. The system automatically generates tag pages.

### Featured Posts

Set `featured: true` in your blog post frontmatter to highlight it on the homepage (you can create a dedicated feature section in the home page).

### Styling

The project uses Tailwind CSS with a custom design system. Modify styles in:

- `app/globals.css` - Global styles
- Individual component files - Component-specific styles

### For Authors

Add your author details to the `lib/authors.ts` file.

```tsx
// lib/authors.ts
export const authors: Record<string, Author> = {
  dillion: {
    name: "Dillion Verma",
    position: "Software Engineer",
    avatar: "/authors/dillion.png",
  },
  arghya: {
    name: "Arghya Das",
    position: "Design System Engineer",
    avatar: "/authors/arghya.png",
  },
  // Add your author details here
  yourname: {
    name: "Your Full Name",
    position: "Your Position/Title",
    avatar: "/authors/your-avatar.png",
  },
} as const;
```

Then reference your author in blog posts using the key (e.g., `author: "yourname"`).

## 📖 Technologies Used

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **TypeScript** - Type-safe JavaScript
- **Geist Font** - Modern typography

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
````

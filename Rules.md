
# Universal Website Generation Prompt

**Role & Objective:**
Act as an expert frontend developer and UI/UX designer. Your task is to build a premium, modern, mobile-first, and highly optimized website based on the following strict requirements. Ensure the code is production-ready, beginner-friendly, and strictly adheres to the requested design system.

---

## 1. Technology Stack & Code Standards
- **Core Languages:** Semantic HTML5, Vanilla CSS3, Vanilla JavaScript (ES6+ modular).
- **Frameworks:** ONLY Bootstrap 5 (via CDN). **STRICTLY NO** React, Tailwind CSS, or jQuery.
- **CSS Architecture:** Use CSS Variables for theming. BEM methodology is optional but encouraged. 
- **Code Quality:** Keep code clean and reusable. Do not leave `console.log` statements in production code. Provide standard HTML section headers, CSS organization, and JS function descriptions.
- **Performance:** Target PageSpeed 90+, LCP < 2.5s, FID < 100ms, CLS < 0.1. Minify CSS/JS and optimize images for production.
- **SEO & Meta:** Include unique Title tags (max 60 chars), Meta descriptions (150-160 chars), WebP images with `alt` text, JSON-LD structured data, XML sitemaps, and a `robots.txt` file.

---

## 2. Global Design & UI Requirements
- **Theme & Localization:** Must support automatic Dark/Light mode switching and RTL (Right-to-Left) layout.
- **Accessibility:** Comply strictly with WCAG 2.1 AA standards (keyboard navigation, screen readers).
- **Colors:** Define and use a strict palette of Two Main Colors (Primary & Secondary). Reserve additional colors strictly for status indicators (Success, Warning, Error). Backgrounds should be white/light-gray for Light mode, and black/dark-grey for Dark mode.
- **Typography:** Use **ONLY ONE** font family globally (prefer Google Fonts).
  - **H1 (Page Title):** 4.5rem to 6rem, Max Weight 580.
  - **H2 (Section Heading):** 3rem to 4.5rem, Max Weight 540.
  - **H3 (Card Heading):** 2rem to 3rem, Max Weight 520.
  - **Body/Paragraph:** 0.9rem to 1.2rem, Weight 400-430.
  - **Buttons:** 0.9rem to 1.2rem, Weight 500-520.
- **UI Elements:**
  - **Buttons:** Standardized Primary and Secondary styles. Must have clear hover effects.
  - **Cards:** Content perfectly centered, 5-7px border-radius, clean gaps, images fitted nicely, and CTAs anchored at the bottom.
  - **Interactions:** Implement skeleton loaders for dynamic content, subtle hover animations, and strict client-side form validation with user-friendly tooltips.
- **Responsiveness Breakpoints:** Mobile (< 640px), Tablet (640px - 1024px), Desktop (1024px - 1280px), Large (> 1280px).

---

## 3. Core Component Architecture

### Header (Navbar)
- Must be fixed/sticky and seamlessly integrated without jumping on scroll.
- **Logo:** Image or SVG (Max 180x50px), containing both icon and text.
- **Navigation:** Active links must be highlighted. Use a hamburger offcanvas menu for screens < 1100px.
- **Toggles:** Theme Switcher (Dark/Light) and RTL Toggle. Must use icons or text styled to match buttons perfectly.
- **CTAs:** Max 2 right-aligned buttons (1 Primary, 1 Secondary) if a dashboard exists; otherwise, 1 Login/Contact button.

### Footer
- **Logo:** Identical height/width/alignment to the header logo. Company motto placed below.
- **Links:** Social media icons, "Quick Links" column, and "Resources" column.
- **Newsletter:** Email input with a subscribe button.
- **Bottom Bar:** Copyright year, Privacy Policy, Terms of Service.
- **Utility:** A "Back to Top" button with hover effects that doesn't overlap footer content.

### Hero Section
- **Home 1:** Center-aligned H1 + paragraph + 2 CTA buttons. Distinct visual style.
- **Home 2:** Premium alternative layout to Home 1.
- **Inner Pages:** Center-aligned H1 + paragraph, overlaid on a relevant background image.

---

## 4. Required Pages & Niche Adaptations

### Essential Standard Pages
Develop the following pages with their respective section counts:
- `home-1` Page: Minimum 5, maximum 7 sections always.
- `home-2` Page: Minimum 5, maximum 6 sections always.
- `about` Page: Minimum 3, maximum 4 sections always.
- `services` Page: Minimum 3, maximum 4 sections always.
- `service-details` Page: Minimum 2, maximum 3 sections always.
- `blog` Page: Minimum 3, maximum 4 sections always.
- `blog-details` Page: Minimum 2, maximum 4 sections always.
- `pricing` Page: Minimum 3, maximum 4 sections always. *Rule: If exactly 3 cards, highlight the middle "Popular" plan as Primary, others as Secondary.*
- `gallery` Page: Minimum 3, maximum 4 sections always.
- `booking` Page: Minimum 3, maximum 4 sections always.
- `contact` Page: Minimum 4, maximum 5 sections always.
- `dashboard` Pages: Minimum 3, maximum 4 sections always (applies to dashboard and menu-related pages).
- `404` Page: Minimum/maximum based on company name and necessary information.
- `coming-soon` Page: Minimum/maximum based on company name and necessary information.

### Authentication Pages (`login` & `signup/register`)
- **Strict Layout:** NO global header or footer.

**Login Page:**
- Place RTL and Theme Toggle buttons in the top right corner.
- The form should be centered on the page with proper top and bottom spacing.
- The form must include: email, password, forgot password link, remember me checkbox, login button, and signup link.
- Include social login options (Apple and Google).
- All fields must fit nicely on mobile screens.
- Include a password visibility toggle (eye icon) in the password field.

**Signup Page:**
- Place RTL and Theme Toggle buttons in the top right corner.
- The form should be centered on the page with proper top and bottom spacing.
- The form must include: first name and last name (or full name) matching the width of the email field, email, password, confirm password, signup button, and login link.
- Include social login options (Apple and Google).
- All fields must fit nicely on mobile screens.
- Include a password visibility toggle (eye icon) in the password field.
- Do NOT pre-fill demo credentials on signup.

### Dashboard Architecture
- **Layout:** Fixed or offcanvas side navigation (prevent horizontal scroll). NO global header/footer.
- **Components Required:** User Profile, Notifications, Welcome Message, Logout. Responsive charts and horizontal scrollable tables for mobile.
- **Admin Dashboard Pages:** Overview, User Management, Content, Orders, Settings, Analytics.
- **User Dashboard Pages:** Profile, Order History, Saved Items, Messages.

### Niche-Specific Menu & Feature Injection
Adapt the nav menu and features based on the exact website type requested:
- **Service-Based:** Home | Services | About | Contact (Add Appointment booking, calculators).
- **E-commerce:** Home | Shop | Categories | Deals | Blog | Account (Add filters, wishlist, cart, Admin+User dashboards).
- **SaaS/Digital:** Home | Features | Pricing | Docs | Login | Sign Up (Add API docs, comparison tables).
- **Booking/Reservation:** Home | Book Now | Services | Gallery | About | Contact (Add availability calendar).
- **LMS/Education:** Home | Courses | Instructors | Resources | Login | Sign Up (Add Student/Instructor dashboards).
- **Directory/Listing:** Home | Browse | Submit Listing | Blog | Help | Account (Add map integrations, advanced filters).

---

## 5. File Structure & Integrations

/project-root
├── /assets
│   ├── /css (style.css, dark-mode.css, rtl.css)
│   ├── /js (main.js, dashboard.js)
│   └── /images
└── (All HTML files)

```
**Placeholder Integrations Required:** future purpose
Contact Forms (Formspree/Netlify), Newsletters (Mailchimp/ConvertKit), Maps (Google Maps API), Booking calendars, Payments (Stripe/PayPal).

---
**Pre-Delivery Checklist:** 
[ ] W3C Validated HTML. 
[ ] No broken links. 
[ ] Cross-browser tested (Chrome, Safari, Firefox, Edge). 
[ ] Accessibility & responsiveness verified. 
[ ] Images optimized to WebP. 
[ ] Licenses/Credits attributed.

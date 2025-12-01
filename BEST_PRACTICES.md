# Project PA: Developer Best Practices

To ensure **Project PA** generates the most accurate, comprehensive, and seamless presentations for your application, follow these development guidelines. The AI relies on specific patterns in your code to understand the user journey and interact with elements.

## 1. Optimize Your README
The `README.md` is the **most critical** source of context for the AI.
*   **Describe the User Journey**: Explicitly explain how a user moves through your app (e.g., "Users start at the Landing Page, click 'Get Started' to go to Sign Up, then are redirected to the Dashboard").
*   **List Key Features**: Bullet points of main features help the AI decide what to highlight.

## 2. Use Semantic HTML
The Project PA analyzer specifically looks for semantic tags to understand page structure.
*   **Use `<nav>`**: Wrap your navigation menu in a `<nav>` tag. The AI uses this to understand your site's hierarchy.
*   **Use `<main>`**: Wrap the primary content of each page in a `<main>` tag.
*   **Use `<header>` and `<footer>`**: These help distinguish global elements from page-specific content.

## 3. Add Meaningful IDs (Critical for Interaction)
The AI needs robust CSS selectors to "click" buttons or "highlight" elements. **IDs are the most reliable selectors.**
*   **Bad**: `<button class="btn btn-primary">Login</button>` (Hard to select uniquely)
*   **Good**: `<button id="login-btn" class="btn btn-primary">Login</button>`
*   **Good**: `<section id="features-section">...</section>`

**Key elements to ID:**
*   Navigation links (`#nav-home`, `#nav-login`)
*   Call-to-Action buttons (`#cta-signup`, `#submit-order`)
*   Major sections (`#hero`, `#pricing`, `#testimonials`)
*   Form inputs (`#email-input`, `#password-input`)

## 4. meaningful File Names & Routes
*   Ensure your file names reflect their purpose (e.g., `Dashboard.tsx`, `UserProfile.vue`, `CheckoutPage.js`).
*   If using a router, keep route definitions clear so the AI can map URLs to components.

## 5. Keep Entry Points Clean
*   Ensure your `index.html` or main entry point has a clear `<title>` and `meta description`.

## Example of an Optimized Component

```jsx
// LandingPage.jsx
export default function LandingPage() {
  return (
    <main id="landing-page">
      <section id="hero">
        <h1>Welcome to SuperApp</h1>
        <p>The best app ever.</p>
        {/* The ID 'get-started-btn' makes it easy for Project PA to click this */}
        <button id="get-started-btn" onClick={handleSignup}>
          Get Started
        </button>
      </section>

      <section id="features">
        <h2>Features</h2>
        {/* ... */}
      </section>
    </main>
  );
}
```

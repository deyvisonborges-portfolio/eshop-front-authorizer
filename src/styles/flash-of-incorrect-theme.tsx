export const ThemeScript = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        const theme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', theme);
      })();
      `,
    }}
  />
);

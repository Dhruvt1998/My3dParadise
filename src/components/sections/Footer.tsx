import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="footer">
      <Container className="footer__inner">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <a href="#top">Back to top ↑</a>
      </Container>
    </footer>
  );
}

import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <a className="brand" href="#top" aria-label={`${siteConfig.name} home`}>
          <span className="brand__mark" aria-hidden="true">
            ◫
          </span>
          <span>{siteConfig.name}</span>
        </a>

        <nav className="nav" aria-label="Primary navigation">
          {siteConfig.nav.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </Container>
    </header>
  );
}

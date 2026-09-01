import { Container } from "@/components/atoms/Container";
import { siteConfig } from "@/config/site";
import Image from "next/image";

export function Header() {
  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <a className="brand" href="#top" aria-label={`${siteConfig.name} home`}>
          <Image src="/logo.webp" alt={siteConfig.name} width={112} height={112} className="brand__logo" priority />
          <span className="brand__text">{siteConfig.name}</span>
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

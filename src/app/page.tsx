import { Header } from "@/components/layout/header";
import { Scene } from "@/components/scene/scene";
import { About } from "@/components/sections/about";
import { Journey, Skills, TechWatch } from "@/components/sections/background";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Search } from "@/components/sections/search";
import { StructuredData } from "@/components/layout/structured-data";
import { InkReveal } from "@/components/ui/ink-reveal";

export default function Home() {
  return (
    <>
      <StructuredData />
      <a className="skip-link" href="#contenu">
        Aller au contenu
      </a>
      <Header />
      <Scene />
      <main id="contenu">
        <Hero />
        <About />
        <Search />
        <Projects />
        <Skills />
        <Journey />
        <TechWatch />
        <Contact />
      </main>
      <InkReveal />
    </>
  );
}

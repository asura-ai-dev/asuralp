import ChatBot from "../components/ChatBot";
import Faq from "../components/Faq";
import FinalCta from "../components/FinalCta";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Pain from "../components/Pain";
import PageEffects from "../components/PageEffects";
import Profile from "../components/Profile";
import Service from "../components/Service";
import Sns from "../components/Sns";
import Video from "../components/Video";
import Works from "../components/Works";

export default function Page() {
  return (
    <>
      <PageEffects />
      <Header />
      <main>
        <Hero />
        <Pain />
        <Service />
        <Video />
        <Works />
        <Profile />
        <Faq />
        <Sns />
        <FinalCta />
      </main>
      <footer className="site-footer">
        <div>© 2026 asura.dev | built solo, scaled with agents</div>
        <div>
          <span className="site-footer-led" />
          systems operational
        </div>
      </footer>
      <ChatBot />
    </>
  );
}

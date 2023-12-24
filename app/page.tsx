import HeroSection from "./components/HeroSection";
import OptionsFlowSection from "./components/OptionsFlowSection";
import FeaturesSection from "./components/FeaturesSection";
import HistoricalFlowSection from "./components/HistoricalFlowSection";
import TrackTradesSection from "./components/TrackTradesSection";
import MembershipSection from "./components/MembershipSection";
import DiscordSection from "./components/DiscordSection";
import ParticleEffect from "./components/ParticlesBackground/ParticlesBackground";

export default async function Home() {
  return (
    <main className="min-h-[100vh] flex flex-col items-center w-full overflow-hidden">
      <HeroSection />
      <ParticleEffect />
      <OptionsFlowSection />
      <FeaturesSection />
      <HistoricalFlowSection />
      <TrackTradesSection />
      <MembershipSection />
      <DiscordSection />
    </main>
  );
}

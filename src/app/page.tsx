import { HeaderNoAuth } from "@/components/homeNoAuth/headerNoAuth";
import { PresentationSection } from "@/components/homeNoAuth/presentationSection";

export default function HomeNotAuth() {
  return (
    <main className="dark:bg-black">
      <HeaderNoAuth />
      <PresentationSection />
    </main>
  );
}

import { lazy, Suspense } from "react";
import Chatbot from "../components/User/Chatbot";
import LoadingSpinner from "../components/Common/LoadingSpinner";

const Footer = lazy(() => import("../components/User/Footer"));
const Hero = lazy(() => import("../components/User/Hero"));

function LandingPage() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>
        <Hero />
          <Hero />
            <Hero />
              <Hero />
                <Hero />
        <Footer />
      </Suspense>

      <Chatbot />
    </>
  );
}

export default LandingPage;
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import JobIntro from "@/components/JobIntro";
import WantedSection from "@/components/WantedSection";
import Benefits from "@/components/Benefits";
import EntryCta from "@/components/EntryCta";
import EmployeeStories from "@/components/EmployeeStories";
import Career from "@/components/Career";
import SalesRole from "@/components/SalesRole";
import Matching from "@/components/Matching";
import Attraction from "@/components/Attraction";
import Company from "@/components/Company";
import JobDescription from "@/components/JobDescription";
import Faq from "@/components/Faq";
import EntryForm from "@/components/EntryForm";
import Footer from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <JobIntro />
        <WantedSection />
        <Benefits />
        <EntryCta />
        <EmployeeStories />
        <Career />
        <SalesRole />
        <Matching />
        <Attraction />
        <Company />
        <JobDescription />
        <Faq />
        <EntryForm />
      </main>
      <Footer />
    </>
  );
}

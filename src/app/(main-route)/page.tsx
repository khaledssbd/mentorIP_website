import { MainDashboardContent } from "@/components/home/MainContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "MentorIP | Global Intellectual Property Law Firm in Bangladesh",
  description: "MentorIP is a leading international IP law firm specializing in Trademarks, Patents, Copyrights, and Industrial Designs with global liaison offices.",
  keywords: ["Intellectual Property", "IP Law Firm", "Bangladesh", "Trademarks", "Patents", "Copyright", "MentorIP", "Legal Services"],
  openGraph: {
    title: "MentorIP | Global Intellectual Property Law Firm",
    description: "Protecting ideas and empowering brands with world-class IP legal services.",
    type: "website",
    siteName: "MentorIP",
  },
  twitter: {
    card: "summary_large_image",
    title: "MentorIP | Global Intellectual Property Law Firm",
    description: "Protecting ideas and empowering brands with world-class IP legal services.",
  }
};

export default async function Home() {
  return <MainDashboardContent />;
}

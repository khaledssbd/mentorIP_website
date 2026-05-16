import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | MentorIP - Comprehensive IP Legal Solutions",
  description: "Explore our full suite of intellectual property services including Trademark, Patent, Industrial Design, Copyright, and IP Litigation globally.",
  keywords: ["IP Services", "Trademark Registration", "Patent Filing", "Copyright Protection", "IP Litigation Bangladesh"],
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

import { Header } from "../../features/site-header/Header";
// import { Flyout } from "../../widgets/selected-items-flyout/Flyout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-bg text-text-primary">
      <Header />
      { children }
      {/* <Flyout /> */}
    </div>
  );
}
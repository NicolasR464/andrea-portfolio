import AdminTab from "@/components/AdminTab";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="translate-y-24">
      <AdminTab />
      {children}
    </section>
  );
}

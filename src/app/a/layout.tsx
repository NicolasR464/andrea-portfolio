import AdminTab from "@/components/AdminTab";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <AdminTab />
      {children}
    </section>
  );
}

import { WorkspaceHome } from "@/components/WorkspaceHome";
import { allInstructors } from "@/lib/catalogServer";
import { offers } from "@/lib/catalog";

export default async function HomePage() {
  const instructors = await allInstructors();
  return (
    <main>
      <WorkspaceHome offers={offers} instructors={instructors} />
    </main>
  );
}

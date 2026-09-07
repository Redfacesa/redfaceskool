import InstructorApplyForm from "@/components/InstructorApplyForm";
import { BRAND } from "@/lib/brand";

export default function TeachPage() {
  return (
    <main className="stack" style={{ maxWidth: 640 }}>
      <p className="kicker">Teach</p>
      <h1>Publish a profile. Start earning.</h1>
      <p>
        {BRAND.name} does not hire a faculty. Publish a profile. Later you will attach courses and live sessions.
        Students pay through RedFace Pay. You keep the instructor share.
      </p>
      <p className="muted">
        Default split: 80% instructor, 20% {BRAND.name}. Recorded on RedFace payment metadata. Not a second ledger here.
      </p>
      <InstructorApplyForm />
    </main>
  );
}

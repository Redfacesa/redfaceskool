import InstructorApplyForm from "@/components/InstructorApplyForm";

export default function TeachPage() {
  return (
    <main className="stack" style={{ maxWidth: 640 }}>
      <p className="kicker">Instructors</p>
      <h1>You know this. You can teach this.</h1>
      <p>
        Refesco does not hire a faculty. Publish a profile. Later you will attach courses and live sessions.
        Students pay through RedFace Pay. You keep the instructor share.
      </p>
      <p className="muted">
        Default split: 80% instructor, 20% Refesco. Recorded on RedFace payment metadata. Not a second ledger here.
      </p>
      <InstructorApplyForm />
    </main>
  );
}

import ReturnClient from "./ReturnClient";

export default async function CheckoutReturnPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const q = await searchParams;
  const enrollmentId = typeof q.enrollment === "string" ? q.enrollment : "";
  const demo = q.demo === "1";
  const free = q.free === "1";
  return <ReturnClient enrollmentId={enrollmentId} demo={demo} free={free} />;
}

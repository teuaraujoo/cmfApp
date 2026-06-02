import TurmaDetailsPage from "@/components/turmas/TurmaDetailsPage";

type TurmaDetailsRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TurmaDetailsRoute({
  params,
}: TurmaDetailsRouteProps) {
  const { id } = await params;

  return <TurmaDetailsPage turmaId={Number(id)} />;
}

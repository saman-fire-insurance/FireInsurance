import Content from "./components/content";

interface CasesPageProps {
  params: { id: string };
}

export default async function CasesPage({ params }: CasesPageProps) {
  const { id } = params;

  return <Content declarationId={id} />;
}

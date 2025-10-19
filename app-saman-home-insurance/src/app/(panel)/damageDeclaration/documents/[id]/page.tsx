import Content from "./components/content";

interface DocumentsPageProps {
  params: { id: string };
}

export default async function DocumentsPage({ params }: DocumentsPageProps) {
  const { id } = params;

  return <Content declarationId={id} />;
}

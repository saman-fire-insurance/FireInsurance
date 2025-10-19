import Content from "./components/content";

interface AccidentPageProps {
  params: { id: string };
}

export default async function AccidentPage({ params }: AccidentPageProps) {
  const { id } = params;

  return <Content declarationId={id} />;
}

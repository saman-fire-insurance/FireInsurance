import Content from "./components/content";

interface ReviewPageProps {
  params: { id: string };
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const { id } = params;

  return <Content declarationId={id} />;
}

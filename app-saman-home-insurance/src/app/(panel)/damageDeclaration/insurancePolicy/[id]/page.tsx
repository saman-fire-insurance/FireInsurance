import Content from "./components/content";

interface InsurancePolicyPageProps {
  params: { id: string };
}

export default async function InsurancePolicyPage({ params }: InsurancePolicyPageProps) {
  const { id } = params;

  return <Content declarationId={id} />;
}

import Container from '../Container';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string; question?: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Correctly structured generateMetadata
export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Example metadata generation logic
  const metadata: Metadata = {
    title: params.question + ' - My Site' + ' ' + searchParams.lang,
    // Assuming you would fetch and populate this data correctly
    description: ''
  };

  return metadata;
}

// Correct usage of metadata in a React component
export default function Page({ params, searchParams }: Props) {
  // Render logic based on params and searchParams
  // Use the Container component here if needed, not in generateMetadata
  return (
    <div>
      {/* Example rendering based on passed props */}
      <h1>{params.question}</h1>
      {/* More rendering logic here */}
      <Container questionNumber={params.question} lang={searchParams.lang} />
    </div>
  );
}

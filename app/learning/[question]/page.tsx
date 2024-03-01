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
  let data; //

  // fetch data
  try {
    const response = await fetch(`http://localhost:3000/api/${params.question}?lang=${searchParams.lang}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    console.log('title', data.name);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    // Handle the error according to your application's needs
    // For example, you might want to return a default metadata object or rethrow the error
  }
  // Example metadata generation logic
  const metadata: Metadata =  {
    title: data.order + ' - ' + data.name ,
    // Assuming you would fetch and populate this data correctly
    description: data.order + ' - ' + data.name
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

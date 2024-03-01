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
 const api_url = process.env.API_URL;
  // fetch data
  try {
     const response = await fetch(`${api_url}/api/${params.question}?lang=${searchParams.lang}`);
    // const response = await fetch(`http://localhost:3000/api/${params.question}?lang=${searchParams.lang}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    data = await response.json();
    console.log('title', data.name);
  } catch (error) {
    console.error("Failed to fetch product:", error);
    
  }

  const metadata: Metadata =  {
    title: data.order + ' - ' + data.name ,
    description: data.order + ' - ' + data.name
  };

  return metadata;
}


export default function Page({ params, searchParams }: Props) {

  return (


      <Container questionNumber={params.question} lang={searchParams.lang} />

  );
}

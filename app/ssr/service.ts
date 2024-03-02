export async function getData(questionNumber: Number, lang: string) {
  console.log('josh', process.env.NODE_ENV);
  console.log('josh public', process.env.NEXT_PUBLIC_API_URL);
    const api_url = process.env.NEXT_PUBLIC_API_URL;
   const buildUrl = `${api_url}/api/${questionNumber}?lang=${lang}`;
  //const buildUrl = `http://localhost:3000/api/${questionNumber}?lang=${lang}`;  //gabe
  console.log('Service.ts1: passed to api string', buildUrl);
  try {
    const response = await fetch(buildUrl);
    // const response = await fetch(`http://localhost:3000/api/${params.question}?lang=${searchParams.lang}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
}

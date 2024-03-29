export async function getData(
  questionNumber: Number,
  lang: string | string[] | undefined
) {
  const api_url = process.env.NEXT_PUBLIC_API_URL;
  const buildUrl = `${api_url}/api/${questionNumber}?lang=${lang}`;

  try {
    const response = await fetch(buildUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch product:', error);
  }
}

import LanguageSelector from '../QuestionLangSelect';
import { Flex, Box, Stack } from '@chakra-ui/react';
import SwitchLang from '../SwitchLang';
import styles from '../QuestionContainer.module.css';
import { cleanUrl, languageFlags } from '../util';
import { getData } from '../service';
import Link from 'next/link';
// import { Metadata, ResolvingMetadata } from 'next';

// type Props = {
//   params: { id: string; question?: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   let data; //
//  const api_url = process.env.API_URL;
//   // fetch data
//   try {
//      const response = await fetch(`${api_url}/api/${params.question}?lang=${searchParams.lang}`);
//     // const response = await fetch(`http://localhost:3000/api/${params.question}?lang=${searchParams.lang}`);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     data = await response.json();
//     console.log('title', data.name);
//   } catch (error) {
//     console.error("Failed to fetch product:", error);

//   }

//   const metadata: Metadata =  {
//     title: data.order + ' - ' + data.name ,
//     description: data.order + ' - ' + data.name
//   };

//   return metadata;
// }

const cleanParamsMakeIntoNumber = (obj: any) => {
  //console.log('pages: cleanParams: obj: ', obj);
  const questionStr = obj.params.question;
  const res = questionStr.split('-', 1)[0];
  //console.log('pages: cleanParams: res: ', res);
  return res;
};

export default async function Page(props: any) {
  //console.log('pages here1: Page(): ', props);
  const onlyNumberNoText = cleanParamsMakeIntoNumber(props);
  //console.log('pages: Page(): onlyNumberNoText', onlyNumberNoText);
  const searchParams = props.searchParams.lang;
  const data = await getData(onlyNumberNoText, searchParams);

  let next = parseInt(data.order) + 1;
  let prev = parseInt(data.order) - 1;

  let selectedLanguage = searchParams;
  let selectedFlag = languageFlags[searchParams];
  const currentUrl = `${onlyNumberNoText}-${cleanUrl(
    data.name
  )}?lang=${searchParams}`;

  const answerButtonStyle = (answerKey: any) => {
    return answerKey === data.correct
      ? 'mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-left'
      : 'mt-4 bg-gray-100 hover:bg-gray-200 text-black  py-2 px-4 rounded w-full text-left';
  };

  //console.log(next, searchParams);
  const nextQuestion = await getData(next, searchParams);
  const cleanNextUrl = cleanUrl(nextQuestion.name);
  //console.log('nextQuestion', nextQuestion.name);

  // const flip = () => {};
  return (
    <>
      <div className={styles.Container}>
        <Flex justifyContent="center" alignItems="center">
          <Box p="4">
            <LanguageSelector questionNumber={data.order} lang={searchParams} />
          </Box>
        </Flex>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          bg="white"
          p={8}
          maxW="md"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
          mx="auto"
          minH="450px"
        >
          {data.name}
          {data.image == 'y' && (
            <img
              src={`../images/${data.order}.png`}
              alt={data.name}
              className="object-scale-down h-48 w-96"
            />
          )}
          <Stack spacing={0} direction="column" mt={0}>
            <button className={answerButtonStyle('A')} disabled>
              {data.answerA}
            </button>
            <button className={answerButtonStyle('B')} disabled>
              {data.answerB}
            </button>
            <button className={answerButtonStyle('C')} disabled>
              {data.answerC}
            </button>
            <button className={answerButtonStyle('D')} disabled>
              {data.answerD}
            </button>
          </Stack>
          <div className={styles.navBottom}>
            <Link
              href={
                prev >= 1
                  ? `${prev}-${cleanNextUrl}?lang=${selectedLanguage}`
                  : '#'
              }
              className={`px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-lg transition duration-150 ease-in-out ${
                prev < 1
                  ? 'cursor-not-allowed bg-green-300 shadow-sm'
                  : 'hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
              }`}
            >
              Prev
            </Link>
            <SwitchLang
              selectedLanguage={selectedLanguage}
              selectedFlag={selectedFlag}
              questionNumber={onlyNumberNoText}
            />

            <Link
              href={`${next}-${cleanNextUrl}?lang=${selectedLanguage}`}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg transition duration-150 ease-in-out"
            >
              Next
            </Link>
          </div>
        </Box>
        <div className="text-center p-6">
          <span>{data.order} of 301</span>
        </div>
      </div>
    </>
  );
}

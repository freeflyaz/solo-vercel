import LanguageSelector from '../QuestionLangSelect';
import { Flex, Box, Stack } from '@chakra-ui/react';
import SwitchLang from '../SwitchLang';
import styles from '../QuestionContainer.module.css';
import { cleanUrl, languageFlags } from '../util';
import { getData } from '../service';
import Link from 'next/link';
import { Metadata } from 'next';
import { Props } from '../../types';

export async function generateStaticParams() {
  return [
    {
      question:
        '1-Deutschland-ist-ein-Rechtsstaat--Was-ist-damit-gemeint-?lang=de'
    },
    { question: '2-Was-verbietet-das-deutsche-Grundgesetz-?lang=de' }
  ];
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const onlyNumberNoText = cleanParamsMakeIntoNumber(props);
  const searchParams = props.searchParams.lang;
  const data = await getData(onlyNumberNoText, searchParams);

  const metadata: Metadata = {
    title: 'Einbürgerungstest: ' + data.order + ' - ' + data.name,
    description: data.order + ' - ' + data.name
  };
  return metadata;
}

const cleanParamsMakeIntoNumber = (obj: Props) => {
  const questionStr = obj.params.question;
  const res = Number(questionStr.split('-', 1)[0]);
  return res;
};

export default async function Page(props: Props) {
  const onlyNumberNoText = cleanParamsMakeIntoNumber(props);
  const searchParams = props.searchParams.lang;

  let searchParamOldLang = 'de';
  if (typeof props.searchParams.oldLang === 'string') {
    searchParamOldLang = props.searchParams.oldLang;
  }

  const data = await getData(onlyNumberNoText, searchParams);
  if (data === undefined) return null;

  let next = parseInt(data.order) + 1;
  let prev = parseInt(data.order) - 1;

  let selectedLanguage = 'de';
  if (typeof searchParams === 'string') {
    selectedLanguage = searchParams;
  }

  let selectedFlag = languageFlags['de'];
  if (typeof searchParams === 'string') {
    selectedFlag = languageFlags[searchParams];
  }
  const currentUrl = `${onlyNumberNoText}-${cleanUrl(
    data.name
  )}?lang=${searchParams}`;

  const answerButtonStyle = (answerKey: any) => {
    return answerKey === data.correct
      ? 'mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full text-left'
      : 'mt-4 bg-gray-100 hover:bg-gray-200 text-black  py-2 px-4 rounded w-full text-left';
  };

  const nextQuestion = await getData(next, searchParams);
  const cleanNextUrl = cleanUrl(nextQuestion.name);

  function generateHref() {
    let href = '#';

    if (prev >= 1 && searchParamOldLang === undefined) {
      href = `${prev}-${cleanNextUrl}?lang=${selectedLanguage}`;
    } else if (prev >= 1 && searchParamOldLang !== undefined) {
      href = `${prev}-${cleanNextUrl}?lang=${selectedLanguage}&oldLang=${searchParamOldLang}`;
    }

    return href;
  }
  let lang = 'de';
  if (typeof props.searchParams.lang === 'string') {
    lang = props.searchParams.lang;
  }

  return (
    <>
      <div className={styles.Container}>
        <Flex justifyContent="center" alignItems="center">
          <Box p="4">
            <LanguageSelector questionNumber={data.order} lang={lang} />
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
              href={generateHref()}
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
              searchParamOldLang={searchParamOldLang}
            />

            <Link
              href={
                searchParamOldLang === undefined
                  ? `${next}-${cleanNextUrl}?lang=${selectedLanguage}`
                  : `${next}-${cleanNextUrl}?lang=${selectedLanguage}&oldLang=${searchParamOldLang}`
              }
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

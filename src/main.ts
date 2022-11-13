declare const Cheerio: cheerio.CheerioAPI;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onOpen = () => {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('スクリプト')
    .addItem('配信作品情報取得', 'gatherInformationOnStreamingFromPrimeVideo')
    .addToUi();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const gatherInformationOnStreamingFromPrimeVideo = () => {
  const urls = getUrls();
  const videosByUrls = urls.map((url) => extractVideoInfoFromPrimeVideo(url));
  const videos = videosByUrls.flat();
  const keys = [['作品画像', '作品名', 'URL']];
  const values = keys.concat(
    videos.map((video) => [`=IMAGE("${video.image}")`, video.title, video.link])
  );
  setCellValues(values, '配信作品一覧');
};

const extractVideoInfoFromPrimeVideo = (url: string) => {
  const content = getContentFromUrl(url);
  Utilities.sleep(1000);
  const $ = Cheerio.load(content);
  return $('.av-hover-wrapper')
    .toArray()
    .map((x) => {
      const titleLink = $(x).find('.av-beard-title-link');
      const link = titleLink.attr('href') ?? '/';
      const domain = url.match(/https?:\/{2,}(.*?)(?:\/|\?|#|$)/) || [''];
      const path = isUrl(link)
        ? link
        : `${removeTrailingSlash(domain[0])}/${removeLeadingSlash(link)}`;
      const imgSrc = $(x).find('img').first().attr('src') ?? '';
      return {
        title: titleLink.text(),
        link: path,
        image: imgSrc,
      };
    });
};

const getCellValues = (sheetName?: string) => {
  const sheet = getSheet(sheetName);
  const range = sheet.getDataRange();
  const values = range.getValues();
  return values;
};

const getContentFromUrl = (url: string) => {
  return UrlFetchApp.fetch(url).getContentText();
};

const getSheet = (sheetName?: string) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = sheetName
    ? ss.getSheetByName(sheetName) ?? ss.getActiveSheet()
    : ss.getActiveSheet();
  return sheet;
};

const getUrls = (): string[] => {
  const cellValues = getCellValues('URL');
  const values = cellValues.map((value) => value[0]);
  const urls = values.filter((value) => isUrl(value));
  return urls;
};

const isUrl = (str: string) => {
  return /https?:\/\/(\w|[!?/+\-_~=;.,*&@#$%()'[\]])+/.test(str);
};

const removeLeadingSlash = (path: string) => {
  return path.startsWith('/') ? path.substring(1) : path;
};

const removeTrailingSlash = (path: string) => {
  return path.endsWith('/') ? path.substring(0, path.length - 1) : path;
};

const setCellValues = (
  values: Array<(string | number)[]>,
  sheetName?: string
) => {
  const sheet = getSheet(sheetName);
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
};

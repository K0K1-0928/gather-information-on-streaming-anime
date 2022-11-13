"use strict";
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
    const values = keys.concat(videos.map((video) => [`=IMAGE("${video.image}")`, video.title, video.link]));
    setCellValues(values, '配信作品一覧');
};
const extractVideoInfoFromPrimeVideo = (url) => {
    const content = getContentFromUrl(url);
    Utilities.sleep(1000);
    const $ = Cheerio.load(content);
    return $('.av-hover-wrapper')
        .toArray()
        .map((x) => {
        var _a, _b;
        const titleLink = $(x).find('.av-beard-title-link');
        const link = (_a = titleLink.attr('href')) !== null && _a !== void 0 ? _a : '/';
        const domain = url.match(/https?:\/{2,}(.*?)(?:\/|\?|#|$)/) || [''];
        const path = isUrl(link)
            ? link
            : `${removeTrailingSlash(domain[0])}/${removeLeadingSlash(link)}`;
        const imgSrc = (_b = $(x).find('img').first().attr('src')) !== null && _b !== void 0 ? _b : '';
        return {
            title: titleLink.text(),
            link: path,
            image: imgSrc,
        };
    });
};
const getCellValues = (sheetName) => {
    const sheet = getSheet(sheetName);
    const range = sheet.getDataRange();
    const values = range.getValues();
    return values;
};
const getContentFromUrl = (url) => {
    return UrlFetchApp.fetch(url).getContentText();
};
const getSheet = (sheetName) => {
    var _a;
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = sheetName
        ? (_a = ss.getSheetByName(sheetName)) !== null && _a !== void 0 ? _a : ss.getActiveSheet()
        : ss.getActiveSheet();
    return sheet;
};
const getUrls = () => {
    const cellValues = getCellValues('URL');
    const values = cellValues.map((value) => value[0]);
    const urls = values.filter((value) => isUrl(value));
    return urls;
};
const isUrl = (str) => {
    return /https?:\/\/(\w|[!?/+\-_~=;.,*&@#$%()'[\]])+/.test(str);
};
const removeLeadingSlash = (path) => {
    return path.startsWith('/') ? path.substring(1) : path;
};
const removeTrailingSlash = (path) => {
    return path.endsWith('/') ? path.substring(0, path.length - 1) : path;
};
const setCellValues = (values, sheetName) => {
    const sheet = getSheet(sheetName);
    sheet.getRange(1, 1, values.length, values[0].length).setValues(values);
};

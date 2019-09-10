let page = null;

const makePage = async browser => {
  if (page) return page;

  // eslint-disable-next-line require-atomic-updates
  page = await browser.newPage();

  await page.setRequestInterception(true);

  page.on('request', request => {
    if (request.resourceType() === 'image') request.abort();
    else request.continue();
  });

  return page;
};

export { makePage };

// eslint-disable-next-line no-undef
const parse = () => __NEXT_DATA__.props.pageProps.page.config;
const waitExpression = () => window.__NEXT_DATA__ && window.__NEXT_DATA__.props;

export { parse, waitExpression };

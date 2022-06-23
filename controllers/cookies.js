export const setCookies = (req, res) => {
  res.setHeader('Set-Cookie', [
    'custom1=i_am_a_custom_cookie',
    'custom2=i_am_a_custom_cookie',
  ]);
  res.end();
};

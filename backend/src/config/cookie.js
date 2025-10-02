const baseCookieOption = (isProduction, maxAge) => ({
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? 'none' : 'lax',
  maxAge,
  path: '/auth/refresh',
});

module.exports = (nodeEnv, maxAge) => {
  const isProduction = nodeEnv === 'production';
  return {
    COOKIE_OPTIONS: baseCookieOption(isProduction, maxAge),
    REFRESH_COOKIE_NAME: 'refreshToken',
  };
};

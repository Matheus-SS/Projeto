type Config = {
  CORS_ORIGIN: string;
  DOMAIN_COOKIE: string;
  SAME_SITE_COOKIE: string | boolean;
  SECURE_COOKIE: string | boolean;
  DATABASE_HOST: string;
  DATABASE_USERNAME: string;
  DATABASE_PASSWORD: string;
  DATABASE: string;
};

export const config: Config = {
  CORS_ORIGIN: process.env.CORS_ORIGIN || 'http://localhost:8080',
  DOMAIN_COOKIE: process.env.DOMAIN_COOKIE || 'localhost',
  SAME_SITE_COOKIE: process.env.SAME_SITE_COOKIE || false,
  SECURE_COOKIE: process.env.SECURE_COOKIE || false,
  DATABASE_HOST: process.env.DATABASE_HOST || 'silly.db.elephantsql.com',
  DATABASE_USERNAME: process.env.DATABASE_USERNAME || 'rdayqmiv',
  DATABASE_PASSWORD:
    process.env.DATABASE_PASSWORD || 'L7GABvzWbfSKA-Wlw2X6rcox1k5lJUf2',
  DATABASE: process.env.DATABASE || 'rdayqmiv',
};

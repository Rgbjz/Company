import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'uk'];

export default getRequestConfig(async ({ requestLocale }) => {
  // В новых версиях next-intl мы получаем requestLocale (и это промис)
  let locale = await requestLocale;
  
  // Фолбэк на украинский, если локаль не определилась
  const validLocale = locale || 'uk';

  // Проверяем, есть ли такой язык в нашем массиве
  if (!locales.includes(validLocale)) notFound();

  return {
    locale: validLocale,
    // Загружаем нужный JSON
    messages: (await import(`../messages/${validLocale}.json`)).default
  };
});
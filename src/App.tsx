import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { Outlet } from 'react-router-dom';

import { LanguageDropdown } from '@components/LanguageDropdown';
import { Title } from '@components/Title';

export const App = () => {
  const [language, setLanguage] = useState('zh');
  const { t, i18n } = useTranslation();
  const changeLanguage = async (lng: string): Promise<void> => {
    setLanguage(lng);
    await i18n.changeLanguage(lng);
  };
  return (
    <div className="App">
      <Title text={t('title')} />
      <LanguageDropdown language={language} changeLanguage={changeLanguage} />
      <Outlet />
    </div>
  );
};

import { useTranslation } from 'react-i18next';

const LANGUAGES: { [index: string]: string } = {
  zh: 'π¨π³ δΈ­ζ',
  en: 'π¬π§ English',
};

interface LanguageDropdownProps {
  language: string;
  changeLanguage: (lng: string) => void;
}

export const LanguageDropdown = ({
  language,
  changeLanguage,
}: LanguageDropdownProps): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <label htmlFor="language-select">{t('language')}</label>{' '}
      <select
        id="language-select"
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        {Object.entries(LANGUAGES).map(([value, label]) => {
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
};

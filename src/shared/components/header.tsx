import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => i18n.changeLanguage('en')}>EN</button>
      <button onClick={() => i18n.changeLanguage('fi')}>FI</button>
      <button onClick={() => i18n.changeLanguage('sv')}>SV</button>
    </div>
  );
};
export default Header;

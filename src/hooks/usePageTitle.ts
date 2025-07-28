import { useEffect } from 'react';

/**
 * Hook pour mettre à jour dynamiquement le titre de la page.
 * @param {string} title - Le titre de la page.
 */
const usePageTitle = (title: string): void => {
  useEffect(() => {
    document.title = `Anjaranaka - ${title}`;
  }, [title]);
};

export default usePageTitle;
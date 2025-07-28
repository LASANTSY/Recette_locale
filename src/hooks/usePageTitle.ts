import { useEffect } from 'react';

/**
 * Hook pour mettre à jour dynamiquement le titre de la page.
 * @param {string} title - Le titre de la page.
 */

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = `Anjaranaka - ${title}`;
  }, [title]);
};

export default usePageTitle;

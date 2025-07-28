import type { ReactNode } from 'react';

export interface AppRoute {
  index?: boolean;
  path?: string;
  element: ReactNode;
}

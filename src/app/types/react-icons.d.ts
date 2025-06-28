import * as React from 'react';

declare module 'react-icons/*' {
  // Define que todos os ícones exportados são React.FC que retornam elementos SVG válidos.
  export type IconType = React.FC<React.SVGProps<SVGSVGElement>>;
}

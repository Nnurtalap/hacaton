import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { JSX } from 'react';

type TStatus = 'чистая' | 'грязная' | 'оптимально' | 'повреждена';

interface Istatus {
  status: TStatus;
}

enum Estatus {
  'чистая' = 'clean',
  'грязная' = 'dirty',
  'оптимально' = 'intact',
  'повреждена' = 'damaged',
}

const icons: Record<Estatus, JSX.Element> = {
  [Estatus.чистая]: <CheckCircle className="w-4 h-4" />,
  [Estatus.грязная]: <X className="w-4 h-4" />,
  [Estatus.оптимально]: <CheckCircle className="w-4 h-4" />,
  [Estatus.повреждена]: <AlertCircle className="w-4 h-4" />,
};

export const ResultTag = ({ status }: Istatus) => {
  const statusInRussian = Estatus[status];
  return (
    <div className="flex items-center gap-2">
      <span>{icons[statusInRussian]}</span>
      <span>{status}</span>
    </div>
  );
};

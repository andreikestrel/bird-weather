import Icon from '../icon';

interface CardProps {
  cidade: string;
  temperatura: number;
  estado: string;
}

function Card({ cidade, temperatura, pais }: CardProps) {
  return (
    <div className="w-80 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight dark:text-white text-[blue]">
        {cidade}, {pais}
      </h5>
      <div className="flex items-center justify-end gap-x-5">
        <Icon />
        <p className="font-normal text-xl dark:text-gray-300 text-[blue]">{temperatura}º</p>
      </div>
    </div>
  );
}

export default Card;

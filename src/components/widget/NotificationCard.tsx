import { useState, FC } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface NotificationProps {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  isReaded: boolean;
}

const NotificationCard: FC<NotificationProps> = ({
  id,
  title,
  content,
  createdAt,
  isReaded,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("fr-FR", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div
      className={`max-w-md rounded-sm shadow-md ${!isReaded ? "shadow-primary" : ""} border-[#EEEEEE] bg-white p-4 text-black transition-all duration-200 dark:border-strokedark dark:bg-boxdark dark:text-white  `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {!isReaded && <div className="h-2 w-2 rounded-full bg-primary" />}
            <h3 className="font-semibold ">{title}</h3>
          </div>
          <p className="mt-1 text-sm">{formatDate(createdAt)}</p>
        </div>

        <button
          key={id}
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
          //  aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <div
        className={`mt-2 overflow-hidden transition-all duration-200 ${isExpanded ? "max-h-96" : "max-h-0"}`}
      >
        <p className="">{content}</p>
      </div>
    </div>
  );
};

export default NotificationCard;
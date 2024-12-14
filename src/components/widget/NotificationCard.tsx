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

  const baseClasses = `max-w-md rounded-sm shadow-md ${!isReaded ? "shadow-primary" : ""} p-4 transition-all duration-200 border-[#EEEEEE] dark:border-strokedark text-black dark:text-white bg-white dark:bg-boxdark `;
  const bgColor = isReaded ? "bg-white'" : "bg-primary'";
  const contentClasses = `mt-2 transition-all duration-200 overflow-hidden ${isExpanded ? "max-h-96" : "max-h-0"}`;

  return (
    <div className={`${baseClasses} ${bgColor}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2">
            {!isReaded && <div className="h-2 w-2 rounded-full bg-primary" />}
            <h3 className="font-semibold ">{title}</h3>
          </div>
          <p className="mt-1 text-sm">{formatDate(createdAt)}</p>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="rounded-full p-1 transition-colors duration-200 hover:bg-gray-100"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
      </div>

      <div className={contentClasses}>
        <p className="">{content}</p>
      </div>
    </div>
  );
};

export default NotificationCard;

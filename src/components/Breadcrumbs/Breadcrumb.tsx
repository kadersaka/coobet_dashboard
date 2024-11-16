import Link from "next/link";
import { ReactNode } from "react";
interface BreadcrumbProps {
  pageName: string;

  children?: ReactNode;
}
const Breadcrumb = ({ pageName, children }: BreadcrumbProps) => {
  return (
    <div
      className={`flex flex-col gap-3  sm:flex-row sm:items-center sm:justify-between md:mb-16 `}
    >
      <span className="flex items-center text-title-md2 font-semibold text-black dark:text-white">
        {pageName}
      </span>

      {children ? (
        children
      ) : (
        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" href="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Breadcrumb;

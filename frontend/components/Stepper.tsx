export default function Stepper({ next}: { next:number }) {
  return (
    <>
    
      <ol className="flex justify-center items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0 rtl:space-x-reverse">
        <li
          className={`flex items-center ${
            next < 5
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          } space-x-2.5 rtl:space-x-reverse`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 border
                    ${
                      next < 5
                        ? "border-blue-600 rounded-full shrink-0 dark:border-blue-500"
                        : "border-gray-500 rounded-full shrink-0 dark:border-gray-400"
                    }`}
          >
            1
          </span>
        </li>
        <li
          className={`flex items-center ${
            next < 10 && next >= 5
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          } space-x-2.5 rtl:space-x-reverse`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 border
                    ${
                      next < 10 && next >= 5
                        ? "border-blue-600 rounded-full shrink-0 dark:border-blue-500"
                        : "border-gray-500 rounded-full shrink-0 dark:border-gray-400"
                    }`}
          >
            2
          </span>
        </li>
        <li
          className={`flex items-center ${
            next < 15 && next >= 10
              ? "text-blue-600 dark:text-blue-500"
              : "text-gray-500 dark:text-gray-400"
          } space-x-2.5 rtl:space-x-reverse`}
        >
          <span
            className={`flex items-center justify-center w-6 h-6 border
                    ${
                      next < 15 && next >= 10
                        ? "border-blue-600 rounded-full shrink-0 dark:border-blue-500"
                        : "border-gray-500 rounded-full shrink-0 dark:border-gray-400"
                    }`}
          >
            3
          </span>
        </li>
      </ol>
    </>
  );
}

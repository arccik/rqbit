import { HelpCircle, Pause, Play, Settings, Square } from "lucide-react";

export default function SideBar() {
  return (
    <aside
      id="logo-sidebar"
      className="fixed top-0 left-0 z-40 w-48 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 duration-300">
        <span className="flex items-center ps-2.5 mb-16 cursor-pointer">
          <img
            src="/assets/logo.png"
            className="h-6 me-3 sm:h-7"
            alt="RQBiT Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            RQBiT
          </span>
        </span>
        <ul className="space-y-2 font-medium cursor-pointer">
          <li>
            <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Play />
              <span className="ms-3">Downloading</span>
            </span>
          </li>

          <li>
            <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Pause />
              <span className="flex-1 ms-3 whitespace-nowrap">Waiting</span>
              <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
                10
              </span>
            </span>
          </li>
          <li>
            <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Square />
              <span className="flex-1 ms-3 whitespace-nowrap">Stopped</span>
              <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                3
              </span>
            </span>
          </li>
          <div className="flex fixed flex-col gap-5 items-center inset-x-0 bottom-5  text-gray-900 rounded-lg dark:text-white hover:cursor-pointer">
            <span className="flex flex-col items-center">
              <HelpCircle />
              <span className="flex-1 whitespace-nowrap">Help</span>
            </span>
            <span className="flex flex-col items-center">
              <Settings />
              <span className="flex-1 whitespace-nowrap">Settings</span>
            </span>
          </div>
        </ul>
      </div>
    </aside>
  );
}

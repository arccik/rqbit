import { useContext, useEffect, useState } from "react";
import { TorrentId, ErrorDetails as ApiErrorDetails } from "./api-types";
import { AppContext, APIContext } from "./context";
import { RootContent } from "./components/RootContent";
import { customSetInterval } from "./helper/customSetInterval";
import { IconButton } from "./components/buttons/IconButton";
import { BsBodyText, BsMoon } from "react-icons/bs";
import { LogStreamModal } from "./components/modal/LogStreamModal";
import { Header } from "./components/Header";
import { DarkMode } from "./helper/darkMode";

export interface ErrorWithLabel {
  text: string;
  details?: ApiErrorDetails;
}

export interface ContextType {
  setCloseableError: (error: ErrorWithLabel | null) => void;
  refreshTorrents: () => void;
}

export const RqbitWebUI = (props: {
  title: string;
  menuButtons?: JSX.Element[];
}) => {
  const [closeableError, setCloseableError] = useState<ErrorWithLabel | null>(
    null
  );
  const [otherError, setOtherError] = useState<ErrorWithLabel | null>(null);

  const [torrents, setTorrents] = useState<Array<TorrentId> | null>(null);
  const [torrentsLoading, setTorrentsLoading] = useState(false);
  let [logsOpened, setLogsOpened] = useState<boolean>(false);

  const API = useContext(APIContext);

  const refreshTorrents = async () => {
    setTorrentsLoading(true);
    let torrents = await API.listTorrents().finally(() =>
      setTorrentsLoading(false)
    );
    setTorrents(torrents.torrents);
  };

  useEffect(() => {
    return customSetInterval(
      async () =>
        refreshTorrents().then(
          () => {
            setOtherError(null);
            return 5000;
          },
          (e) => {
            setOtherError({ text: "Error refreshing torrents", details: e });
            console.error(e);
            return 5000;
          }
        ),
      0
    );
  }, []);

  const context: ContextType = {
    setCloseableError,
    refreshTorrents,
  };

  return (
    <AppContext.Provider value={context}>
      <div className="dark:bg-gray-900 dark:text-zinc-50 min-h-screen">
        <Header title={props.title} />
        <div className="relative">
          {/* Menu buttons */}
          <div className="absolute top-0 start-0 pl-2 z-10">
            {props.menuButtons &&
              props.menuButtons.map((b, i) => <span key={i}>{b}</span>)}
            <IconButton onClick={() => setLogsOpened(true)}>
              <BsBodyText />
            </IconButton>
            <IconButton onClick={DarkMode.toggle}>
              <BsMoon />
            </IconButton>
          </div>

          <RootContent
            closeableError={closeableError}
            otherError={otherError}
            torrents={torrents}
            torrentsLoading={torrentsLoading}
          />
        </div>

        <LogStreamModal
          show={logsOpened}
          onClose={() => setLogsOpened(false)}
        />
      </div>
    </AppContext.Provider>
  );
};

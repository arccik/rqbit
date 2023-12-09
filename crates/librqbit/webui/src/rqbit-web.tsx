import { useContext, useEffect, useState } from "react";
import { TorrentId, ErrorType } from "./api-types";
import { AppContext, APIContext } from "./context";
import { RootContent } from "./components/RootContent";
import { customSetInterval } from "./helper/customSetInterval";



export interface ContextType {
  setCloseableError: (error: ErrorType | null) => void;
  refreshTorrents: () => void;
}

export const RqbitWebUI = (props: { title: string }) => {
  const [closeableError, setCloseableError] = useState<ErrorType | null>(null);
  const [otherError, setOtherError] = useState<ErrorType | null>(null);

  const [torrents, setTorrents] = useState<Array<TorrentId> | null>(null);
  const [torrentsLoading, setTorrentsLoading] = useState(false);
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
      <div className="text-center">
        <h1 className="mt-3 mb-4 text-blue-500">{props.title}</h1>
        <RootContent
          closeableError={closeableError}
          otherError={otherError}
          torrents={torrents}
          torrentsLoading={torrentsLoading}
        />
      </div>
    </AppContext.Provider>
  );
};

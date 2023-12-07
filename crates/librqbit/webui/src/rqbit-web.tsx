import { useContext, useEffect, useState } from "react";
import {
  TorrentId,
  ErrorDetails as ApiErrorDetails,
  ContextType,
  ErrorType,
} from "./api-types";

import { ErrorComponent } from "./components/ErrorComponent";

import { AppContext, APIContext } from "./components/context";
import { Buttons } from "./components/Buttons";
import { TorrentsList } from "./components/table/TorrentsList";
import { customSetInterval } from "./helper/customSetInterval";
import WrapperContainer from "./components/layout/Container";

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
      {/* <h1 className="absolute ml-28 text-2xl">{props.title}</h1> */}
      <RootContent
        closeableError={closeableError}
        otherError={otherError}
        torrents={torrents}
        torrentsLoading={torrentsLoading}
      />
    </AppContext.Provider>
  );
};

const RootContent = (props: {
  closeableError: ApiErrorDetails | null;
  otherError: ApiErrorDetails | null;
  torrents: Array<TorrentId> | null;
  torrentsLoading: boolean;
}) => {
  let ctx = useContext(AppContext);
  return (
    <WrapperContainer>
      <ErrorComponent
        error={props.closeableError}
        remove={() => ctx.setCloseableError(null)}
      />
      <ErrorComponent error={props.otherError} />
      {/* <p className="text-2xl">RQBiT</p> */}
      <div className="flex justify-between">
        <p className="mt-3 ml-4 text-2xl font-bold text-slate-600">RQBiT</p>
        <Buttons />
      </div>
      <TorrentsList torrents={props.torrents} loading={props.torrentsLoading} />
    </WrapperContainer>
  );
};

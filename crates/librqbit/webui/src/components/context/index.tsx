import { createContext } from "react";
import { ContextType, RqbitAPI } from "../../api-types";

export const AppContext = createContext<ContextType>({
  setCloseableError: (_) => {},
  refreshTorrents: () => {},
});
export const RefreshTorrentStatsContext = createContext({ refresh: () => {} });

export const APIContext = createContext<RqbitAPI>({
  listTorrents: () => {
    throw new Error("Function not implemented.");
  },
  getTorrentDetails: () => {
    throw new Error("Function not implemented.");
  },
  getTorrentStats: () => {
    throw new Error("Function not implemented.");
  },
  uploadTorrent: () => {
    throw new Error("Function not implemented.");
  },
  pause: () => {
    throw new Error("Function not implemented.");
  },
  start: () => {
    throw new Error("Function not implemented.");
  },
  forget: () => {
    throw new Error("Function not implemented.");
  },
  delete: () => {
    throw new Error("Function not implemented.");
  },
});

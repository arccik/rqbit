import React, { useContext, useEffect, useState } from "react";
import { APIContext } from "./context/index";
import Button from "react-bootstrap/esm/Button";
import {
  AddTorrentResponse,
  ErrorDetails as ApiErrorDetails,
  ErrorType,
} from "../api-types";
import { FileSelectionModal } from "./FileSelectionModal";

export const UploadButton: React.FC<{
  buttonText: string;
  onClick: () => void;
  data: string | File | null;
  resetData: () => void;
  variant: string;
}> = ({ buttonText, onClick, data, resetData, variant }) => {
  const [loading, setLoading] = useState(false);
  const [listTorrentResponse, setListTorrentResponse] =
    useState<AddTorrentResponse | null>(null);
  const [listTorrentError, setListTorrentError] = useState<ErrorType | null>(
    null
  );
  const API = useContext(APIContext);

  // Get the torrent file list if there's data.
  useEffect(() => {
    if (data === null) {
      return;
    }

    let t = setTimeout(async () => {
      setLoading(true);
      try {
        const response = await API.uploadTorrent(data, { list_only: true });
        setListTorrentResponse(response);
      } catch (e) {
        setListTorrentError({
          text: "Error listing torrent files",
          details: e as ApiErrorDetails,
        });
      } finally {
        setLoading(false);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [data]);

  const clear = () => {
    resetData();
    setListTorrentError(null);
    setListTorrentResponse(null);
    setLoading(false);
  };

  return (
    <>
      <Button variant={variant} onClick={onClick} className="m-1">
        {buttonText}
      </Button>

      {data && (
        <FileSelectionModal
          onHide={clear}
          listTorrentError={listTorrentError}
          listTorrentResponse={listTorrentResponse}
          data={data}
          listTorrentLoading={loading}
        />
      )}
    </>
  );
};

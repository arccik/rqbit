import { useContext, useState } from "react";
import { TorrentStats } from "../../api-types";
import { APIContext, AppContext, RefreshTorrentStatsContext } from "../context";
// import { Col, Row } from "react-bootstrap";
import { DeleteTorrentModal } from "../DeleteTorrentModal";
import { IconButton } from "../IconButton";

export const TorrentActions: React.FC<{
  id: number;
  statsResponse: TorrentStats;
}> = ({ id, statsResponse }) => {
  let state = statsResponse.state;

  let [disabled, setDisabled] = useState<boolean>(false);
  let [deleting, setDeleting] = useState<boolean>(false);

  let refreshCtx = useContext(RefreshTorrentStatsContext);

  const canPause = state == "live";
  const canUnpause = state == "paused" || state == "error";

  const ctx = useContext(AppContext);
  const API = useContext(APIContext);

  const unpause = () => {
    setDisabled(true);
    API.start(id)
      .then(
        () => {
          refreshCtx.refresh();
        },
        (e) => {
          ctx.setCloseableError({
            text: `Error starting torrent id=${id}`,
            details: e,
          });
        }
      )
      .finally(() => setDisabled(false));
  };

  const pause = () => {
    setDisabled(true);
    API.pause(id)
      .then(
        () => {
          refreshCtx.refresh();
        },
        (e) => {
          ctx.setCloseableError({
            text: `Error pausing torrent id=${id}`,
            details: e,
          });
        }
      )
      .finally(() => setDisabled(false));
  };

  const startDeleting = () => {
    setDisabled(true);
    setDeleting(true);
  };

  const cancelDeleting = () => {
    setDisabled(false);
    setDeleting(false);
  };

  return (
    <>
      {/* <Row> */}
      {/* <Col> */}
      {canUnpause && (
        <IconButton
          className="bi-play-circle"
          onClick={unpause}
          disabled={disabled}
          color="success"
        />
      )}
      {canPause && (
        <IconButton
          className="bi-pause-circle"
          onClick={pause}
          disabled={disabled}
        />
      )}
      <IconButton
        className="bi-x-circle"
        onClick={startDeleting}
        disabled={disabled}
        color="danger"
      />
      <DeleteTorrentModal id={id} show={deleting} onHide={cancelDeleting} />
      {/* </Col> */}
      {/* </Row> */}
    </>
  );
};

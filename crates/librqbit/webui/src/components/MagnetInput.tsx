import { useState } from "react";
import { UploadButton } from "./UploadButton";
import { UrlPromptModal } from "./UrlPromtModal";
import { MagnetInputModal } from "./MagnetInputModal";

export const MagnetInput = () => {
  let [magnet, setMagnet] = useState<string | null>(null);

  let [showModal, setShowModal] = useState(false);

  return (
    <>
      <MagnetInputModal
        setUrl={(url) => {
          setMagnet(url);
        }}
      />
      <UrlPromptModal
        show={showModal}
        setUrl={(url) => {
          setShowModal(false);
          setMagnet(url);
        }}
        cancel={() => {
          setShowModal(false);
          setMagnet(null);
        }}
      />
    </>
  );
};

import { FileInput } from "./FileInput";
import { MagnetInput } from "./MagnetInput";

export const Buttons = () => {
  return (
    <div id="buttons-container" className="mt-3">
      <MagnetInput />
      <FileInput />
    </div>
  );
};

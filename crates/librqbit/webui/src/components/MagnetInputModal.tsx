import { Clipboard, Link, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { getClipboardValue } from "@/helper/getClipboardValue";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

type Props = {
  setUrl: (_: string) => void;
  cancel?: () => void;
};

export function MagnetInputModal({ setUrl }: Props) {
  const [inputValue, setInputValue] = useState("");

  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setUrl(inputValue);
  };
  const handleClipboardPaste = async () => {
    const clipboardValue = await getClipboardValue();
    if (clipboardValue) {
      setInputValue(clipboardValue);
    }
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button size="icon" className="rounded-lg">
                <Link className="m-1 cursor-pointer hover:text-blue-600" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>

          <TooltipContent>
            <p> URL to the .torrent</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add torrent</DialogTitle>
          <DialogDescription>
            Enter magnet or HTTP(S) URL to the .torrent
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input
              id="link"
              placeholder="magnet:?xt=urn:btih:..."
              className="placeholder-slate-400"
              value={inputValue}
              onChange={handleUrlInput}
            />
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <Clipboard className="h-4 w-4" onClick={handleClipboardPaste} />
          </Button>
        </div>
        <DialogFooter className=" justify-between">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button type="button" variant="secondary">
            Add
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

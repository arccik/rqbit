import { ReactNode } from "react";
import SideBar from "./SideBar";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <>
      {/* <SideBar /> */}
      <div>{children}</div>
    </>
  );
}

import type { ButtonProps } from "@sigma/ui";
import type { Dispatch, SetStateAction } from "react";

export type HandleConnectType = (
  returnTo: string,
  setLoading: Dispatch<SetStateAction<boolean>>,
) => void;

export interface GithubConnectButtonProps extends ButtonProps {}

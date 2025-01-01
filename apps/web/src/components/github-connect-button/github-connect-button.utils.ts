import type { HandleConnectType } from "./github-connnect-button.type";

export const handleConnect: HandleConnectType = (
  returnTo,
  setLoading
) => {
  setLoading(true);
  window.location.href = `/api/auth/github?returnTo=${returnTo}`;
};

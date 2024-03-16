import {
  mdiLock,
  mdiLockOpen,
} from "@mdi/js";

export const pin = (keep: boolean): string => keep ? mdiLock : mdiLockOpen
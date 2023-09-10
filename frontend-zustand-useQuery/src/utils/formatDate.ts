import { format } from "date-fns";

export function formatDate(date: string | undefined) {
  return date ? format(new Date(date), "dd/LL/yyyy HH:mm:ss") : undefined;
}

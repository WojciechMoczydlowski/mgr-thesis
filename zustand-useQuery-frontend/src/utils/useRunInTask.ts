import { useCallback, useState } from "react";

type Options = { onSuccess?: () => void; onError?: () => void };

export function useRunInTask(options?: Options) {
  const [isRunning, setIsRunning] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<unknown>();

  const runInTask = useCallback(
    async <T>(block: () => T | Promise<T>) => {
      setIsRunning(true);
      try {
        const response = await block();
        options?.onSuccess?.();
        return response;
      } catch (err) {
        setIsError(true);
        setError(err);
        options?.onError?.();
      } finally {
        setIsRunning(false);
      }
    },
    [options]
  );
  return { isRunning, isError, error, runInTask };
}

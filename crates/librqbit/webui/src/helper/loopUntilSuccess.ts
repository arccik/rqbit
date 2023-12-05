export function loopUntilSuccess<T>(
  callback: () => Promise<T>,
  interval: number
): () => void {
  let timeoutId: number;

  const executeCallback = async () => {
    let retry = await callback().then(
      () => false,
      () => true
    );
    if (retry) {
      scheduleNext();
    }
  };

  let scheduleNext = (overrideInterval?: number) => {
    timeoutId = window.setTimeout(
      executeCallback,
      overrideInterval !== undefined ? overrideInterval : interval
    );
  };

  scheduleNext(0);

  return () => clearTimeout(timeoutId);
}

export function isValidTime(time: Date): boolean {
  const currentTime = new Date();
  const inputTime = new Date(time);
  return inputTime > currentTime;
}


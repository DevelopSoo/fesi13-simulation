// 사용자별로 진행 중인 refresh promise를 관리하는 Map
// Key: 사용자를 식별할 수 있는 고유 값 (예: 기존 access_token의 hash 등)
const refreshPromises = new Map<string, Promise<string | null>>();

export const getRefreshPromise = (userId: string) =>
  refreshPromises.get(userId);
export const setRefreshPromise = (
  userId: string,
  p: Promise<string | null> | null
) => {
  if (p === null) {
    refreshPromises.delete(userId);
  } else {
    refreshPromises.set(userId, p);
  }
};

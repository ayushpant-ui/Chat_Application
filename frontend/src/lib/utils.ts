// Avatar paths from the backend may be relative ("/uploads/avatars/x.png")
export const assetUrl = (path?: string | null) => {
  if (!path) return null;
  return path.startsWith('http')
    ? path
    : `${process.env.NEXT_PUBLIC_API_URL}${path}`;
};
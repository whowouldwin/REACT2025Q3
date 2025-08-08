export const getGridClass = (detailsOpen: boolean) => {
  return `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
    detailsOpen
      ? 'lg:grid-cols-3 xl:grid-cols-4'
      : 'lg:grid-cols-4 xl:grid-cols-5'
  } gap-6 justify-items-center`;
};

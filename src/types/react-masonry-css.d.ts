declare module 'react-masonry-css' {
  interface MasonryProps {
    breakpointCols?: number | { [key: string]: number } | { [key: number]: number };
    className?: string;
    columnClassName?: string;
    children?: React.ReactNode;
  }

  const Masonry: React.FC<MasonryProps>;
  export default Masonry;
}

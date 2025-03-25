import Image from "next/image";

interface PostImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function PostImage({ src, alt, width, height }: PostImageProps) {
  return (
    <div style={{ textAlign: "center", margin: "16px 0" }}>
      <Image src={src} alt={alt} width={width} height={height} style={{ borderRadius: "8px" }} />
    </div>
  );
}

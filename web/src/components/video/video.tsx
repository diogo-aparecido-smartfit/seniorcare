interface VideoProps {
  src: string;
  width: string;
  height: string;
}

export const Video = ({ src, width, height }: VideoProps) => {
  return (
    <video
      width={width}
      height={height}
      controls={false}
      autoPlay={true}
      preload="auto"
      loop
      muted
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

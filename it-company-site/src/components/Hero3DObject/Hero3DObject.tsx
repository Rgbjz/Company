export default function Hero3DObject() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <iframe
        src="https://my.spline.design/blobs-tr6TM3FY4EkHahEbzrA3a82W/"
        frameBorder="0"
        width="100%"
        style={{
          border: 'none',
          backgroundColor: 'transparent',
          height: '115%',
          width: '115%',
          position: 'absolute',
          top: '-5%',
          left: '-7.5%',
        }}
        title="3D Crystal"
        // ЗАМЕНИЛИ: теперь iframe игнорирует мышку
        className="pointer-events-none"
      />
    </div>
  );
}

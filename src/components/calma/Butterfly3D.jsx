export default function Butterfly3D({ size = 120 }) {
  return (
    <div style={{ width: size, height: size, pointerEvents: 'none' }}>
      {/* model-viewer loaded via script tag in index.html */}
      <model-viewer
        src="/images/calma/butterfly/butterfly.glb"
        autoplay
        shadow-intensity="0"
        exposure="1.4"
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          '--progress-bar-color': 'transparent',
          '--progress-mask': 'transparent',
        }}
      />
    </div>
  )
}

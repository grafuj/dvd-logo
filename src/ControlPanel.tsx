import { useDvd } from "./DvdContext";

export function ControlPanel() {
  const {
    xVelocity,
    yVelocity,
    color,
    menuOpen,
    setXVelocity,
    setYVelocity,
    setColor,
    setMenuOpen,
    reverseX,
    reverseY,
  } = useDvd();

  return (
    <>
      {/* Menu button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          position: "fixed",
          top: 20,
          right: menuOpen ? 320 : 20,

          zIndex: 10,

          padding: "10px 14px",

          border: "none",
          borderRadius: 8,

          background: "#222",
          color: "white",

          cursor: "pointer",
          fontSize: 18,

          transition: "right 0.25s ease",
        }}
      >
        {menuOpen ? "×" : "☰"}
      </button>

      {/* Panel */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          right: 0,

          width: 300,
          height: "100vh",

          boxSizing: "border-box",
          padding: "70px 24px 24px",

          background: "#1c1c1c",
          color: "white",

          boxShadow: "-5px 0 20px rgba(0, 0, 0, 0.3)",

          transform: menuOpen
            ? "translateX(0)"
            : "translateX(100%)",

          transition: "transform 0.25s ease",

          zIndex: 5,
        }}
      >
        <h2 style={{ marginTop: 0 }}>
          DVD Settings
        </h2>

        {/* X velocity */}
        <section style={sectionStyle}>
          <label style={labelStyle}>
            <span>X Velocity</span>
            <span>{Math.abs(xVelocity)}</span>
          </label>

          <input
            type="range"
            min="0"
            max="500"
            value={Math.abs(xVelocity)}
            onChange={(e) =>
              setXVelocity(
                Number(e.target.value) *
                  Math.sign(xVelocity || 1)
              )
            }
            style={sliderStyle}
          />

          <button onClick={reverseX} style={buttonStyle}>
            Reverse X
          </button>
        </section>

        {/* Y velocity */}
        <section style={sectionStyle}>
          <label style={labelStyle}>
            <span>Y Velocity</span>
            <span>{Math.abs(yVelocity)}</span>
          </label>

          <input
            type="range"
            min="0"
            max="500"
            value={Math.abs(yVelocity)}
            onChange={(e) =>
              setYVelocity(
                Number(e.target.value) *
                  Math.sign(yVelocity || 1)
              )
            }
            style={sliderStyle}
          />

          <button onClick={reverseY} style={buttonStyle}>
            Reverse Y
          </button>
        </section>

        {/* Color */}
        <section style={sectionStyle}>
          <label style={labelStyle}>
            <span>Logo Color</span>
          </label>

          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            style={{
              width: "100%",
              height: 50,
              cursor: "pointer",
              border: "none",
              background: "transparent",
            }}
          />
        </section>
      </aside>
    </>
  );
}

const sectionStyle: React.CSSProperties = {
  marginBottom: 30,
};

const labelStyle: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,
};

const sliderStyle: React.CSSProperties = {
  width: "100%",
};

const buttonStyle: React.CSSProperties = {
  marginTop: 12,

  padding: "8px 12px",

  border: "none",
  borderRadius: 6,

  background: "#333",
  color: "white",

  cursor: "pointer",
};

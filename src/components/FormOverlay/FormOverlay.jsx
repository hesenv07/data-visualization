export function FormOverlay({ display, ...rest }) {
  return (
    <div
      className={`${"block"
      } fixed top-0 w-full h-[100vh] bg-white opacity-60 z-99999 cursor-wait`}
    ></div>
  );
}

import { useAuthServer } from "../auth/myServerAuthContext";

export default function VedioPlayer() {
  const { socket } = useAuthServer();
  socket.emit("tost", "i the king");
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: 1000,
          color: "blue",
        }}
      >
        THIS CONTENT COMMING SOON
      </div>
    </>
  );
}

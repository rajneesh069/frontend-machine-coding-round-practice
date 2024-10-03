import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="p-2 bg-zinc-800 border-b-2 border-b-gray-950 mb-2 flex justify-end">
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

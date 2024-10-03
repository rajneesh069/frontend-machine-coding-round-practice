import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col flex-wrap gap-2 md:flex-row border border-gray-300 justify-center items-center h-[90vh]">
      <button onClick={() => navigate("/accordion")}>Accordion</button>
    </div>
  );
}

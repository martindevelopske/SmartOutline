import { MainLayout } from "@/Layouts/MainLayout";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <MainLayout>
      <div>
        not found page <Link to="/">Home</Link>
      </div>
    </MainLayout>
  );
}

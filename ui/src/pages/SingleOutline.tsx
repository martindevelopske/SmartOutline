import { useParams } from "react-router-dom";

export default function SingleOutline() {
  const { id } = useParams();

  return (
    <>
      <div>single outline</div>
      <div>{id}</div>
    </>
  );
}

import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

// Components
import Button from "../../components/buttons/Button";
import Input from "../../components/forms/Input";
import { addDiscussion } from "../../utils/discussions";

const AddDiscussionPage = () => {
  const navigate = useNavigate();
  const { id_course: courseId } = useParams();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const inputTitleHandler = (e) => setTitle(e.target.value);
  const inputBodyHandler = (e) => setBody(e.target.value);

  const backButtonHandler = () => navigate(-1);
  const submitHandler = (e) => {
    addDiscussion({ courseId, title, body });
    e.preventDefault();
    navigate(`/course/${courseId}/discussion`);
  };

  return (
    <div className="w-full py-4 px-5 sm:py-6 sm:px-0">
      <h1 className="text-xl sm:text-2xl">Diskusi</h1>
      <p className="text-gray-dark text-sm">
        Lorem ipsum dolor sit amet (Judul Materi)
      </p>
      <form onSubmit={submitHandler} method="POST">
        <div className="mt-3 grid grid-cols-6 gap-3">
          {/* Judul */}
          <div className="col-span-6">
            <Input
              onChange={inputTitleHandler}
              label="Judul Pertanyaan"
              placeholder="Masukkan judul pertanyaan"
            />
          </div>

          {/* Deskripsi */}
          <div className="col-span-6">
            <label
              htmlFor="isiPertanyaan"
              className="block text-sm font-medium text-primary"
            >
              Isi Pertanyaan
            </label>
            <div className="mt-1">
              <textarea
                onChange={inputBodyHandler}
                id="isiPertanyaan"
                name="isiPertanyaan"
                rows={10}
                className="input-primary mt-1 block w-full rounded-md shadow-sm focus-primary sm:text-sm resize-none"
                placeholder="Masukkan isi pertanyaan"
              />
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Isi dari pertanyaan yang ingin kamu tanyakan
            </p>
          </div>

          <div className="col-span-6 sm:col-span-2 sm:col-start-5 mt-8 flex gap-3 sm:gap-4">
            <Button onClick={backButtonHandler} color="gray">
              Kembali
            </Button>
            <Button type="submit">Kirim</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddDiscussionPage;

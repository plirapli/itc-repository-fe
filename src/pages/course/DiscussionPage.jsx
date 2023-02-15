import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/buttons/Button";
import SearchBar from "../../components/forms/SearchBar";
import { getAllDiscussions } from "../../utils/discussions";
import DiscussionLists from "../../components/lists/DiscussionLists";

const DiscussionPage = () => {
  const navigate = useNavigate();
  const toAddDiskusiPage = () => navigate("add");
  const [discussions, setDiscussions] = useState([]);
  const { id_course } = useParams();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    getAllDiscussions(id_course)
      .then((data) => {
        setDiscussions(data);
        setInitializing(false);
      })
      .catch(({ data }) => console.log(data.message));
  }, []);

  if (initializing) return null;

  return (
    <>
      <div className="w-full py-4 px-5 sm:py-6 sm:px-0">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
          <h1 className="text-2xl leading-none">Diskusi</h1>
          <Button
            onClick={toAddDiskusiPage}
            variant="icon-right"
            icon="akar-icons:plus"
          >
            Buat Pertanyaan
          </Button>
        </div>
        <div className="w-full mt-3">
          <SearchBar placeholder="Cari Pertanyaan" />
        </div>

        {/* List Diskusi */}
        <DiscussionLists discussions={discussions} />
      </div>
    </>
  );
};

export default DiscussionPage;

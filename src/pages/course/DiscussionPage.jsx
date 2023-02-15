import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/buttons/Button";
import { DiscussionCard } from "../../components/cards/index";
import SearchBar from "../../components/forms/SearchBar";
import { getAllDiscussions } from "../../utils/discussions";
import parse from "html-react-parser";

const DiscussionPage = () => {
  const navigate = useNavigate();
  const diskusiList = ["1", "2", "3", "4"]; // Dummy
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

  console.log(discussions);
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
        <div className="mt-3 flex flex-col gap-5">
          {discussions.map((discussion, i) => (
            <Link key={discussion.id} to={`${discussion.id}`}>
              <DiscussionCard discussion={discussion} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default DiscussionPage;

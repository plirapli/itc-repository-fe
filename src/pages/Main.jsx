import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { getLocalAccessToken } from "../Utils/auth";
import jwt from "jwt-decode";

// Components
import {
  Layout,
  LayoutLogin,
  LayoutManageMateri,
  LayoutMateri,
} from "./layout/index";
import { Home } from "./index";
import { OverviewPage, Diskusi, Komentar } from "./course/index";
import { ForgotPassword, Login, Register } from "./login/index";
import {
  ListArtikelPage,
  ListBabPage,
  ListMateri,
  AddMateri,
} from "./manageMateri";
import AddDiskusiPage from "./course/AddDiskusiPage";
import { getDivisi, getUserDetail } from "../Utils/getData";
import AddArtikelPage from "./manageMateri/AddArtikelPage";

const Main = () => {
  const [token, setToken] = useState("");
  const [divisi, setDivisi] = useState([]);
  const [userData, setUserData] = useState({});
  const [isAuthed, setIsAuthed] = useState(false);

  const setTokenHandler = (token) => setToken(() => token);

  useEffect(() => {
    getDivisi()
      .then(setDivisi)
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setToken(getLocalAccessToken() || token);
    console.log(token);
    if (token) {
      const { id, id_role, division } = jwt(token);
      getUserDetail(id).then(({ data }) => {
        const { email, fullName, username, photoProfile } = data;
        setUserData({
          id_role,
          email,
          fullName,
          username,
          photoProfile,
          division,
        });
      });
    }
  }, []);

  if (isAuthed === false)
    return (
      <div className="min-h-screen bg-gray-light">
        <Routes>
          {/* Login, Register Page */}
          <Route element={<LayoutLogin />}>
            <Route path="/*" element={<Login token={setTokenHandler} />} />
            <Route path="forgot-password/" element={<ForgotPassword />} />
            <Route path="register/" element={<Register divisi={divisi} />} />
          </Route>
        </Routes>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-light">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={
              <Home
                userData={userData}
                divisi={divisi}
                isAuthed
                setIsAuthed={setIsAuthed}
              />
            }
          />
          <Route
            path="home/"
            element={<Home userData={userData} divisi={divisi} />}
          />

          {/* Manage Materi - Admin Only */}
          <Route
            path="materi/"
            element={<LayoutManageMateri userData={userData} divisi={divisi} />}
          >
            <Route index element={<ListMateri />} />
            <Route exact path="add/" element={<AddMateri />} />
            <Route exact path=":id_materi/" element={<ListBabPage />} />
            <Route
              exact
              path=":id_materi/:id_bab/"
              element={<ListArtikelPage />}
            />
            <Route
              exact
              path=":id_materi/:id_bab/add/"
              element={<AddArtikelPage />}
            />
          </Route>

          {/* Course */}
          <Route path="course/:id_materi/" element={<LayoutMateri />}>
            <Route index element={<OverviewPage />} />
            <Route exact path="diskusi/" element={<Diskusi />} />
            <Route exact path="diskusi/add/" element={<AddDiskusiPage />} />
            <Route exact path="diskusi/:id_diskusi/" element={<Komentar />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Main;

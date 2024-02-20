import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./routes";
import ResumeTemplates from "components/ResumeTemplates/ResumeTemplates";
import Preloader from "components-shared/Preloader/Preloader";
import Dashboard from "components/Dashboard/Dashboard";
import Editor from "components/Editor/Editor";
import { BrowserRouter as Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const Login = lazy(() => import("components/Login"));
const Landing = lazy(() => import("components/Landing"));
const CreateResume = lazy(() => import("components/CreateResume"));

export default function AppRouter() {
  const user = useSelector((state) => state.user);
  return (
    <Suspense fallback={<Preloader />}>
      <Routes>
        {/* <Route path="/" element={<Navigate to={Routes.Home} />} /> */}
        <Route path={routes.Login} element={<Login />} />
        <Route path={routes.Home} element={<Landing />} />
        <Route
          path={routes.Dashboard}
          element={user ? <Dashboard /> : <Redirect to="/" />}
        />
        <Route path={routes.NewRsume} element={<CreateResume />} />
        <Route path={routes.ResumeTemplates} element={<ResumeTemplates />} />
        <Route path={routes.editor} element={<Editor />} />
      </Routes>
    </Suspense>
  );
}

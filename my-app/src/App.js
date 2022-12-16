import React from "react";
import {  BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import ChainInfo from "./pages/ChainInfo";
import NotFound from "./pages/NotFound";
import FakeBayc from "./pages/FakeBayc";
import FakeBaycTokenInfo from "./pages/FakeBaycTokenInfo";
import FakeNefturians from "./pages/FakeNefturians";
import FakeNefturiansUserInfo from "./pages/FakeNefturiansUserInfo";
import FakeMeebits from "./pages/FakeMeebits";
import WrongNetwork from "./pages/WrongNetwork";

function AppRoutes() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ChainInfo" element={<ChainInfo />} />
        <Route path="/fakeBayc" element={<FakeBayc />} />
        <Route path="/fakeBayc/:tokenId" element={<FakeBaycTokenInfo />} />
        <Route path="/fakeNefturians" element={<FakeNefturians />} />
        <Route path="/fakeNefturians/:userAddress" element={<FakeNefturiansUserInfo />} />
        <Route path="/fakeMeebits" element={<FakeMeebits />} />
        <Route path="/wrongNetwork" element={<WrongNetwork />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
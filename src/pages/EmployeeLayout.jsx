import React from "react";
import { Outlet } from "react-router-dom";
import { QueueProvider } from "../context/QueueContext";

export default function EmployeeLayout() {
  return (
    <QueueProvider>
      <Outlet /> {/* renders child routes like dashboard, history, etc */}
    </QueueProvider>
  );
}

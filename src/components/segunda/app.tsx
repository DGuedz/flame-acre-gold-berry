import { useEffect } from "react";
import { useSegunda } from "@/lib/store";
import { Quiz } from "./quiz";

export function SegundaApp() {
  useEffect(() => {
    void useSegunda.persist.rehydrate();
  }, []);

  return <Quiz />;
}

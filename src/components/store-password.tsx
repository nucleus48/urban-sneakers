"use client";

import { useEffect } from "react";
import { toast } from "../hooks/use-toast";
import { STORE_PASSWORD } from "@/lib/constants";

export function StorePassword() {
  useEffect(() => {
    toast({
      title: "Development store password",
      description: `The development store password is ${STORE_PASSWORD}`,
      duration: 10000
    });
  }, []);

  return <></>;
}

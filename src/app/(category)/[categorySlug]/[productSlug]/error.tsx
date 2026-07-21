"use client";

import { UncaughtError } from "@shared/components/errors/ui/UncaughtError";
import { useEffect } from "react";



export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {


  useEffect(() => {
    console.error(error);
  }, [error]); 
     
    
  return (
    <UncaughtError requested = {'product'} reset={reset}/>
  );
};
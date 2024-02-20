import { useState } from "react";

export function useCreateResume() {
  const [state, setState] = useState({});

  return { state };
}

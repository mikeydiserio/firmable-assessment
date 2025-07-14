import { useEffect, useState } from "react";
import { Entity } from "../../types/types";

export function useEntity(abn: string | null) {
  const [entity, setEntity] = useState<Entity | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!abn) return;

    async function fetchEntity() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/entities/${abn}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setEntity(data);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred"),
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchEntity();
  }, [abn]);

  return { entity, isLoading, error };
}

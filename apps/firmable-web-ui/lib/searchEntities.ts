import { Entity } from "../types/types";
import { supabase } from "./supabase/client";

export async function searchEntities(query: string): Promise<Entity[]> {
  // Search by ABN
  if (/^\d+$/.test(query)) {
    const { data, error } = await supabase
      .from("entities")
      .select("*")
      .ilike("abn", `%${query}%`)
      .limit(10);

    if (error) throw new Error(error.message);
    return data || [];
  }

  // Search by name
  const { data, error } = await supabase
    .from("entities")
    .select("*, business_names(*)")
    .or(`legal_name.ilike.%${query}%, business_names.name.ilike.%${query}%`)
    .limit(10);

  if (error) throw new Error(error.message);
  return data || [];
}

export async function searchEntitiesByAbn(abn: string): Promise<Entity | null> {
  const { data, error } = await supabase
    .from("entities")
    .select("*")
    .eq("abn", abn)
    .single();

  if (error) throw new Error(error.message);
  return data || null;
}

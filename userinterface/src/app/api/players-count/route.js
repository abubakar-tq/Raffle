import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  
  try {
    // Use the correct environment variable name
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase credentials");
      return NextResponse.json({ totalPlayers: 0 }, { status: 200 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Count players
    const { count: playerCount, error } = await supabase
      .from("players")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Error fetching players count:", error);
      // Return 0 instead of error to prevent frontend crash
      return NextResponse.json({ totalPlayers: 0 }, { status: 200 });
    }

    return NextResponse.json({ totalPlayers: playerCount || 0 });
  } catch (error) {
    console.error("Unexpected error in players-count API:", error);
    return NextResponse.json({ totalPlayers: 0 }, { status: 200 });
  }
}

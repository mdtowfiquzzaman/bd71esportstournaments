export async function GetLast3MatchIds() {
  const playerName = "Towfiq_Vai";
  const res = await fetch(
    `https://api.pubg.com/shards/steam/players?filter[playerNames]=${playerName}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PUBG_API_KEY}`,
        Accept: "application/vnd.api+json",
      },
    }
  );

  const data = await res.json();

  const matchIds =
    data?.data?.[0]?.relationships?.matches?.data
      ?.slice(0, 3)
      .map((match: any) => match.id) || [];

  return matchIds
}
import clientPromise from "@/app/lib/mongodb";

export default async function Page() {
    const client = await clientPromise;
    const db = client.db("sample_mflix");
    const movies = await db
        .collection("movies")
        .find({})
        .sort({ metacritic: -1 })
        .limit(100)
        .toArray();

    return (
        <div>
            <h1>Movies</h1>
            <ul>
                {movies.map((movie) => (
                    <li key={movie._id.toString()}>{movie.title}</li>
                ))}
            </ul>
        </div>
    );
}
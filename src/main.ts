type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string
}

type Nationality =
  | "American"
  | "British"
  | "Australian"
  | "Israeli - American"
  | "South African"
  | "French"
  | "Indian"
  | "Israeli"
  | "Spanish"
  | "South Korean"
  | "Chinese";

type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: Nationality,
}

// 📌 Milestone 3
// Crea una funzione getActress che, dato un id, effettua una chiamata a:

// GET / actresses /: id
// La funzione deve restituire l’oggetto Actress, se esiste, oppure null se non trovato.

// Utilizza un type guard chiamato isActress per assicurarti che la struttura del dato ricevuto sia corretta.

function isActress(obj: unknown): obj is Actress {
  return (
    typeof obj === "object" && obj !== null &&
    "id" in obj && typeof obj.id === "number" &&
    "name" in obj && typeof obj.name === "string" &&
    "birth_year" in obj && typeof obj.birth_year === "number" &&
    "death_year" in obj && typeof obj.death_year === "number" &&
    "biography" in obj && typeof obj.biography === "string" &&
    "image" in obj && typeof obj.image === "string" &&
    "most_famous_movies" in obj &&
    obj.most_famous_movies instanceof Array &&
    obj.most_famous_movies.length === 3 &&
    obj.most_famous_movies.every(movie => typeof movie === "string") &&
    "awards" in obj && typeof obj.awards === "string" &&
    "nationality" in obj && typeof obj.nationality === "string" &&
    [
      "American",
      "British",
      "Australian",
      "Israeli - American",
      "South African",
      "French",
      "Indian",
      "Israeli",
      "Spanish",
      "South Korean",
      "Chinese"
    ].includes(obj.nationality)
  )
}

async function getActress(id: number): Promise<Actress | null> {
  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);

    const data: unknown = await response.json();


    if (isActress(data)) {
      return data;
    } else {
      throw new Error("Dati non validi!");
    }
  } catch (error) {
    { }
    if (error instanceof Error) {
      console.error("Errore durante la richiesta dei dati:", error);
    } else {
      console.error("Errore:", error);
    }
    return null;
  }
}

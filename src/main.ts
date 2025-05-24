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
    if (error instanceof Error) {
      console.error("Errore durante la richiesta dei dati:", error);
    } else {
      console.error("Errore:", error);
    }
    return null;
  }
}

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`http://localhost:3333/actresses`);
    if (!response.ok) {
      throw new Error(`Errore HTTP: ${response.status}`);
    }

    const data: unknown = response.json();
    if (!(data instanceof Array)) {
      throw new Error("Non è un array!");
    }
    const validActress: Actress[] = data.filter(isActress);
    return validActress;

  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante la richiesta dei dati:", error);
    } else {
      console.error("Errore:", error);
    }
    return [];
  }
}

async function getActresses(ids: number[]): Promise<(Actress | null)[]> {
  try {
    const promises = ids.map(id => getActress(id));
    return await Promise.all(promises);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Errore durante la richiesta dei dati:", error);
    } else {
      console.error("Errore:", error);
    }
    return [];
  }

}
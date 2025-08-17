import { fetchCharacter } from "../../utils/api/rickAndMorty"
import { DetailsView } from "./DetailsView";

export const DetailsViewServer = async ({id}: {id: string}) => {
    const character = await fetchCharacter({id: id});
    return (
       <DetailsView character={character} />
    )
}
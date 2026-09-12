import * as eventActions from "./event/eventAction";
import * as artistActions from "./artist/artistAction";
import * as categoryActions from "./category/categoryAction";
export const actions = {
    ...eventActions,
    ...artistActions,
    ...categoryActions,
}


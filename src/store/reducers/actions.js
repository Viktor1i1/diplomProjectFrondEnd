import * as eventActions from "./event/eventAction";
import * as artistActions from "./artist/artistAction";
import * as categoryActions from "./category/categoryAction";
import * as userActions from "./user/userAction";
import * as bookingActions from "./booking/bookingAction"
export const actions = {
    ...eventActions,
    ...artistActions,
    ...categoryActions,
    ...userActions,
    ...bookingActions
}



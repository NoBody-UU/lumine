import "dotenv/config";

import { Validations } from "#lumine/validations";

Validations.validateEnv();

import { Lumine } from "#lumine/client";
const client = new Lumine();
export default client;

/**
 * © PenwiSquad
 * By: NoBody-UU, JustEvil / SagiriIkeda (please no)
 */

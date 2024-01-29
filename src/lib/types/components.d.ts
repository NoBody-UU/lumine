import type { LumineRowType } from "#lumine/types";

interface ComponentDataObject {
    customId: string;
    type: LumineRowType;
}

export interface ComponentData {
    data: ComponentDataObject;
}
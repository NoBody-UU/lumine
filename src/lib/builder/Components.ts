import type { ComponentData, ComponentDataObject } from "#lumine/types"

export class LumineComponent {
    readonly data: ComponentDataObject;

    constructor(component: ComponentData) {
        const { data } = component;

        this.data = data;
    };

    
};



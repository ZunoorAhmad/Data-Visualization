import { Type } from '@angular/core';
import { mount, MountConfig } from 'cypress/angular';
import { defaultDeclarations, defaultImports, defaultProviders } from './defaultConfig';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof teacherMount;
        }
    }
}

const mockActivatedRoute = {
    snapshot: {
        paramMap: convertToParamMap({
            /* provide any required parameters here */
        }),
    },
};

const declarations = defaultDeclarations;
const imports = [...defaultImports, [BrowserAnimationsModule, HttpClientModule]];
const providers = [
    ...defaultProviders,
    [DialogService, DynamicDialogRef, ConfirmationService, MessageService, DynamicDialogConfig],
    {
        provide: ActivatedRoute,
        useValue: mockActivatedRoute,
    },
];

export function teacherMount<T>(component: string | Type<T>, config?: MountConfig<T>) {
    if (!config) {
        config = { declarations: [...declarations], imports, providers };
    } else {
        config.declarations = [...(config?.declarations || []), ...declarations];
        config.imports = [...(config?.imports || []), ...imports];
        config.providers = [...(config?.providers || []), ...providers];
    }
    return mount<T>(component, config);
}

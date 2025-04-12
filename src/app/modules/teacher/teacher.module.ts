import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { defaultDeclarations, defaultImports, defaultProviders } from './defaultConfig';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faList, faPen } from '@fortawesome/free-solid-svg-icons';

@NgModule({
    declarations: defaultDeclarations,
    imports: defaultImports,
    providers: defaultProviders,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TeacherModule {
    constructor(library: FaIconLibrary) {
        library.addIcons(faPen, faList);
    }
}

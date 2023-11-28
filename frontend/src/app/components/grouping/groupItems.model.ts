import { FormControl, FormGroup, Validators } from '@angular/forms';

export class GroupItems {
    gramsPortion: number;
    homemadePortion: string;
    name: string;
    code: string;

    static asFormGroup(groupItems: GroupItems): FormGroup {
        const fg = new FormGroup({
            gramsPortion: new FormControl(groupItems.gramsPortion, Validators.required),
            homemadePortion: new FormControl(groupItems.homemadePortion, Validators.required),
            // id: new FormControl(groupItems.id, Validators.required),
            code: new FormControl(groupItems.code, Validators.required),
            name: new FormControl(groupItems.name, Validators.required)
        });
        return fg;
    }
}

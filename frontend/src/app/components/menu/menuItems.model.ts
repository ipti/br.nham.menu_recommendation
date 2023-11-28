import { FormControl, FormGroup, Validators } from '@angular/forms';

export class MenuItems {
    replaceable: string
    gramsPortion: number
    code: string;

    static asFormGroup(menuItems: MenuItems): FormGroup {
        const fg = new FormGroup({
            code: new FormControl(menuItems.code, Validators.required),
            gramsPortion: new FormControl(menuItems.gramsPortion, Validators.required),
            replaceable: new FormControl(menuItems.replaceable, Validators.required)
        });
        return fg;
    }
}

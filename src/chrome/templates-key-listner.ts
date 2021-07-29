import Template from "./template.interface";

let buffer: string = '';

export function registerTemplateHandlers() {
    chrome.storage.sync.get('templates', (data => {
        document.addEventListener("keyup", event => {
            document.activeElement?.addEventListener('focusout', () => {
                buffer = '';
            });

            if(event.key === 'Backspace'){
                buffer = buffer.substring(0, buffer.length - 1);
                return;
            }

            if (event.isComposing || event.key === 'Shift' ) {
                return;
            }
            buffer += event.key;

            data['templates']?.forEach((template: Template) => {
                if (buffer.includes(template.key)) {
                    const inputValue = (<HTMLInputElement>document.activeElement).value;
                    (<HTMLInputElement>document.activeElement).value = inputValue.replace(template.key, template.value);
                    buffer = '';
                }
            });

        });

    }));
}




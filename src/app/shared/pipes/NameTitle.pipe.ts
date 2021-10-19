import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
        name: 'NameTitle'
})
export class NameTitle implements PipeTransform{
    transform(value: string, gender: string) {
    }

}
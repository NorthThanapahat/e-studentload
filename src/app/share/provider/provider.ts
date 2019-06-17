import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class DataProvider {
    province:any;
    district:any;
    subDistrict:any;
    language:string = 'th';
    constructor() {}
}
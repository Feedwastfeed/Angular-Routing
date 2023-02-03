export class Student {
    NameArabic: string = "";
    NameEnglish: string = ""
    ID: number = 0;
    Name: string = "";
    FirstName: string = "";
    LastName: string = "";
    Mobile: string = "";
    Email: string = "";
    NationalID: string = "";
    Age: number = 0;

    constructor();

    constructor(firstname: string, lasttName: string, mobile: string, email: string, nationalId: string, age: number);

    constructor(...arr: any[]) {
        if (arr.length == 0) {
            this.FirstName = arr[0];
            this.LastName = arr[1];
            this.Mobile = arr[2];
            this.Email = arr[3];
            this.NationalID = arr[4];
            this.Age = arr[5];
        }
    }
}
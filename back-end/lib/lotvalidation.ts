

export function FieldValidation(field:string | number){
    //* use type guard to make sure validation works based on types   
    
    if (typeof field == "string"){
        if (field == "" || field.length < 2 ) {
            return {stringFieldError:"field cannot be empty or less than 2 char"
            }

        }

    }

    if (typeof field == "number"){
        if (field == 0){
            return { intgerFieldError: "number cannot be Zero" };
        }
    }
   return {field} // validtions are true

}
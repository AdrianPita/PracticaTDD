chai.should(); // invoking this function creates a "should" object on every object
context = describe;

function listFilter(list) {
    var i;
    for (i=1; i<list.length; i++){
        if (list[0].toLowerCase() === list[i].toLowerCase()){
            list.splice(i,1);
        }
    }
    return list
}

/* To DO LIST
*Test:
*['test@test.com']----> ['test@test.com']
*Test:
*['test@test.com', 'test@test.com'] ----> ['test@test.com']
*Test:
*['test1@test.com', 'test1@test.com', 'test2@test.com'] ----> ['test1@test.com','test2@test.com']
*Test:
*['test@test.com', 'TEST@test.com'] ----> ['test@test.com']
*Test:
*
*/

describe("TDD Practica", function(){

    it("si hay un email, devuelve el email", function(){
        expect(listFilter(['test@test.com'])).toEqual(['test@test.com']);
    });

    it("si hay dos emails iguales, devuelve un solo email", function(){
        expect(listFilter(['test@test.com', 'test@test.com'])).toEqual(['test@test.com']);
    });
    it("si hay tres emails, devuelve dos emails", function(){
        expect(listFilter(['test1@test.com', 'test1@test.com', 'test2@test.com'])).toEqual(['test1@test.com', 'test2@test.com']);
    });
    it("elimina duplicados en mayusculas", function(){
        expect(listFilter(['test@test.com', 'TEST@test.com'])).toEqual(['test@test.com']);
    });
});
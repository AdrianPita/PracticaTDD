chai.should(); // invoking this function creates a "should" object on every object
context = describe;

function listFilter(list) {
    return [list[0]]
}

/* To DO LIST
*Test:
*['test@test.com']----> ['test@test.com']
*Test:
*['test@test.com', 'test@test.com'] ----> ['test@test.com']
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
});
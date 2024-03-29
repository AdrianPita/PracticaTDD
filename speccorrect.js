chai.should(); // invoking this function creates a "should" object on every object
context = describe;

describe("the JavaScript language", function(){

  describe("when coercing values", function(){
    it("considers numbers to be equal to their string representation", function(){
        expect(1 == "1").toBeTruthy(); // assertion using Jasmine.
        //(1 == "1").should.be.ok(); equivalent assertion, using chai.should.
    });

    it("knows that numbers and strings are not strictly the same", function(){
        (1 === "1").should.not.be.ok; 
    });
 
    // Exercise:
    // Try yourself more examples on numbers (integers & floats), NaN, 
    // strings (including the empty string), booleans, arrays, functions,
    // objects and... "undefined" and null, using these operators:
    //     ==
    //     ===
    //     +
    //     *
    //     /
    //     - 
    // as well as the "typeof" function
    //
    // Examples:

    it("joins parts as string when using the plus operator", function(){
        (1 + "a").should.equal("1a");
    });

    it("operates integers before joining the string", function(){
        expect(1 + 1 + "2").toEqual('22');
    });

    it("knows the type of the variable", function(){
        var x = 1;
        expect(typeof(x)).toEqual('number');
    });

    it("surprises me, NaN is not comparable with NaN", function(){
        (5 / "a").should.not.equal(5 / "a");
        expect(typeof(NaN)).toEqual('number');
        isNaN(5 / "a").should.be.ok;
    });

  });

  describe("when using functions", function(){
  
    it("can declare named functions", function(){
        function example(){
            return 'some example';
        }

        example().should.equal('some example');
    });

    it("can declare anonymous functions", function(){
        var someVar = function(a, b){
            return a + b;
        };

        expect(typeof(someVar)).toBe('function');
        expect(someVar(1,1)).toBe(2);
    });

    it("doesn't care about the declaration order when they are named", function(){
        function exampleA(){
            return exampleB(1);
        };
        
        expect(exampleA()).toEqual(1);
        
        function exampleB(arg1){
            return arg1;
        };
    });

    it("matters, the declaration order when they are anonymous", function(){
        var exampleA = function(){
            return exampleB(1);
        };
        
        var exampleB = function(arg1){
            return arg1;
        };
        expect(exampleA()).toEqual(1);
        
        
    });

    it("can use optional parameters", function(){
        function example(a, b, c){
            if (c) {
              return a + b + c; 
          }else{
                return a + b;
            }
        };

        expect(example(1,1,1)).toBe(3);
        expect(example(1,1)).toBe(2);
    });

    it("can create closures with free variables", function(){
        function external(){
          var a = 1;

          function internal(){
            return a + 1;
          }
          return internal();
        }

        expect(external()).toBe(2);
    });

    it("can create closures with several free variables", function(){
        function external(){
          var a = 1, b = 2;

          function internal(){
            var c = 3;
            return a + b + c;
          }
          return internal();
        }

        expect(external()).toBe(6);
    });

    it("defines a pure function when there are no free variables", function(){
        function external(){
          var a = 1, b = 2;

          function internal(a, b){
            var c = 1;
            return a + b + c;
          }
          return internal(4,4);
        }

        expect(external()).toBe(9);
    });

    it("can use immediately-invoked functions to take advantage of scopes", function(){
        var myNamespace = {};

        (function(theNamespace){
            var counter = 0;

            theNamespace.addOne = function(){
              counter++;
            };

            theNamespace.giveMeTheCount = function(){
              return counter;
            }

        }(myNamespace));

        myNamespace.addOne();
        myNamespace.addOne();

        expect(myNamespace.giveMeTheCount()).toBe(2);
    });

    it("can return other functions as a function result", function(){
        function plus(amount){
            return function(number){
                return number + amount;
            };
        };

        var f = plus(5);
        
        expect(f(3)).toBe(8);
    });

    it("can have functions that receive other functions as arguments", function(){
        function plus(originalFunction){
          return function(arg1){ 
               return originalFunction() + arg1;
          }
        }

        var f = plus(function(){return 1});

        expect(f(2)).toBe(3);
    });

    it("can invoke functions indirectly using the special 'call'", function(){
        function f(a, b){
            return a + b;
        }

        f.call(f,1,1).should.equal(2);
    });

    it("can invoke functions indirectly using the special 'apply'", function(){
        function f(a, b){
            return a + b;
        }

        f.apply(f, [1,1]).should.equal(2);
    });

    it("doesnt have a private scope inside blocks", function(){
        var j = 0;
        for (var i = 0; i < 5; i++) {
          j += i;
        };

        expect(i).toEqual(5);
        expect(j).toEqual(10);
    });

    it("hoists variables the way you probably dont expect", function(){
        function generate(){
          var functions = [];
          for (var i = 0; i < 5; i++){
            functions.push(function(){
              return i;
            }); 
          }
          return functions;
        }


        expect(generate()[0]()).toEqual(5);
        expect(generate()[1]()).toEqual(5);
    });

  });


  describe("when using objects", function(){

    it("can define object literals", function(){
        var obj = {name: 'bob', theName: function(){return this.name;}};

        expect(obj.theName()).toBe("bob");
    });

    it("can define constructors", function(){
        function Obj(){
          var name = 'bob';

          this.theName = function(){
            return name;
          }
        }

        var obj = new Obj();
        expect(obj.theName()).toBe("bob");
    });

    it("may contain 'static' methods", function(){
        function Obj(){
          var name = 'bob';

          this.theName = function(){
            return name;
          }
        }
        Obj.someStaticMethod = function(){
          return 22;
        };

        expect(Obj.someStaticMethod()).toBe(22);
    });

    it("can have have methods in the prototype", function(){
        function Obj(){
        this.name = 'bob';
        }
        Obj.prototype.theName = function(){
            return this.name;
        };

        var obj = new Obj();
        expect(obj.theName()).toEqual('bob');
        expect(obj.theName).toBe(new Obj().theName);
    });

    it("can define a factory", function(){
        function obj(){
          var self = {};

          var name = 'bob';
          self.theName = function(){
              return name;
          };

          return self;
        }

        var instance = obj();
        expect(instance.theName()).toBe('bob');
        expect(instance.theName).not.toBe(obj().theName); 
        //hacen la misma funcion pero son posiciones de memoria diferente
    });

    it("can create methods dynamically on an object instance", function(){
        var obj = {};
        var methodNames = ['meow', 'jump'];
        for (var i = 0; i < methodNames.length; i++){
          obj[[methodNames[i]]] = function(){ return 'it works';};
        };
        expect(obj.meow()).toEqual('it works');
    });

    describe("the polymorphism", function(){
        it("may use constructor plus prototype", function(){
            function Parent(){
              this.name = 'parent';
            }
            Parent.prototype.someMethod = function(){
              return 10;
            };

            function Child(){
              Parent.call(this); // constructor stealing
              this.name = 'child';
            }
            Child.prototype = new Parent(); // prototype chaining

            var child = new Child();
            expect(child.someMethod()).toEqual(10);
            expect(child.name).toEqual('child');
        });

        it("may use the functional inheritance", function(){
            function parent(){
                var name = 'parent';
                var self = {};
                self.someMethod = function(){
                    return 10;
                }
                return self;
            }

            function child(){
                var name = 'child';
                var self = parent();
                return self;
            }

            var instance = child();
            expect(instance.someMethod()).toBe(10);
        });

        // KOAN: how do you create "protected methods?"
    });

  });

function Cat(){
  this.kilos = 1;
  this.feed = function(){
    this.kilos++;
  };
  this.isPurring = function(){
    return true;
  };
}

    
function Lion(energy){
    Cat.call(this); 
    this.energy = energy || 100;
    var self = this;

    var run = function(){ // private method
      self.energy -= 10;
    };
    var attack = function(){ // private method
        self.energy -= 5;
    };
    this.playWithFriend = function(friend){
        if (friend.isPurring())
           self.energy += 10; 
    };
    this.hunt = function(){ // public method
        run();
        attack();
        this.onHunting(); // fire event
    };
    this.onHunting = function(){ /* event */ }
}


  describe("the THIS keyword", function(){
    var cat;
    
    beforeEach(function(){
        cat = new Cat();
        window.kilos = 0;
    });

    it("works as expected in other languages", function(){
        cat.feed();
        cat.feed();

        expect(cat.kilos).toEqual(3);
    });

    it("works different on dettached functions", function(){
        window.kilos = 10;
        var feed = cat.feed;

        feed();

        expect(window.kilos).toEqual(11);
        expect(cat.kilos).toEqual(1);
    });

    it("can be bound explicitly with CALL and APPLY", function(){
        var feed = cat.feed;

        feed.apply(cat);

        expect(cat.kilos).toEqual(2);
    });

    it("can be bound in modern browsers with BIND", function(){
        var feed = cat.feed;
        var bound = feed.bind(cat);

        bound();

        expect(cat.kilos).toEqual(2);
    });

    it("works different when function is attached to other object", function(){
        var otherCat = new Cat();
        otherCat.kilos = 10;
        otherCat.feed = cat.feed;

        otherCat.feed();
        expect(otherCat.kilos).toEqual(11);
        expect(cat.kilos).toEqual(1);
    });

    it("can be handled using the SELF trick", function(){
        var energy = 200;
        var lion = new Lion(energy);

        lion.hunt();

        //expect(lion.energy).toEqual('...');
    });

    it("interprest the THIS when the function is executed", function(){
        var energy = 200;
        var lion = new Lion();

        lion.hunt = function(){
            this.energy = 4000;
        };
        lion.hunt();

        //expect(lion.energy).toEqual('...');
    });
  });

  describe("event driven development", function(){
    // PLEASE READ THIS POST. It contains the theory: 
    // http://www.carlosble.com/2013/02/event-oriented-programming-with-javascript/

    it("uses the DOM level 0 traditional model (one2one)", function(){
        var lion = new Lion();
        var called = false;
        // subscribes to the event:
        lion.onHunting = function(){ called = true;};

        lion.hunt();

        //expect(called).toBe('...');
    });

    it("implements the observer pattern (one2many)", function(){
        function Publisher(){
          this.addObserver = function(observerCallback){
            // TODO: implement this 
          };
          this.informAllObservers = function(){
            // TODO: implement this
          };
        }

        var publisher = new Publisher();
        var observer1WasCalled = false;
        var observer1 = function(){ observer1WasCalled = true;};  
        var observer2WasCalled = false;
        var observer2 = function(){ observer2WasCalled = true;};
        publisher.addObserver(observer1);
        publisher.addObserver(observer2);

        publisher.informAllObservers();

        //expect(observer1WasCalled).toBeTruthy();    
        //expect(observer2WasCalled).toBeTruthy();
    });

    it("implements the pub/sub pattern (many2many)", function(){
        var eventBus = new EventBus();  
        var eventWasFired = false;
        var handler = function(eventName, eventArgs){
            eventWasFired = true;
            expect(eventArgs.someNumber).toBe(10);
        }
        eventBus.addSubscriber(handler, "someEvent");

        eventBus.emit("someEvent", {someNumber: 10});

        //expect(eventWasFired).toBeFalsy();
    }); 
  });

function EventBus(){
  var subscribersInfo = [];

  this.addSubscriber = function(callback){
     var eventNames = [].slice.call(arguments).slice(1);
     subscribersInfo.push({
       subscriber: callback, eventNames: eventNames});
   };

  this.emit = function(eventName, eventArgs){
     for(var i = 0, len = subscribersInfo.length; i < len; i++){
         var info = subscribersInfo[i];
         for (var j = 0, lenj = info.eventNames.length; j < lenj; j++){
             if (info.eventNames[j] == eventName)
                 info.subscriber(eventName, eventArgs);
         }
     }
  };
}

});


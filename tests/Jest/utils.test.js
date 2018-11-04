const modules = require('@/utils');

var inputJson = {
    "stat":"done",
    "data":[{
            "id":1,
            "name":"яблоко",
            "weight":"0.1",
            "code":"18572",
            "color":"красный",
            "description":"яблоко - это фрукт",
            "created_at":"2018-11-03 12:50:00",
            "updated_at":"2018-11-03 12:50:00"
        },
        {
            "id":2,
            "name":"манго",
            "weight":"1.3",
            "code":"34523",
            "color":"оранжевый",
            "description":"манго - это фрукт",
            "created_at":"2018-11-03 12:50:00",
            "updated_at":"2018-11-03 12:50:00"
        },
        {
            "id":3,
            "name":"морковь",
            "weight":"0.2",
            "code":"23454",
            "color":"оранжевый",
            "description":"морковь - это овощь",
            "created_at":"2018-11-03 12:50:00",
            "updated_at":"2018-11-03 12:50:00"
        },
        {
            "id":4,
            "name":"капуста",
            "weight":"1.5",
            "code":"54623",
            "color":"зеленый",
            "description":"капуста - это овощь",
            "created_at":"2018-11-03 12:50:00",
            "updated_at":"2018-11-03 12:50:00"
        },
        {
            "id":5,
            "name":"апельсин",
            "weight":"0.3",
            "code":"34557",
            "color":"оранжевый",
            "description":"апельсин - это фрукт",
            "created_at":"2018-11-03 12:50:00",
            "updated_at":"2018-11-03 12:50:00"
        }],
        "columns":
        {
            "name":["string","Название"],
            "weight":["string","Вес"],
            "code":["string","Код"],
            "color":["string","Цвет"],
            "description":["text","Описание"]
        },
        "unique":[
            [{"id":1},{"id":2},{"id":3},{"id":4},{"id":5}],
            [{"name":"яблоко"},{"name":"манго"},{"name":"морковь"},{"name":"капуста"},{"name":"апельсин"}],
            [{"weight":"0.1"},{"weight":"1.3"},{"weight":"0.2"},{"weight":"1.5"},{"weight":"0.3"}],
            [{"code":"18572"},{"code":"34523"},{"code":"23454"},{"code":"54623"},{"code":"34557"}],
            [{"color":"красный"},{"color":"оранжевый"},{"color":"зеленый"}],
            [{"description":"яблоко - это фрукт"},{"description":"манго - это фрукт"},{"description":"морковь - это овощь"},{"description":"капуста - это овощь"},{"description":"апельсин - это фрукт"}],
            [{"created_at":"2018-11-03 12:50:00"}],[{"updated_at":"2018-11-03 12:50:00"}]
        ]
    },
inputTableDate = {
    content: {
        1: [1, "яблоко", "0.1", "18572", "красный", "яблоко - это фрукт"],
        2: [2, "манго", "1.3", "34523", "оранжевый", "манго - это фрукт"],
        3: [3, "морковь", "0.2", "23454", "оранжевый", "морковь - это овощь"],
        4: [4, "капуста", "1.5", "54623", "зеленый", "капуста - это овощь"],
        5: [5, "апельсин", "0.3", "34557", "оранжевый", "апельсин - это фрукт"]
    },
    name:[["id", "#"], ["name", "Название"], ["weight", "Вес"], ["code", "Код"], ["color", "Цвет"], ["description", "Описание"]],
    uniques: {
        code: ["18572", "34523", "23454", "54623", "34557"],
        color: ["красный", "оранжевый", "зеленый"],
        description: ["яблоко - это фрукт", "манго - это фрукт", "морковь - это овощь", "капуста - это овощь", "апельсин - это фрукт"],
        name: ["яблоко", "манго", "морковь", "капуста", "апельсин"],
        weight: ["0.1", "1.3", "0.2", "1.5", "0.3"]
    }
},
outputTableData = {
    content: "<table class='table'><thead><tr><th scope='col' id='id' class='hov id'>#</th><th scope='col' id='name' class='hov name'>Название</th><th scope='col' id='weight' class='hov weight'>Вес</th><th scope='col' id='code' class='hov code'>Код</th><th scope='col' id='color' class='hov color'>Цвет</th><th scope='col' id='description' class='hov description'>Описание</th></tr><thead><tbody><tr id=1><td id=id class='hov id'>1</td><td id=name class='hov name'>яблоко</td><td id=weight class='hov weight'>0.1</td><td id=code class='hov code'>18572</td><td id=color class='hov color'>красный</td><td id=description class='hov description'>яблоко - это фрукт</td></tr><tr id=2><td id=id class='hov id'>2</td><td id=name class='hov name'>манго</td><td id=weight class='hov weight'>1.3</td><td id=code class='hov code'>34523</td><td id=color class='hov color'>оранжевый</td><td id=description class='hov description'>манго - это фрукт</td></tr><tr id=3><td id=id class='hov id'>3</td><td id=name class='hov name'>морковь</td><td id=weight class='hov weight'>0.2</td><td id=code class='hov code'>23454</td><td id=color class='hov color'>оранжевый</td><td id=description class='hov description'>морковь - это овощь</td></tr><tr id=4><td id=id class='hov id'>4</td><td id=name class='hov name'>капуста</td><td id=weight class='hov weight'>1.5</td><td id=code class='hov code'>54623</td><td id=color class='hov color'>зеленый</td><td id=description class='hov description'>капуста - это овощь</td></tr><tr id=5><td id=id class='hov id'>5</td><td id=name class='hov name'>апельсин</td><td id=weight class='hov weight'>0.3</td><td id=code class='hov code'>34557</td><td id=color class='hov color'>оранжевый</td><td id=description class='hov description'>апельсин - это фрукт</td></tr><tr><td></td><td><button type='button' id='name' opt='cancel' class='btn btn-danger hid'>Отменить</button></td><td><button type='button' id='weight' opt='cancel' class='btn btn-danger hid'>Отменить</button></td><td><button type='button' id='code' opt='cancel' class='btn btn-danger hid'>Отменить</button></td><td><button type='button' id='color' opt='cancel' class='btn btn-danger hid'>Отменить</button></td><td><button type='button' id='description' opt='cancel' class='btn btn-danger hid'>Отменить</button></td></tr></tbody></table><button type='button' opt='save' class='btn btn-primary hid clickable save'>Cохранить данные</button><div class='inline edited ml err-block hid'>*Данные которые вы пытались изменить, измененные другим пользователем, в течении вашей сесси</div>",
    dump: {
        1:[],
        2:[],
        3:[],
        4:[],
        5:[]
    },
    state: {
        1:{},
        2:{},
        3:{},
        4:{},
        5:{}
    }
},
dumpState = {
    "1":[{"name":"яблоко"}],
    "2":[{"name":"манго"}],
    "3":[{"name":"морковь"}],
    "4":[{"name":"капуста"}],
    "5":[{"name":"апельсин"}]
},
uniques = {
    "name":["яблоко","манго","морковь","капуста","апельсин"],
    "weight":["0.1","1.3","0.2","1.5","0.3"],
    "code":["18572","34523","23454","54623","34557"],
    "color":["красный","оранжевый","зеленый"],
    "description":["яблоко - это фрукт","манго - это фрукт","морковь - это овощь","капуста - это овощь","апельсин - это фрукт"]
};

test('should get input from the server and convert it to readeble format for createTable module, ', () =>
    {
        expect(modules.storeData(inputJson))
        .toEqual(inputTableDate);
    });

test('should output content as string, state and dupm as object, based on converted response form the server', () =>
    {
        expect(modules.createTable(inputTableDate))
        .toEqual(outputTableData);
    });

test('should output string from dumpState, based on id and name of content, ', () =>
{
    expect(modules.findState(dumpState, 1, "name"))
    .toEqual("яблоко");
});

test('should output an array of unique words, based on name of content and user input, ', () =>
{
    expect(modules.fillHelper(uniques, "name", "я"))
    .toEqual(["яблоко"]);
});
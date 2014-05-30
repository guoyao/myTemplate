define(['../../../src/myTemplate'], function(myTemplate) {
    var templateRegion = document.getElementById("templateRegion"),
        templateRegion2 = document.getElementById("templateRegion2"),
        template = document.getElementById("template").innerHTML,
        data = {
            name: 'guoyao',
            age: 26,
            gender: 'male',
            children: [
                {
                    name: 'child 1',
                    age: 5,
                    gender: 'female'
                },
                {
                    name: 'child 2',
                    age: 3,
                    gender: 'male'
                }
            ]
        },
        myRenderer;

    templateRegion.innerHTML = myTemplate(template, data);

    myRenderer = myTemplate(template);
    templateRegion2.innerHTML = myRenderer(data);
});
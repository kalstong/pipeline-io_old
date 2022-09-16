Here's the option for you to buy me a coffee - if you like my software, if you find it useful and you can, please consider this small gesture for all the hard work I've been putting into these projects.

That would mean a lot to me!

Of course, don't feel pressured if you can't, I will continue to support and create more software.

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/kalstong)


# pipeline-io
Configure a pipeline to produce and manipulate data.

# How to start

Run in developer mode
```
npm start -- --pipeline tests/pipeline_helloworld.json
```

# Documentation

## Pipeline structure
Pipeline is a `json` file with have the following `objects`:
```
{
    "connections": {},
    "variables": {},
    "callbacks": {},
    "functions": {},
    "start": []
}
```

As the name suggests, connection definitions are declared under the `connections` object. The same for variables and callbacks.

The functions are declared under the `functions` object.

`start` array can be used to specify witch pipeline functions are executed as soon as the pipeline are loaded and the connections established.

## Connections
... to be written

## Variables
### `initValue`
```
{
    "variables": {
        "myVar": {
            initValue: ""
        }
    }
}
```
### `onSet` trigger a function or antoher variable
When some value are set into these variable, the variable itself invokes a function(s) by the name inside the `fn` array and pass by parameter is value.
The same happens when the `onSet` finds a `var`, in that case the variables found inside the `var` arrays will be settled with is value
```
{
    "variables": {
        "myVar": {
            initValue: "",
            onSet: [
                {
                    "fn" : [
                        "myFunc"
                    ],
                    "var" : [
                        "myOtherVariable"
                    ]
                }
            ]
        }
    }
}
```
### `onSet` trigger a function or antoher variable under a condition
In this case the functions or variables defined inside the `onSet`will be settled or invoked if the condition `variable -> operator -> value` are met.
In these case, whenever the `myVar2` value are `!==` from `someValue` the function `myFunc` will be invoked. If the myVar2 are a object, a `path: [ "inner", "object", "path" ]` can be added beside the `op` and `value`.

```
{
    "variables": {
        "myVar2": {
            initValue: "",
            onSet: [
                {
                    "op": "!=="
                    "value" : "someValue",
                    "fn" : [ "myFunc" ]
                }
            ]
        }
    }
}
```

## Callbacks
... to be written

## Functions
... to be written

# pipeline-io
Configure a pipeline to produce and manipulate data.

# How to start

Run in developer mode
```
npm start
```

# Documentation

## Pipeline structure
Pipeline is a `json` file with have the following `objects`:
```
{
    "connections": {},
    "variables": {},
    "callbacks": {},
    "pipeline": {},
    "start": []
}
```

As the name suggests, connection definitions are declared under the `connections` object. The same for variables and callbacks.

The pipeline chain are declared under the `pipeline` object.

`start` array can be used to specify witch pipeline functions are executed as soon as the pipeline are loaded and the connections established.

## Connections
... to be written

## Functions
... to be written

## Variables
... to be written
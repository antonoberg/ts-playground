# Introduction

This is a work in progress playground to explore the possibilities of typescript when used in the whole stack.

# Idea

This is an exploration of how to provide type security between services and frontend. Instead of trying to add types to an existing express rest route setup Im exploring a typescript first principle approach.

In general I appreciate good restful apis that follow REST best practices but in an environment where we write both the frontend and the backend services in typescript I think this might not be a holy cow.

What I want to explore is how to get:

- type security over the wire
- clients without extra typing
- (most important) An approach that drastically reduce the amount of coding that is not implementing business logic

The approach I'm exploring is kind of rpc with typescript. I'm using rest under the hood with POST requests to paths that are derived from the method that is to be called.
From a rest perspective it's ofc terrible to do all requests with POST but I think in our case that is actually ok. What you lose by doing this is rest sanity and the possibility to work without the box caching for GET requests. In our case I dont think that is an issue since this aims to help us working with requests originating from logged in clients where we in general dont do that much caching. The generated REST api will not look as beautiful but I think that that is ok and in fact a REST documentation like swagger should not be used (!) because the documentation will be in the shared interfaces. That it happens over REST should be considered an implementation detail.

# Structure of repo

This repo is divided into the folders: `app` and `lib`.
In the `lib` folder the core functionality lives. This is a candidate for a package.

In the example a simple music app is implemented. Music was picked because it felt like and are where it was fairly simple to step by step expand a data model that could stay fairly understandable with stuff like artists, songs, groups, playlists and stuff.

## example

### frontend

A placeholder for frontend. Right now it's only a file that makes some request towards the backend services. Later might be expanded to a react frontend

### server

Contains different backend services. Atm the `songApi` and `artistApi` are apis that stores data in an in memory db. The `musicApi` is something like a bff that calls the upstream `songApi` and `artistApi` and creates aggregated resources. `logApi` is an api that just logs stuff.

All the apis share the same structure. Music api is slightly different because its using clients to call the artist and log api.

#### resolver

The resolver extends the RestResolver provided by the lib and provides the api specification. When extending the RestResolver you have to implement the createLocals method. This method allows you to extract things from the request object as well as access the request meta provided by the client. The returned locals object will then be provided for you your resource methods (the methods that are implementing the shared specification) as the second argument with correct typing. Here is where you should extract data from other rest middlewares and also (like in the case of the music api) add clients that you want to be request specific (ex for forwarding meta props and auth and stuff)

#### resources

Here you implement the resources from shared. Either you can use some kind of dataStore (like in song or artist api) or call clients that talk to other services (like in the music API).

#### index.ts

Entrypoint that imports and call createApp from app and start listening to a server

#### app.ts

in app the different parts are put together. The resolver is instantiated with a resource object. This resource object has to fulfill the types specified for the api in shared. The resolver is a RestResolver which exposes a createRouter method that will return an express router will all necessary routes

### shared

In the shared folder the types that are supposed to be shared between the frontend and services lives.

#### resources

Right now the method interfaces and models are organized within the resources folder. Each resource contains the interface that defines the methods that can be called in the clients and that then will be executed on the server and also the corresponding models. The terminology will likely change and ex operations will be used as a concept. It can be good to note that the models are classes and not types. They could as well be types but they are classes to also include validation (this validation can be used both on the frontend and the backend)

#### apis

The resources are included in the different api (services) definitions. These definitions will be used by the apis to ensure that all the resource methods are implemented. They will also be used in the clients to allow calling these apis.

#### clients

The clients are to be used when interacting with different apis. As you can see the actual interface does not need to be implemented due to the use of the javascript proxy object. What it implements is the custom method to create meta (used for stuff that needs to be send to the remote but that should not be a part of the method arguments like auth headers or correlation ids)

#### lib

The lib contains 3 folders: `client`, `server` and `shared`.
Will not go into details yet but an important thing is how the client works. Its using a js proxy object to make it possible to create clients, type them, and make them call methods remote without having to implement any methods
